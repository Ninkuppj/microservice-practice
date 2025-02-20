import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';

import { Authorization, CONSTANTS, Permission } from '@config';
import { CreateVesselResponseDto, IServiceVesselGetAllResponse, IServiceVesselGetByIdResponse, IVessel, ValidationInterceptor, createVesselDTO, updateVesselDTO } from '@shared';
import { VesselService } from './vessel.service';
import { CONTAINS } from 'class-validator';

@Controller()
export class VesselController {
  constructor(private readonly vesselService: VesselService,
    ) {}

  // @MessagePattern({cmd: 'Vessel_create'})
  @Post()
  @UseInterceptors(new ValidationInterceptor(createVesselDTO))
  @Authorization(true)
  async createVessel(@Body() Vessel: createVesselDTO): Promise<CreateVesselResponseDto> {
    const vesselDTO:IVessel =await this.vesselService.createVessel(Vessel);
    if(vesselDTO){
    return {
      status: HttpStatus.OK,
      message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
      data: {
        vessel:vesselDTO
      }
    }
  }else {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: CONSTANTS.LOG_MESSAGE_REQUEST.BAD_REQUEST,
    }
  }
  }

  @Get()
  @Authorization(true)
  async findAllVessel(): Promise<IServiceVesselGetAllResponse> {
    const vessels:IVessel[] =await this.vesselService.findVessels();
    if(vessels){
    return {
      status: HttpStatus.OK,
      message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
      vessels:vessels
    }
  } else {
    return {
      status:HttpStatus.FORBIDDEN,
      message: CONSTANTS.LOG_MESSAGE_REQUEST.FORBIDDEN
      };
  }
  }

  @Get(':id')
  @Authorization(true)
  async findOne(@Param('id') id: string): Promise<IServiceVesselGetByIdResponse> {
    const Vessel:IVessel =await this.vesselService.findOne(id);
    
    if(Vessel){
    return {
      status: HttpStatus.OK,
      message: CONSTANTS.LOG_MESSAGE_REQUEST.SUCCESS,
      vessel:Vessel
    }
  } else {
    return {
      status:HttpStatus.NOT_FOUND,
      message:CONSTANTS.LOG_MESSAGE_REQUEST.NOT_FOUND,
      vessel:null
      };
  }
  }

  // @MessagePattern({cmd: 'Vessel_update_by_id'})
  @Put()
  @Authorization(true)
  @Permission([CONSTANTS.ROLE.ADMIN], [CONSTANTS.PERMISSION.UPDATE])
  async updateVessel(@Body() Vessel: updateVesselDTO): Promise<CreateVesselResponseDto> {
    console.log(Vessel);
    
    const vesselUpdate:any =await this.vesselService.updateVessel(Vessel);

    if(vesselUpdate){
    return {
      status: HttpStatus.OK,
      message: CONSTANTS.MASSAGE.USER_LOG.CREATE_USER_SUCCESSFULL,
      data: {
        vessel:vesselUpdate
      }
    }
  }else {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: CONSTANTS.LOG_MESSAGE_REQUEST.FAILED,
    }
  }
  }

  // @MessagePattern({cmd: 'Vessel_delete_by_id'})
  @Delete(':id')
  @Authorization(true)
  async removeVessel(@Param('id') id: string): Promise<any> {
    try{
      await this.vesselService.removeVessel(id);
      return {
        status:HttpStatus.OK,
        message:CONSTANTS.MASSAGE.VESSEL_LOG.DELETE_VESSEL_SUCCESSFUL,
      }
    }catch{
      return {
        status:HttpStatus.NOT_FOUND,
        message:CONSTANTS.LOG_MESSAGE_REQUEST.NOT_FOUND,
        Vessel:null
        };
    }
  }
}
