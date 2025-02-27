export interface IVessel{
    vslCd?: string;
    vslClssFlg?: string;
    vslEngNm?: string;
    vslLoclNm?: string;
    foilCapa?: number;
    doilCapa?: number;
    frshWtrCapa?: number;
    callSgnNo?: string;
    rgstNo?: string;
    phnNo?: string;
    faxNo?: string;
    tlxNo?: string;
    vslEml?: string;
    piclbDesc?: string;
    rgstPortCd?: string;
    clssNoRgstAreaNm?: string;
    vslClssNo?: string;
    vslBldrNm?: string;
    loaLen?: number;
    lbpLen?: number;
    vslWdt?: number;
    vslDpth?: number;
    smrDrftHgt?: number;
    dwtWgt?: number;
    lgtShpTongWgt?: number;
    grsRgstTongWgt?: number;
    pnmGtWgt?: number;
    pnmNetTongWgt?: number;
    suzGtWgt?: number;
    suzNetTongWgt?: number;
    mnEngMkrNm?: string;
    mnEngTpDesc?: string;
    mnEngBhpPwr?: number;
    vslOwnIndCd?: string;
    vslRgstCntCd?: string;
    vslBldCd?: string;
    crrCd?: string;
    fdrDivCd?: string;
    vslSvcSpd?: number;
    maxSpd?: number;
    ecnSpd?: number;
    crwKnt?: number;
    cntrDznCapa?: number;
    cntrOpCapa?: number;
    cntrPnmCapa?: number;
    cntrVslClssCapa?: number;
    rfRcptKnt?: number;
    rfRcptMaxKnt?: number;
    fbdCapa?: number;
    dplCapa?: number;
    blstTnkCapa?: number;
    foilCsm?: number;
    doilCsm?: number;
    frshWtrCsm?: number;
    mnEngRpmPwr?: number;
    gnrRpmPwr?: number;
    vslHgt?: number;
    rgstDt?: Date;
    vslEdiNm?: string;
    coCd?: string;
    vslClzDt?: string;
    vslCreOfcCd?: string;
    vslDeltOfcCd?: string;
    vslBldAreaNm?: string;
    gnrMkrNm?: string;
    gnrTpDesc?: string;
    gnrBhpPwr?: number;
    bwthstMkrNm?: string;
    bwthstTpDesc?: string;
    bwthstBhpPwr?: number;
    bwthstRpmPwr?: number;
    lloydNo?: string;
    vslLnchDt?: Date;
    vslDeDt?: Date;
    vslKelLyDt?: Date| undefined;
    vslHlNo?: string;
    ttlTeuKnt?: number;
    vslHtchKnt?: number;
    vslHldKnt?: number;
    vslRmk?: string;
    intlTongCertiFlg?: string;
    netRgstTongWgt: number;
    madnVoySuzNetTongWgt?: number;
    vslSftCstruCertiExpDt?: Date;
    vslSftRdoCertiExpDt?: Date;
    vslSftEqCertiExpDt?: Date;
    vslLodLineCertiExpDt?: Date;
    vslDeratCertiExpDt?: Date;
    creUsrId?: string;
    creDt?: Date;
    updUsrId?: string;
    updDt?: Date;
    deltFlg?: string;
    eaiEvntDt?: Date;
    eaiIfId?: string;
    modiVslCd?: string;
    edwUpdDt?: Date;
    modiVslOprTpCd?: string;
    modiOwnrNm?: string;
    modiAllnVslCd?: string;
    nykLgcyVslCdCtnt?: string;
    molLgcyVslCdCtnt?: string;
    klineLgcyVslCdCtnt?: string;
    lgcyCoCd?: string;
  }

export interface IServiceVesselGetByIdResponse {
  status?: number;
  message?: string;
  vessel?: IVessel | null;
}

export interface IServiceVesselSearchResponse {
  status?: number;
  message?: string;
  vessel?: IVessel|any;
}

export interface IVesselByIdRequest extends Request {
  vessel?: IVessel;
}