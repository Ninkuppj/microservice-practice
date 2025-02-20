import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard, AuthGuardModule, CONSTANTS } from '@config';
import { CreateVesselResponseDto, UpdateVesselResponseDto, createVesselDTO, deleteVesselDTO, updateVesselDTO } from '@shared';
import { Repository } from 'typeorm';
import { VesselController } from './vessel.controller';
import { VesselRepository } from './vessel.repository';
import { VesselService } from './vessel.service';
// Mock data
const mockVessel: any= {
    vslCd: "NHWT",
    vslClssFlg: "N",
    vslEngNm: "NYK HAWK",
    vslLoclNm: "",
    foilCapa: 0,
    doilCapa: 0,
    frshWtrCapa: 0,
    callSgnNo: "H3BL",
    rgstNo: "",
    phnNo: "",
    faxNo: "",
    tlxNo: "",
    vslEml: "",
    piclbDesc: "",
    rgstPortCd: "PAPTY",
    clssNoRgstAreaNm: "NK",
    vslClssNo: "",
    vslBldrNm: "",
    loaLen: 364,
    lbpLen: 349,
    vslWdt: 50,
    vslDpth: 29,
    smrDrftHgt: 15,
    dwtWgt: 139335,
    lgtShpTongWgt: 0,
    grsRgstTongWgt: 144277,
    netRgstTongWgt: 82126,
    pnmGtWgt: 0,
    pnmNetTongWgt: 0,
    suzGtWgt: 146433,
    suzNetTongWgt: 133950,
    mnEngMkrNm: "",
    mnEngTpDesc: "",
    mnEngBhpPwr: 0,
    vslOwnIndCd: "C",
    vslRgstCntCd: "PA",
    vslBldCd: "",
    crrCd: "ONE",
    fdrDivCd: "T",
    vslSvcSpd: 20,
    maxSpd: 22,
    ecnSpd: 0,
    crwKnt: 0,
    cntrDznCapa: 14000,
    cntrOpCapa: 0,
    cntrPnmCapa: 0,
    cntrVslClssCapa: 14000,
    rfRcptKnt: 0,
    rfRcptMaxKnt: 0,
    fbdCapa: 0,
    dplCapa: 182869,
    blstTnkCapa: 0,
    foilCsm: 0,
    doilCsm: 0,
    frshWtrCsm: 0,
    mnEngRpmPwr: 0,
    gnrRpmPwr: 0,
    vslHgt: 64,
    rgstDt: ""as any,
    vslEdiNm: "",
    coCd: "",
    vslClzDt: "",
    vslCreOfcCd: "",
    vslDeltOfcCd: "",
    vslBldAreaNm: "",
    gnrMkrNm: "",
    gnrTpDesc: "",
    gnrBhpPwr: 0,
    bwthstMkrNm: "",
    bwthstTpDesc: "",
    bwthstBhpPwr: 0,
    bwthstRpmPwr: 0,
    lloydNo: "9741413",
    vslLnchDt: "31-Mar-17"  as any,
    vslDeDt: ""  as any,
    vslKelLyDt: "1-Dec-15" as any,
    vslHlNo: "",
    ttlTeuKnt: 14000,
    vslHtchKnt: 0,
    vslHldKnt: 0,
    vslRmk: "",
    intlTongCertiFlg: "Y",
    madnVoySuzNetTongWgt: 133950,
    vslSftCstruCertiExpDt: "2020-05-14T17:00:00.000Z" as any,
    vslSftRdoCertiExpDt: "" as any,
    vslSftEqCertiExpDt: "" as any,
    vslLodLineCertiExpDt: "" as any,
    vslDeratCertiExpDt: "" as any,
    creUsrId: "MIGUSER",
    creDt: "2017-12-28T17:00:00.000Z" as any,
    updUsrId: "SPRKARP2",
    updDt: "2020-05-14T17:00:00.000Z" as any,
    deltFlg: "N",
    eaiEvntDt: "" as any,
    eaiIfId: "",
    modiVslCd: "3XD",
    edwUpdDt: "" as any,
    modiVslOprTpCd: "",
    modiOwnrNm: "",
    modiAllnVslCd: "NHW",
    nykLgcyVslCdCtnt: "NHWT",
    molLgcyVslCdCtnt: "NHW",
    klineLgcyVslCdCtnt: "NYKHAW",
    lgcyCoCd: ""
};
const mockAuthorizationService = {
    AuthGuard: jest.fn().mockImplementation(() => ({
      CanActivate : jest.fn().mockReturnValue(true), // Mock the canActivate method
    })), // Mock the canActivate method
};

describe('VesselController', () => {
  let app: TestingModule;

  let vesselController: VesselController;
  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports:[AuthGuardModule],
      controllers: [VesselController],
      providers: [VesselService,VesselRepository,{
        provide:VesselRepository,
        useClass: Repository
      },
      {
        provide:AuthGuard,
        useValue: mockAuthorizationService
      },
      {
        provide:VesselRepository,
        useFactory:()=> ({
          createVessel: jest.fn<CreateVesselResponseDto,[createVesselDTO]>().mockReturnThis(),
          findVesselById:jest.fn((id)=>Promise.resolve(mockVessel)),
          findVesselAll: jest.fn(()=>Promise.resolve([mockVessel])),
          updateVessel: jest.fn<UpdateVesselResponseDto,[updateVesselDTO]>(),
          removeVesselById: jest.fn<deleteVesselDTO,[string]>(),
        })
      }
      ],
      
    }).compile();
    
    vesselController = app.get<VesselController>(VesselController);
  });
  it('should be defined', () => {
    expect(vesselController).toBeDefined();
  });
    it('should return "All Vessel"', () => {
      vesselController.findAllVessel().then(data => expect(data).toEqual({status:200,message:CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS, vessels:[mockVessel]}));
    });

  it('should create a vessel', () => {
    // Mocking the createVessel method
    vesselController.createVessel = jest.fn().mockReturnValueOnce(mockVessel);

    const createdVessel = vesselController.createVessel(mockVessel);
    expect(createdVessel).toEqual(mockVessel);
    // Verify that the method was called with the correct arguments
    expect(vesselController.createVessel).toHaveBeenCalledWith(mockVessel);
  });

  it('should get a vessel by id', () => {
    // Mocking the getVesselById method
    vesselController.findOne = jest.fn().mockReturnValueOnce(mockVessel);

    const retrieveVessel = vesselController.findOne('GTGT');
    expect(retrieveVessel).toEqual(mockVessel);
    // Verify that the method was called with the correct argument
    expect(vesselController.findOne).toHaveBeenCalledWith('GTGT');
  });

  it('should update a vessel', () => {
    // Mocking the updateUser method
    vesselController.updateVessel = jest.fn().mockReturnValueOnce({ ...mockVessel, vslLoclNm: "NYK HAWK"});

    const updatedVessel: any = vesselController.updateVessel({ ...mockVessel, vslLoclNm: "NYK HAWK"});
    expect(updatedVessel?.vslLoclNm).toBe('NYK HAWK');
    // Verify that the method was called with the correct arguments
    expect(vesselController.updateVessel).toHaveBeenCalledWith({ ...mockVessel, vslLoclNm: "NYK HAWK"});
  });

  it('should delete a vessel', () => {
    // Mocking the removeVessel method
    vesselController.removeVessel = jest.fn().mockReturnValueOnce(true);

    const isDeleted = vesselController.removeVessel("GTGT");
    expect(isDeleted).toBe(true);
    // Verify that the method was called with the correct argument
    expect(vesselController.removeVessel).toHaveBeenCalledWith("GTGT");
  });
});