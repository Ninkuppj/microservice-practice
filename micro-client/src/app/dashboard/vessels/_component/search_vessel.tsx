import { Input, Radio, RadioGroup } from "@nextui-org/react";

interface ModalProps {
    handleModaldata: (data: object) => void;
  }
  

export default function VesselSearchBar () {
    // const handleSendData = () => {
    //     // Send data to the parent using the callback function
    //     handleModaldata(modalData);
    //   };
  return (
    <>
    <div className="flex flex-row items-center justify-between mb-4">
        <h1 className='text-3xl font-bold'>Vessels</h1>
    </div>
        <form className="w-full flex" onSubmit={e=> e.preventDefault()}>
            <div className="w-full space-y-3 ">
            <Input
                    isRequired
                    type="vsl_cd"
                    label="Vessel Code"
                    labelPlacement='outside-left'
                    classNames={{
                        label: "w-[27%]",
                        inputWrapper:'bg-white border-1'
                    }}
                    // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                    />
            <Input
                    isRequired
                    type="crr_cd"
                    label="Carrier Code"
                    labelPlacement='outside-left'
                    classNames={{
                        label: "w-[27%]",
                        inputWrapper:'bg-white border-1'
                    }}
                    // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                    />
            </div>
            <div className="w-full space-y-3">
            <Input
                    isRequired
                    type="vsl_nm"
                    label="Vessel Name"
                    labelPlacement='outside-left'
                    classNames={{
                        label: "w-[27%]",
                        inputWrapper:'bg-white border-1'
                    }}
                    // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                    />
            <Input
                    isRequired
                    type="call_sgn_no"
                    label="Call Sign"
                    labelPlacement='outside-left'
                    classNames={{
                        label: "w-[27%]",
                        inputWrapper:'bg-white border-1'
                    }}
                    // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                    />
            </div>
            <div className="w-full space-y-6">
            <RadioGroup
            defaultValue="all"
                    orientation="horizontal"
                    >
                    <Radio value="all">ALL</Radio>
                    <Radio value="T">Trunk</Radio>
                    <Radio value="F">Feeder</Radio>
            </RadioGroup>
            <Input
                    isRequired
                    type="lloy_no"
                    label="IMO No."
                    labelPlacement='outside-left'
                    classNames={{
                        
                        inputWrapper:'bg-white border-1'
                    }}
                    // className="max-w-xs"
                    // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                    />
            
            </div>
        </form>
    </>
    )
}