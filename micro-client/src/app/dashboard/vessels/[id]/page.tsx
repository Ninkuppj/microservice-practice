"use client";

import VesselService from "@/app/api/vessel/route";
import { DeleteIcon, EditIcon } from "@/app/lib/icon";
import InputUI from "@/components/inputs/InputUI";
import { IVessel } from "@/types/vessel";
import {
    Button,
    Input,
    Tab,
    Tabs
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
    const [dataVessel, setDataVessel] = useState<IVessel>();
    useEffect(()=> {
        
        const getData =async () => {
            const res =  await VesselService.getById(params.id);
            if (res.status ===  200) {
                setDataVessel(res.vessel);

            } else {
                alert("Failed to fetch data");
            }
        }
        getData()
    },[]);
    const functionUpdateVessel = async () => {
        const res = await  VesselService.update(dataVessel!)
        if (res.status == 200) {
            window.location.replace("/dashboard/vessels")
        }else{
            alert('failed')
        }
    };
    const functionDeleteVessel = () => {
        const confirmation = window.confirm("Are you sure want to delete this vessel?");
        if (!confirmation) return ;
        const res =  VesselService.deleteVesselById(params.id).then((x)=> {
           window.location.replace('/dashboard/vessels');
        });
    };
  return dataVessel && (
    <section className=" rounded-lg pt-5 px-2 m-2 w-full">
            <div className="flex justify-between">
            <h1 className='text-3xl font-bold'>Vessel Detail</h1>
            <div className="space-x-4">
                <Button isIconOnly aria-label="Save Update" onClick={functionUpdateVessel} ><EditIcon/> </Button> 
                <Button isIconOnly aria-label="Delete" onClick={functionDeleteVessel}><DeleteIcon/> </Button> 
            </div>

            </div>
                <div className="flex flex-col gap-5 mt-5">
                    <form className="w-full" onSubmit={(e:any) => e.preventDefault()}>
                    <div className="w-full space-x-3 grid grid-cols-4">
                        <InputUI
                        type="vslCd"
                        isRequired
                        disabled
                        label="Vessel Code"
                        value={dataVessel?.vslCd}
                        onChange={(e:any) => setDataVessel({ ...dataVessel, vslCd: e.target.value })}
                        />
                        <InputUI
                        type="modiOwnrNm"
                        label="Ownership"
                        value={dataVessel?.modiOwnrNm}
                        onChange={(e:any) => setDataVessel({ ...dataVessel, modiOwnrNm: e.target.value })}
                        />
                        <InputUI
                        type="modiAllnVslCd"
                        label="Alliance Vessel Code"
                        value={dataVessel?.modiAllnVslCd}

                        onChange={(e:any) => setDataVessel({ ...dataVessel, modiAllnVslCd: e.target.value })}
                        />
                        <InputUI
                        type="lgcyCoCd"
                        label="Alliance Vessel Code"
                        value={dataVessel?.lgcyCoCd}
                        onChange={(e:any) => setDataVessel({ ...dataVessel, lgcyCoCd: e.target.value })}
                        />
                    </div>
                    <hr className="my-2" />
                    <div className="w-full space-y-3">
                        <div className=" grid grid-cols-2">
                        <InputUI
                            type="vslEngNm"
                            label="Vessel Name (ENG)"
                            value={dataVessel?.vslEngNm}
                            classNames={{
                            label: "w-[20rem] text-[13px] text-right top-5",
                            inputWrapper: "md:min-w-[15rem] lg:min-w-[40rem] bg-white border-1",
                            }}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslEngNm: e.target.value })}
                        />
                        <InputUI
                            type="vslLoclNm"
                            label="Vessel Name (Local)"
                            value={dataVessel?.vslLoclNm}
                            classNames={{
                            label: "w-[20rem] text-[13px] text-right top-5",
                            inputWrapper: "md:min-w-[15rem] lg:min-w-[40rem] bg-white border-1",
                            }}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslLoclNm: e.target.value })}
                        />
                        </div>
                        <div className="space-x-3 grid grid-cols-2">
                        <div className="grid grid-cols-2 items-start">

                            <InputUI
                                type="crrCd"
                                label="Carrier"
                                value={dataVessel?.crrCd}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, crrCd: e.target.value })}
                            />
                            <InputUI
                                type="vslBldrNm"
                                label="New Built"
                                value={dataVessel?.vslBldrNm}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslBldrNm: e.target.value })}
                            />

                        </div>

                        <div className="grid grid-cols-3 items-start">

                            <InputUI
                                type="vslBldCd"
                                label="Builder"
                                value={dataVessel?.vslBldCd}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslBldCd: e.target.value })}
                            />
                            <InputUI
                                type="coCd"
                                label="Company"
                                value={dataVessel?.coCd}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, coCd: e.target.value })}
                            />
                            <InputUI
                                type="vslBldrNm"
                                label="Build Area Name"
                                value={dataVessel?.vslBldrNm}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslBldrNm: e.target.value })}
                            />
                        </div>
                        </div>
                    </div>
                    <hr className="my-2" />
                    <div className="w-full space-y-6 ">
                        <div className="space-x-3 grid grid-cols-5">
                        <InputUI
                            type="callSgnNo"
                            label="Call Sign"
                            value={dataVessel?.callSgnNo}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, callSgnNo: e.target.value })}
                        />
                        <InputUI
                            type="vslClssFlg"
                            label="Flag"
                            value={dataVessel?.vslClssFlg}
                            
                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslClssFlg: e.target.value })}
                        />
                        <InputUI
                            type="rgstPortCd"
                            label="Post Of Registry"
                            value={dataVessel!.rgstPortCd}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, rgstPortCd: e.target.value })}
                        />
                        <InputUI
                            type="clssNoRgstAreaNm"
                            label="Class"
                            value={dataVessel?.clssNoRgstAreaNm}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, clssNoRgstAreaNm: e.target.value })}
                        />
                        </div>
                        <div className="space-x-3 grid grid-cols-5">
                        <InputUI
                            type="vslClssNo"
                            label="Class No"
                            value={dataVessel?.vslClssNo}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslClssNo: e.target.value })}
                        />
                        <InputUI
                            type="lloydNo"
                            label="IMO No. (LLOYD No)"
                            value={dataVessel?.lloydNo}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, lloydNo: e.target.value })}
                        />
                        <InputUI
                            type="vslHlNo"
                            label="Hull No"
                            value={dataVessel?.vslHlNo}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslHlNo: e.target.value })}
                        />
                        <InputUI
                            type="crwKnt"
                            label="Crew Count"
                            value={dataVessel?.crwKnt}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, crwKnt: e.target.value })}
                        />
                        </div>
                        <div className="space-x-3 grid grid-cols-5">
                        <InputUI
                            type="piclbDesc"
                            label="B&I Club"
                            value={dataVessel?.piclbDesc}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, piclbDesc: e.target.value })}
                        />
                        <InputUI
                            type="vslEdiNm"
                            label="EDI Vessel Name"
                            value={dataVessel?.vslEdiNm}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslEdiNm: e.target.value })}
                        />
                        <InputUI
                            type="phnNo"
                            label="Tel No"
                            value={dataVessel?.phnNo}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, phnNo: e.target.value })}
                        />
                        <InputUI
                            type="faxNo"
                            label="Fax"
                            value={dataVessel?.faxNo}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, faxNo: e.target.value })}
                        />
                        <InputUI
                            type="tlxNo"
                            label="TLX"
                            value={dataVessel?.tlxNo}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, tlxNo: e.target.value })}
                        />
                        </div>
                        <div className="space-x-3 grid grid-cols-5">
                        <InputUI
                            type="vslEml"
                            label="E-Mail"
                            value={dataVessel?.vslEml}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslEml: e.target.value })}
                        />
                        <InputUI
                            type="rgstNo"
                            label="Registered No"
                            value={dataVessel?.rgstNo}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, rgstNo: e.target.value })}
                        />
                        <InputUI
                            type="fdrDivCd"
                            label="Feeder Division"
                            value={dataVessel?.fdrDivCd}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, fdrDivCd: e.target.value })}
                        />
                        <InputUI
                            type="lgcyCoCd"
                            label="Common Vessel"
                            value={dataVessel?.lgcyCoCd}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, lgcyCoCd: e.target.value })}
                        />
                        </div>
                        <div className="space-x-3 grid grid-cols-5">
                        <InputUI
                            type="Date"
                            label="Keel Laid Date"
                            value={dataVessel?.vslKelLyDt as Date}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslKelLyDt: e.target.value })}
                        />
                        <InputUI
                            type="vslLnchDt"
                            label="Build Date"
                            value={dataVessel?.vslLnchDt}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslLnchDt: e.target.value })}
                        />
                        <InputUI
                            type="vslDeDt"
                            label="Deleverd Date"
                            value={dataVessel?.vslDeDt}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslDeDt: e.target.value })}
                        />
                        <InputUI
                            type="rgstDt"
                            label="Registered Date"
                            value={dataVessel?.rgstDt}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, rgstDt: e.target.value })}
                        />
                        <InputUI
                            type="vslClzDt"
                            label="Close Date"
                            value={dataVessel?.vslClzDt}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslClzDt: e.target.value })}
                        />
                        </div>
                        <div className="w-10/12 grid">
                            <InputUI
                            type="vslRmk"
                            label="Vessel Remark"
                            className="w-full"
                            value={dataVessel?.vslRmk}
                            classNames={{
                                label: "w-[10%] text-[13px] text-right top-5",
                                inputWrapper:'w-[80rem] bg-white border-1 '
                            }}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, vslRmk: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="w-full space-y-4 min-h-[15rem] max-h-[30rem]">
                        <Tabs
                        aria-label="Options"
                        color="primary"
                        variant="underlined"
                        className="w-full"
                        classNames={{
                            tabList:
                            "gap-6 w-full relative rounded-none p-0 border-b border-divider ",
                            cursor: "w-full bg-[#22d3ee]",
                            tab: "max-w-fit px-0 h-10",
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
                            <div className="space-y-3">
                            <div className="space-x-3 grid grid-cols-5 items-center">
                                <InputUI
                                type="cntrDznCapa"
                                label="Design"
                                value={dataVessel?.cntrDznCapa}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, cntrDznCapa: e.target.value })}
                                />
                                <InputUI
                                type="cntrOpCapa"
                                label="Operation"
                                value={dataVessel?.cntrOpCapa}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, cntrOpCapa: e.target.value })}
                                />
                                <InputUI
                                type="cntrPnmCapa"
                                label="Panama"
                                value={dataVessel?.cntrPnmCapa}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, cntrPnmCapa: e.target.value })}
                                />
                                <InputUI
                                type="modiVslOprTpCd"
                                label="OPER(R/F)"
                                value={dataVessel?.modiVslOprTpCd}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, modiVslOprTpCd: e.target.value })}
                                />
                                <InputUI
                                type="vslHldKnt"
                                label="Max(R/F)"
                                value={dataVessel?.rfRcptMaxKnt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslHldKnt: e.target.value })}
                                />
                            </div>
                            <div className="space-x-3 grid grid-cols-5 items-center">
                                <InputUI
                                type="vslHldKnt"
                                label="Vessel Class(TEU)"
                                value={dataVessel?.cntrVslClssCapa}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslHldKnt: e.target.value })}
                                />
                                <InputUI
                                type="vslHldKnt"
                                label="Total TEU"
                                value={dataVessel?.ttlTeuKnt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslHldKnt: e.target.value })}
                                />
                                <InputUI
                                type="vslHldKnt"
                                label="Hatch CNT"
                                value={dataVessel?.vslHtchKnt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslHldKnt: e.target.value })}
                                />
                                <InputUI
                                type="vslHldKnt"
                                label="Hold CNT"
                                value={dataVessel?.vslHldKnt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslHldKnt: e.target.value })}
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
                                type="loaLen"
                                label="L.O.A"
                                value={dataVessel?.loaLen}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, loaLen: e.target.value })}
                                />
                                <InputUI
                                type="lbpLen"
                                label="L.B.P"
                                value={dataVessel?.lbpLen}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, lbpLen: e.target.value })}
                                />
                                <InputUI
                                type="tlxNo"
                                label="Breadth"
                                value={dataVessel?.tlxNo}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, tlxNo: e.target.value })}
                                />
                                <InputUI
                                type="vslDpth"
                                label="Depth"
                                value={dataVessel?.vslDpth}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslDpth: e.target.value })}
                                />
                                <InputUI
                                type="vslHgt"
                                label="Height"
                                value={dataVessel?.vslHgt}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslHgt: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-5 items-center">
                                <InputUI
                                type="smrDrftHgt"
                                label="Summer Draft"
                                value={dataVessel?.smrDrftHgt}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, smrDrftHgt: e.target.value })}
                                />
                                <InputUI
                                type="fbdCapa"
                                label="Freeboard"
                                value={dataVessel?.fbdCapa}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, fbdCapa: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        <Tab
                            key="Speed"
                            title={
                            <div className="w-1/12 mr-2 items-center flex">
                                <span>Speed(Knots)</span>
                            </div>
                            }
                        >
                            <div>
                            <div className="grid grid-cols-5 items-center">
                                <InputUI
                                type="ecnSpd"
                                label="Economy"
                                value={dataVessel?.ecnSpd}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, ecnSpd: e.target.value })}
                                />
                                <InputUI
                                type="vslSvcSpd"
                                label="Service"
                                value={dataVessel?.vslSvcSpd}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, vslSvcSpd: e.target.value })}
                                />
                                <InputUI
                                type="maxSpd"
                                label="Max"
                                value={dataVessel?.maxSpd}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, maxSpd: e.target.value })}
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
                                type="dplCapa"
                                label="Displacement"
                                value={dataVessel?.dplCapa}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, dplCapa: e.target.value })}
                                />
                                <InputUI
                                type="dwtWgt"
                                label="Dead Weight"
                                value={dataVessel?.dwtWgt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, dwtWgt: e.target.value })}
                                />
                                <InputUI
                                type="lgtShpTongWgt"
                                label="Light Ship"
                                value={dataVessel?.lgtShpTongWgt}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, lgtShpTongWgt: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        <Tab
                            key="Tonnage"
                            className="flex"
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
                            <div className=" space-y-3">
                            <div className="grid grid-cols-4">
                                <InputUI
                                type="grsRgstTongWgt"
                                label="Gross Ton"
                                value={dataVessel?.grsRgstTongWgt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, grsRgstTongWgt: e.target.value })}
                                />
                                <InputUI
                                type="netRgstTongWgt"
                                label="Net Ton"
                                value={dataVessel?.netRgstTongWgt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, netRgstTongWgt: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4">
                                <InputUI
                                type="pnmGtWgt"
                                label="Gross Ton"
                                value={dataVessel?.pnmGtWgt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, pnmGtWgt: e.target.value })}
                                />
                                <InputUI
                                type="pnmNetTongWgt"
                                label="Panama Net Ton"
                                value={dataVessel?.pnmNetTongWgt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, pnmNetTongWgt: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4">
                                <InputUI
                                type="suzGtWgt"
                                label="Gross Ton"
                                value={dataVessel?.suzGtWgt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, suzGtWgt: e.target.value })}
                                />
                                <InputUI
                                type="madnVoySuzNetTongWgt"
                                label="Suez Net Ton"
                                value={dataVessel?.madnVoySuzNetTongWgt}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, madnVoySuzNetTongWgt: e.target.value })}
                                />
                                <InputUI
                                type="suzNetTongWgt"
                                label="Net Ton(Maiden Voyage)"
                                value={dataVessel?.suzNetTongWgt}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, suzNetTongWgt: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4">
                                <InputUI
                                    type="intlTongCertiFlg"
                                    label="ITC"
                                    value={dataVessel?.intlTongCertiFlg}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, intlTongCertiFlg: e.target.value })}
                                />
                            </div>
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
                                type="foilCapa"
                                label="F.O"
                                value={dataVessel?.foilCapa}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, foilCapa: e.target.value })}
                                />
                                <InputUI
                                type="doilCapa"
                                label="D.O"
                                value={dataVessel?.doilCapa}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, doilCapa: e.target.value })}
                                />
                                <InputUI
                                type="foilCsm"
                                label="F.W"
                                value={dataVessel?.foilCapa}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, foilCsm: e.target.value })}
                                />
                                <InputUI
                                type="blstTnkCapa"
                                label="Ballast"
                                value={dataVessel?.blstTnkCapa}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, blstTnkCapa: e.target.value })}
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
                            <div className="grid grid-cols-3">
                                <InputUI
                                type="foilCsm"
                                label="F.O"
                                value={dataVessel?.foilCsm}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, foilCsm: e.target.value })}
                                />
                                <InputUI
                                type="doilCsm"
                                label="D.O"
                                value={dataVessel?.doilCsm}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, doilCsm: e.target.value })}
                                />
                                <InputUI
                                type="frshWtrCsm"
                                label="F.W"
                                value={dataVessel?.frshWtrCsm}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, frshWtrCsm: e.target.value })}
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
                                type="mnEngMkrNm"
                                label="Marker"
                                value={dataVessel?.mnEngMkrNm}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, mnEngMkrNm: e.target.value })}
                                />
                                <InputUI
                                type="mnEngTpDesc"
                                label="Type"
                                value={dataVessel?.mnEngTpDesc}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, mnEngTpDesc: e.target.value })}
                                />
                                <InputUI
                                type="mnEngBhpPwr"
                                label="P.H.P"
                                value={dataVessel?.mnEngBhpPwr}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, mnEngBhpPwr: e.target.value })}
                                />
                                <InputUI
                                type="mnEngRpmPwr"
                                label="R.P.M"
                                value={dataVessel?.mnEngRpmPwr}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, mnEngRpmPwr: e.target.value })}
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
                                type="bwthstMkrNm"
                                label="Marker"
                                value={dataVessel?.bwthstMkrNm}
                                onChange={(e:any) => setDataVessel({ ...dataVessel, bwthstMkrNm: e.target.value })}
                                />
                                <InputUI
                                type="bwthstTpDesc"
                                label="Type"
                                value={dataVessel?.bwthstTpDesc}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, bwthstTpDesc: e.target.value })}
                                />
                                <InputUI
                                type="bwthstBhpPwr"
                                label="P.H.P"
                                value={dataVessel?.bwthstBhpPwr}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, bwthstBhpPwr: e.target.value })}
                                />
                                <InputUI
                                type="bwthstRpmPwr"
                                label="R.P.M"
                                value={dataVessel?.bwthstRpmPwr}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, bwthstRpmPwr: e.target.value })}
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
                                type="gnrMkrNm"
                                label="Marker"
                                value={dataVessel?.gnrMkrNm}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, gnrMkrNm: e.target.value })}
                                />
                                <InputUI
                                type="gnrTpDesc"
                                label="Type"
                                value={dataVessel?.gnrTpDesc}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, gnrTpDesc: e.target.value })}
                                />
                                <InputUI
                                type="gnrBhpPwr"
                                label="P.H.P"
                                value={dataVessel?.gnrBhpPwr}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, gnrBhpPwr: e.target.value })}
                                />
                                <InputUI
                                type="gnrRpmPwr"
                                label="R.P.M"
                                value={dataVessel?.gnrRpmPwr}

                                onChange={(e:any) => setDataVessel({ ...dataVessel, gnrRpmPwr: e.target.value })}
                                />
                            </div>
                            </div>
                        </Tab>
                        </Tabs>
                    </div>
                    <hr />
                    <div className="grid grid-cols-5 my-2 bottom-0">
                        <InputUI
                            type="deltFlg"
                            label="Delete Flag"
                            disabled
                            value={dataVessel?.deltFlg}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, deltFlg: e.target.value })}
                        />
                        <InputUI
                            type="updUsrId"
                            label="Create User"
                            disabled
                            value={dataVessel?.updUsrId}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, updUsrId: e.target.value })}
                        />
                        <InputUI
                            type="creDt"
                            disabled
                            label="Create Date/Time"
                            value={dataVessel?.creDt}

                            onChange={(e:any) => setDataVessel({ ...dataVessel, creDt: e.target.value })}
                        />
                        <InputUI
                            type="updUsrId"
                            disabled
                            label="Last Update User"
                            value={dataVessel?.updUsrId}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, updUsrId: e.target.value })}
                        />
                        <InputUI
                            type="updDt"
                            disabled
                            label="Last Update Date/Time"
                            value={dataVessel?.updDt}
                            onChange={(e:any) => setDataVessel({ ...dataVessel, updDt: e.target.value })}
                        />
                        </div>
                    </form>
                </div>
    </section>
  );
}
