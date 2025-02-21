export interface IUser {
    id: number;
    email: string;
    username: string;
    // role?: IRole | null | undefined;
    createBy: string;
    updateBy: string;
    createDate: Date;
    updateDate: Date;
  }
  
  export interface IServiceUserCreateResponse {
    status: number;
    message: string;
    user: IUser | null;
    errors: { [key: string]: any };
  }
  export interface IServiceUserUpdateResponse {
    status: number;
    message: string;
    data: {
      user: IUser | null;
    };
    errors: { [key: string]: any };
  }
  export interface IServiceUserGetAllResponse {
    status: number;
    message: string;
    users?: IUser[] | null;
    errors?: { [key: string]: any };
  }
  
  export interface IServiceUserGetByIdResponse {
    status: number;
    message: string;
    user: IUser | null;
  }
  
  export interface IServiceUserSearchResponse {
    status?: number;
    message?: string;
    user?: IUser | any;
  }
  
  export interface IUserByIdRequest extends Request {
    user: IUser;
  }
  