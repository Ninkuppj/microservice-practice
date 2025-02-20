"use client";

import InputUI from "@/components/inputs/InputUI";
import {
    Tab,
    Tabs
} from "@nextui-org/react";
export default function VesselModal({id}:{id:string}) {
  return (
    <section className=" rounded-lg pt-5 px-2 m-2 w-full">
                <div className="flex flex-col gap-5 mt-5">
                    <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                    <div className="w-full space-x-3 grid grid-cols-4">
                        <InputUI
                        type="vsl_cd"
                        label="Vessel Code"

                        // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                        type="Ownership"
                        label="Ownership"

                        // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                        type="crr_cd"
                        label="Alliance Vessel Code"

                        // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                        type="Alliance Vessel Code"
                        label="Alliance Vessel Code"

                        // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                    </div>
                    <hr className="my-2" />
                    <div className="w-full space-y-3">
                        <div className=" flex">
                        <InputUI
                            type="vsl_nm"
                            label="Vessel Name (ENG)"
                            classNames={{
                            label: "w-[16%] text-[13px] text-right top-5",
                            inputWrapper: "w-[350%] bg-white border-1",
                            }}
                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="vsl_nm"
                            label="Vessel Name (Local)"
                            classNames={{
                            label: "w-[16%] text-[13px] text-right top-5",
                            inputWrapper: "w-[350%] bg-white border-1",
                            }}
                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        </div>
                        <div className="space-x-3 flex">
                        <InputUI
                            type="Built"
                            label="New Built"
                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Carrier"
                            label="Carrier"
                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Builder"
                            label="Builder"
                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Company"
                            label="Company"
                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Build Area Name"
                            label="Build Area Name"
                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        </div>
                    </div>
                    <hr className="my-2" />
                    <div className="w-full space-y-6 ">
                        <div className="space-x-3 grid grid-cols-5">
                        <InputUI
                            type="call_sgn_no"
                            label="Call Sign"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Flag"
                            label="Flag"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="call_sgn_no"
                            label="Post Of Registry"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="class"
                            label="Class"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        </div>
                        <div className="space-x-3 grid grid-cols-5">
                        <InputUI
                            type="Class No"
                            label="Class No"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="lloy_no"
                            label="IMO No. (LLOYD No)"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Hull No"
                            label="Hull No"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Crew Count"
                            label="Crew Count"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        </div>
                        <div className="space-x-3 grid grid-cols-5">
                        <InputUI
                            type="BClub"
                            label="B&I Club"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="EDI Vessel"
                            label="EDI Vessel"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Tel No"
                            label="Tel No"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Fax"
                            label="Fax"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="TLX"
                            label="TLX"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        </div>
                        <div className="space-x-3 grid grid-cols-5">
                        <InputUI
                            type="E-Mail"
                            label="E-Mail"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Registered No"
                            label="Registered No"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Feeder Division"
                            label="Feeder Division"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Common Vessel"
                            label="Common Vessel"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        </div>
                        <div className="flex">
                        <InputUI
                            type="Keel Laid Date"
                            label="Keel Laid Date"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Build Date"
                            label="Build Date"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Deleverd Date"
                            label="Deleverd Date"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Registered Date"
                            label="Registered Date"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Close Date"
                            label="Close Date"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        </div>
                        <InputUI
                        type="Vessel Remark"
                        label="Vessel Remark"

                        // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                    </div>
                    <hr className="my-2" />
                    <div className="w-full space-y-4">
                        <Tabs
                        aria-label="Options"
                        color="primary"
                        variant="underlined"
                        className="w-full"
                        classNames={{
                            tabList:
                            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                            cursor: "w-full bg-[#22d3ee]",
                            tab: "max-w-fit px-0 h-12 ",
                            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
                        }}
                        >
                        <Tab
                            key="photos"
                            title={
                            <div className="w-1/12 mr-2 flex items-center">
                                <span>CNTR Capacity</span>
                            </div>
                            }
                            content="This is the first panel."
                        >
                            <div className="space-y-6">
                            <div className="space-x-3 grid grid-cols-5 items-center">
                                <InputUI
                                type="call_sgn_no"
                                label="Post Of Registry"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="class"
                                label="Class"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Class No"
                                label="Class No"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="lloy_no"
                                label="IMO No. (LLOYD No)"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Hull No"
                                label="Hull No"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            <div className="space-x-3 grid grid-cols-5 items-center">
                                <InputUI
                                type="Crew Count"
                                label="Crew Count"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="BClub"
                                label="B&I Club"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="EDI Vessel"
                                label="EDI Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Tel No"
                                label="Tel No"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        <Tab
                            key="music"
                            title={
                            <div className="w-1/12 mr-2 items-center flex">
                                <span>Dimension(M)</span>
                            </div>
                            }
                            content="This is the first panel."
                        >
                            <div className="space-y-5">
                            <div className="grid grid-cols-5 items-center">
                                <InputUI
                                type="Fax"
                                label="Fax"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="call_sgn_no"
                                label="Call Sign"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="TLX"
                                label="TLX"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="E-Mail"
                                label="E-Mail"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Registered No"
                                label="Registered No"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-5 items-center">
                                <InputUI
                                type="Feeder Division"
                                label="Feeder Division"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        <Tab
                            key="videos"
                            title={
                            <div className="w-1/12 mr-2 items-center flex">
                                <span>Speed(Knots)</span>
                            </div>
                            }
                        >
                            <div>
                            <div className="grid grid-cols-5 items-center">
                                <InputUI
                                type="Feeder Division"
                                label="Feeder Division"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        <Tab
                            key="Other"
                            title={
                            <div className="w-1/12 mr-2 items-center flex">
                                <span>Other(MT)</span>
                            </div>
                            }
                        >
                            <div>
                            <div className="grid grid-cols-5 items-center">
                                <InputUI
                                type="Feeder Division"
                                label="Feeder Division"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        <Tab
                            key="Tonnage"
                            title={
                            <div className="w-1/12 mr-2 items-center flex">
                                <span>Tonnage</span>
                            </div>
                            }
                        >
                            <div className="space-y-7  w-1/12 mr-2">
                            <h3>International</h3>
                            <h3>Panama</h3>
                            <h3>Suez</h3>
                            </div>
                            <div className="ml-2 space-y-3">
                            <div className="grid grid-cols-4">
                                <InputUI
                                type="Feeder Division"
                                label="Feeder Division"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4">
                                <InputUI
                                type="Feeder Division"
                                label="Feeder Division"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4">
                                <InputUI
                                type="Feeder Division"
                                label="Feeder Division"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Common Vessel"
                                label="Common Vessel"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            <InputUI
                                type="ITC"
                                label="ITC"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                            />
                            </div>
                        </Tab>
                        <Tab
                            key="Fresh Water Capacity"
                            title={
                            <div className="w-1/12 mr-2 items-center flex">
                                <span>Fresh Water Capacity</span>
                            </div>
                            }
                        >
                            <div>
                            <div className="flex">
                                <InputUI
                                type="call_sgn_no"
                                label="Call Sign"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Flag"
                                label="Flag"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="call_sgn_no"
                                label="Post Of Registry"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="class"
                                label="Class"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        <Tab
                            key="Consumption(MT)"
                            title={
                            <div className="w-1/12 mr-2 items-center flex">
                                <span>Consumption(MT)</span>
                            </div>
                            }
                        >
                            <div>
                            <div className="flex">
                                <InputUI
                                type="call_sgn_no"
                                label="Call Sign"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Flag"
                                label="Flag"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="call_sgn_no"
                                label="Post Of Registry"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        <Tab
                            key="Main Engine"
                            title={
                            <div className="w-1/12 mr-2 items-center flex">
                                <span>Main Engine</span>
                            </div>
                            }
                        >
                            <div>
                            <div className="grid grid-cols-4">
                                <InputUI
                                type="call_sgn_no"
                                label="Call Sign"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Flag"
                                label="Flag"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="call_sgn_no"
                                label="Post Of Registry"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="class"
                                label="Class"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        <Tab
                            key="Bow Thruster"
                            title={
                            <div className="w-1/12 mr-2 items-center flex">
                                <span>Bow Thruster</span>
                            </div>
                            }
                        >
                            <div>
                            <div className="grid grid-cols-4">
                                <InputUI
                                type="call_sgn_no"
                                label="Call Sign"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Flag"
                                label="Flag"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="call_sgn_no"
                                label="Post Of Registry"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        <Tab
                            key="Generator Engine"
                            title={
                            <div className="w-1/12 mr-2 items-center flex">
                                <span>Generator Engine</span>
                            </div>
                            }
                        >
                            <div>
                            <div className="grid grid-cols-4">
                                <InputUI
                                type="call_sgn_no"
                                label="Call Sign"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="Flag"
                                label="Flag"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                                <InputUI
                                type="call_sgn_no"
                                label="Post Of Registry"

                                // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        </Tabs>
                        <hr className="border-1 w-1/12" />
                    </div>
                    <hr />
                    <div className="my-2">
                        <div className="flex">
                        <InputUI
                            type="Delete Flag"
                            label="Delete Flag"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Create User"
                            label="Create User"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Create Date/Time"
                            label="Create Date/Time"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Last Update User"
                            label="Last Update User"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        <InputUI
                            type="Last Update Date/Time"
                            label="Last Update Date/Time"

                            // onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                        />
                        </div>
                    </div>
                    </form>
                </div>
    </section>
  );
}
