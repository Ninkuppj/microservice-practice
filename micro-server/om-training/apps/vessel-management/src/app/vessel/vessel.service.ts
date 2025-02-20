import { CONSTANTS } from '@config';
import { HttpStatus, Injectable } from '@nestjs/common';
import { IVessel, Vessel, createVesselDTO, updateVesselDTO } from '@shared';
import { VesselRepository } from './vessel.repository';

@Injectable()
export class VesselService {
  constructor(
    private readonly vesselRepository: VesselRepository,
  ) {}

  async createVessel(vessel: createVesselDTO): Promise<any> {
    return this.vesselRepository.createVessel(vessel);
  }

  async findOne(id: string): Promise<any> {
    return this.vesselRepository.findVesselById(id);
  }
  async findVessels(): Promise<IVessel[]> {
    return this.vesselRepository.findVesselAll();
  }

  async updateVessel(vessel: updateVesselDTO): Promise<any> {
    return this.vesselRepository.updateVessel(vessel);
  }

  async removeVessel(id: string): Promise<void> {
    await this.vesselRepository.removeVesselById(id);
  }
}
