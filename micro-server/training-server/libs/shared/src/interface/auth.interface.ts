
 export interface ITokenDataResponse {
    status: number;
    message: string;
    token:  { userId: any; roleId: any; }|null;
  }

  export interface ITokenDestroyResponse {
    status: number;
    message: string;
    errors: { [key: string]: any } | null;
  }
  
  export interface IServiveTokenCreateResponse {
    status: number;
    token: string | null;
    message: string;
    errors: { [key: string]: any } |null;
  }

  export interface ITokenResponse {
    status: number;
    token: string | null;
    message: string;
  }
