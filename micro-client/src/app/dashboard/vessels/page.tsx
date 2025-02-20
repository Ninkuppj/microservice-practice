"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/tables/table";
// import { Metadata } from "next";
import VesselService from "@/app/api/vessel/route";
import { AddUser, DeleteIcon, EditIcon } from "@/app/lib/icon";
import {
  Button,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import VesselSearchBar from "./_component/search_vessel";

// export const metadata: Metadata = {
//     title: "Vessel",
// };
const columns = [
  {
    key: "vslCd",
    label: "Code",
  },
  {
    key: "vslEngNm",
    label: "VSL Name",
  },
  {
    key: "crrCd",
    label: "Carrier Code",
  },
  {
    key: "netRgstTongWgt",
    label: "Net Ton",
  },
  {
    key: "callSgnNo",
    label: "Call Sign",
  },
  {
    key: "lloydNo",
    label: "IMO No.",
  },
  {
    key: "fdrDivCd",
    label: "Trunk/Feeder",
  },
];

export default function Vessel() {
  const router = useRouter();
  const [ data, setVesselList] = useState([]);
  useEffect(()=> {
      const fetchVessels = async () => {
          const res = await VesselService.getAllVessel();
          if(!res) throw new Error('Failed to load users');
          return res.vessels;
        };
        
        fetchVessels().then((data:any)=> setVesselList(data));
  },[])
  const handleClick = (data: any) => () => {
    router.push(`/dashboard/vessels/${data.vslCd}`);
  };
  return (
    <section className=" rounded-lg pt-5 px-2 m-2 ">
      <VesselSearchBar />
      <hr className="mt-5" />
      <div className="flex flex-col mt-5  max-h-[90rem] overflow-scroll">
        <Table className='rounded-sm p-2' aria-label="Example table with dynamic content" >
                <TableHeader className="bg-slate-400 shadow-md rounded-sm" >
                    <TableRow >
                    {columns.map((column) => <TableHead key={column.key}>{column.label}</TableHead>)}
                    <TableHead key='action'><Button className="bg-slate-400 p-1" isIconOnly onClick={()=>alert('Edit clicked')}>
                        <AddUser/>
                    </Button> </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data&&data.map((item:any, index) => (
                    <TableRow key={index} className="hover:bg-slate-300" onDoubleClick={handleClick(item)}>
                        {columns.map((columnKey) => 
                        <TableCell key={item[columnKey.key]}>{item[columnKey.key]} </TableCell>)}
                        <TableCell key='action' className="w-10">
                        <Popover placement='top' >
                            <PopoverTrigger>
                                <div>
                                    <Image src="/images/ellipsis.png" className="w-12 h-4" alt="" />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="text-black space-y-2 py-2">
                                    <Button className="bg-white" isIconOnly aria-label="Edit"onClick={()=>alert('Edit clicked')} ><EditIcon/> </Button> 
                                    <hr className="border-1 w-full"/>
                                    <Button className="bg-white" isIconOnly color="danger" aria-label="Delete" onClick={()=>alert('Delete clicked')}>
                                    <DeleteIcon/>
                                </Button>
                            </PopoverContent>
                        </Popover>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
      </div>
    </section>
  );
}
