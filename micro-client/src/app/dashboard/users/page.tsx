'use client'
import UserService from "@/app/api/users/route";
import { DeleteIcon } from "@/app/lib/icon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/tables/table";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AddUserModal from "./_component/AddUserModal";
import EditUserModal from "./_component/EditUserModal";
import { socketConfig } from "@/app/lib/genSocket-client";
const columns = [
    {
        key: "username",
        label: "USERNAME",
      },
      {
        key: "email",
        label: "EMAIL",
      },
      {
        key: "isActive",
        label: "ACTIVE",
      },
      {
        key: "createBy",
        label: "CREATE BY",
      },
      {
        key: "Action",
        label: "Action",
      },
]

export default function UserManagement() { // Run this effect only once on component mount
    const [ data, setUserList] = useState([]);
    const session = useSession()! as any;

    useEffect(()=> {
        const fetchUsers = async () => {
            const res = await UserService.getAllUser();
            if(!res) throw new Error('Failed to load users');
            return res.users;
          };
          fetchUsers().then((data:any)=> setUserList(data));
    },[])
    const handleReceiveData = async (data:any) => {
        const confirm = window.confirm("Are you sure want to save this user?");
        if (!confirm) return;
        const rep =await UserService.update(data)
        if(rep.data?.user){
            alert('Successfully save the user!')
            const socket = await socketConfig(session?.data.accessToken);
            socket.connect();
            socket.emit('force_reload',{ userId: data.id});
            const res = await UserService.getAllUser();
            if(!res) throw new Error('Failed to load users');
            setUserList(res.data?.users);
            if(socket.connected) socket.disconnect();
        }
      };
      console.log(session);
      
      const handleReceiveNewData = async (data:any) => {
        const confirm = window.confirm("Are you sure want to save this user?");
        if (!confirm) return;
        UserService.createUser({
            ...data,
            updateBy:'admin',
            createBy:'admin',
            createDate:new Date(),
            updateDate:new Date()
        }).then(async ()=>{
            alert('Successfully save the user!')
            const res = await UserService.getAllUser();
            if(!res) throw new Error('Failed to load users');
            setUserList(res.data.users);
        }).catch(err => console.log(err))
      };

    const handleDelete = (id : number) =>{
        const confirm = window.confirm("Are you sure want to delete this user?");
        if (!confirm) return;
        
        UserService.deleteUserById(id).then(()=>{
            alert('Successfully deleted the user!')
            const filteredData = data.filter((user:any) => user.id !== id );
            setUserList(filteredData);
        }).catch(err => console.log(err))
    }

    return (
        <section className="bg-white rounded-lg p-5">
            <h1 className="text-black text-3xl font-semibold mb-5">
                User Managerment 
               
            </h1>
            <AddUserModal handleModaldata={handleReceiveNewData}/>
            <div className="text-black">
            <Table aria-label="Example table with dynamic content">
                <TableHeader>
                    <TableRow>
                    {columns.map((column) => <TableHead key={column.key}>{column.label}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {data&&data.map((item:any, index) => (
                    <TableRow key={index}>
                        {columns.map((columnKey) => 
                        <TableCell key={item[columnKey.key]}> { 
                        columnKey.key!=='Action'? item[columnKey.key] : 
                        // profile.role.id!='admin'?
                        <div className="space-x-2">
                            
                            {session.data.user!.role===1&& <Button isIconOnly color="danger" aria-label="Delete"  onClick={()=>handleDelete(item.id)}>
                                <DeleteIcon/>
                            </Button>  }
                            {session.data.user!.role!==3&& <EditUserModal data={item} handleModaldata={handleReceiveData}/>}
                        </div> } </TableCell>)}
                        
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
        </section>
    );
}