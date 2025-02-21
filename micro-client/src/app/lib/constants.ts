export interface PermissionObject {
        name: string,
        path: string[],
}
export const CONSTANTS={
  ROLE:{
      SUPER_ADMIN:1,
      ADMIN:2,
      USER:3
  },
  LOG_REQUEST : {
    LOGIN_SUCCESS: "login successfully",
    REGISTRATION_SUCCESS:"registration is successful" ,  
    WRONG_CREDENTIALS :'Wrong email or password!',  
    NOT_FOUND : 'User not found.',
    PASSWORD_NOT_MATCH: 'Password does not match.',  
  }
}


export const PERMISSIONS: Record<string, PermissionObject> = {
    // ... (other permissions)
    3: {
      name: 'USER_PERMISSION',
      path: ['/','/dashboard/vessel'],
    },
    2: {
        name: 'ADMIN_PERMISSION',
        path: ['/','/dashboard/vessel', '/dashboard/users'],
    },
    // ... (other permissions)
  };
  
  export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    TOKEN_REQUEST: 'USERS_TOKEN_REQUEST',
    TOKEN_SUCCESS: 'USERS_TOKEN_SUCCESS',
    TOKEN_FAILURE: 'USERS_TOKEN_FAILURE',
    
    LOGOUT: 'USERS_LOGOUT',

    GETALL_REQUEST: 'USERS_GETALL_REQUEST',
    GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
    GETALL_FAILURE: 'USERS_GETALL_FAILURE',

    DELETE_REQUEST: 'USERS_DELETE_REQUEST',
    DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
    DELETE_FAILURE: 'USERS_DELETE_FAILURE'    
};