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