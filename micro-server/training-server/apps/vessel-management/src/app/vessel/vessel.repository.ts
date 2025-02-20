import { CONSTANTS } from '@config';
import { HttpException, Injectable } from '@nestjs/common';
import { User, Vessel, createUserDTO, createVesselDTO, udpateUserDTO, updateVesselDTO } from '@shared';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class VesselRepository extends Repository<Vessel>{
  constructor(private dataSource: DataSource)
  {
      super(Vessel, dataSource.createEntityManager());
  }
  async createVessel(vessel: createVesselDTO): Promise<any> {
    try {
        return this.save(vessel)
    } catch (e) {
        throw new HttpException(
          CONSTANTS.LOG_MESSAGE_REQUEST.BAD_REQUEST,
          400, // Bad Request
        );
    }
  }

  async findVesselById(id: string): Promise<any> {
    return this.findOne({where: {vslCd:id}});
  }
  async findVesselAll(): Promise<any> {
    return this.find();
  }

  async updateVessel(vessel: updateVesselDTO): Promise<any> {
    return this.update(vessel.vslCd, vessel).then(() => this.findOne({where: {vslCd:vessel.vslCd}}));
  }

  async removeVesselById(id: string): Promise<void> {
    await this.delete(id);
  }
}
