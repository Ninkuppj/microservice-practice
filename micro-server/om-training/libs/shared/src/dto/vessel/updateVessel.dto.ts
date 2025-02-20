import { IsNumber } from "class-validator";
export class updateVesselDTO {
    vslCd: string;
    vslClssFlg?: string;
    vslEngNm?: string;
    vslLoclNm?: string;
    @IsNumber()
    foilCapa?: number;
    @IsNumber()
    doilCapa?: number;
    @IsNumber()
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
    @IsNumber()
    loaLen?: number;
    @IsNumber()
    lbpLen?: number;
    @IsNumber()
    vslWdt?: number;
    @IsNumber()
    vslDpth?: number;
    @IsNumber()
    smrDrftHgt?: number;
    @IsNumber()
    dwtWgt?: number;
    @IsNumber()
    lgtShpTongWgt?: number;
  
    @IsNumber()
    grsRgstTongWgt?: number;
  
    @IsNumber()
    pnmGtWgt?: number;
  
    @IsNumber()
    pnmNetTongWgt?: number;
  
    @IsNumber()
    suzGtWgt?: number;
  
    @IsNumber()
    suzNetTongWgt?: number;
    mnEngMkrNm?: string;
    mnEngTpDesc?: string;
  
    @IsNumber()
    mnEngBhpPwr?: number;
    vslOwnIndCd?: string;
    vslRgstCntCd?: string;
    vslBldCd?: string;
    crrCd?: string;
    fdrDivCd?: string;
  
    @IsNumber()
    vslSvcSpd?: number;
  
    @IsNumber()
    maxSpd?: number;
  
    @IsNumber()
    ecnSpd?: number;
  
    @IsNumber()
    crwKnt?: number;
  
    @IsNumber()
    cntrDznCapa?: number;
  
    @IsNumber()
    cntrOpCapa?: number;
  
    @IsNumber()
    cntrPnmCapa?: number;
  
    @IsNumber()
    cntrVslClssCapa?: number;
  
  
    @IsNumber()
    rfRcptKnt?: number;
  
    @IsNumber()
    rfRcptMaxKnt?: number;
  
    @IsNumber()
    fbdCapa?: number;
  
    @IsNumber()
    dplCapa?: number;
  
    @IsNumber()
    blstTnkCapa?: number;
  
    @IsNumber()
    foilCsm?: number;
  
    @IsNumber()
    doilCsm?: number;
  
    @IsNumber()
    frshWtrCsm?: number;
  
    @IsNumber()
    mnEngRpmPwr?: number;
  
    @IsNumber()
    gnrRpmPwr?: number;
  
    @IsNumber()
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
  
    @IsNumber()
    gnrBhpPwr?: number;
    bwthstMkrNm?: string;
    bwthstTpDesc?: string;
  
    @IsNumber()
    bwthstBhpPwr?: number;
  
    @IsNumber()
    bwthstRpmPwr?: number;
    lloydNo?: string;
    vslLnchDt?: Date;
    vslDeDt?: Date;
    vslKelLyDt?: Date;
    vslHlNo?: string;
  
    @IsNumber()
    ttlTeuKnt?: number;
  
    @IsNumber()
    vslHtchKnt?: number;
  
    @IsNumber()
    vslHldKnt?: number;
    vslRmk?: string;
    intlTongCertiFlg?: string;
  
    @IsNumber()
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