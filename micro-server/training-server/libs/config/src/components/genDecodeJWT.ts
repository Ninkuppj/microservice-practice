import { JwtService } from "@nestjs/jwt";

export function decodeToken(token: string) {
    const jwtService = new JwtService({ secret: process.env.JWT_ACCESS_TOKEN_SECRET });
    let result = null;
      try {
        const tokenData = jwtService.decode(token) as {
          exp: number;
          userId: any;
          roleId: any;
        };
        if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
          result = null;
        } else {
          result = {
            userId: tokenData.userId,
            roleId: tokenData.roleId,
          };
        }
      } catch (e) {
        result = null;
      }
      return result;
    }