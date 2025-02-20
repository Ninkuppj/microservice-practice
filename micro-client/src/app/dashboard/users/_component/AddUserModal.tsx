'use client'
import { AddUser, EditIcon } from "@/app/lib/icon"
import { Modal, Button, Input, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure, Checkbox } from "@nextui-org/react";
import { useState } from "react";

interface ModalProps {
    handleModaldata: (data: object) => void;
  }
  

export default function AddUserModal ({ handleModaldata } : ModalProps ) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [modalData, setModalData] = useState({});
    const handleSendData = () => {
        // Send data to the parent using the callback function
        handleModaldata(modalData);
      };
  return (
    <>
    <Button isIconOnly aria-label="Add" onPress={onOpen} >
        <AddUser/>
    </Button> 
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-white text-black",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <Input
                    isRequired
                    type="email"
                    label="Email"
                    className="max-w-xs"
                    onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                    />
                <Input
                    isRequired
                    type="username"
                    label="userName"
                    className="max-w-xs"
                    onChange={(e) => setModalData({ ...modalData, username: e.target.value })}
                    />
                <Input
                    isRequired
                    type="password"
                    label="Password"
                    className="max-w-xs"
                    onChange={(e) => setModalData({ ...modalData, password: e.target.value })}
                    />
                <Input
                    isRequired
                    type="role"
                    label="Role"
                    className="max-w-xs"
                    onChange={(e) => setModalData({ ...modalData, role: e.target.value })}
                    />
                <Checkbox radius="full" onChange={(e) => setModalData({ ...modalData, isActive: e.target.checked })} >Active</Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={()=>{handleSendData(),onClose()}}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    )
}