import callAPI from "@/app/lib/api-helper";
import { authConfig } from "@/app/lib/auth";
import { IVessel } from "@/types/vessel";
import { getServerSession } from "next-auth";

export default class VesselService {
  private static controller = 'vessel';
  static async getById(vslCd: string) {
    return callAPI(`${VesselService.controller}/${vslCd}`);
  }
  static async deleteVesselById(vslCd: string) {
    return callAPI(`${VesselService.controller}/${vslCd}`,{method:"DELETE"});
  }
  static async getAllVessel() {
    return callAPI(`${VesselService.controller}`);
  }
  static async update(data: IVessel){
    return callAPI(`${VesselService.controller}`, {method:"PUT",body:data});
  }
  static async createVessel(data: FormData){
    return callAPI(`${VesselService.controller}`, {method:"POST",body:data});
  }
}