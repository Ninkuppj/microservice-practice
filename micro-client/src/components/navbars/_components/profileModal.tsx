'use client'
import { useProfile } from "@/app/lib/hooks/useProfile";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure, Checkbox, Input } from "@nextui-org/react";
export default function ProfileUserModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { profile } = useProfile() as any;
  return (
    <>
      <button aria-label="Profile" onClick={onOpen} >
        Profile
      </button>
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
              <ModalHeader className="flex flex-col gap-1"> Profile </ModalHeader>
              <ModalBody>
                <Input readOnly type="email" label="Email" value={profile.email} />
                <Input readOnly type="username" label="UserName" value={profile.username} />
                <Input readOnly type="role" label="Role" value={profile.role.name} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}