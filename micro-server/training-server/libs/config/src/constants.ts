export const CONSTANTS={
        ROLE:{
            SUPER_ADMIN:1,
            ADMIN:2,
            USER:3
        },
        PERMISSION: {
            GET:'GET',
            UPDATE:'PUT',
            DELETE:'DELETE',
            CREATE:'CREATE',
        },
        MASSAGE:{
            AUTH_LOG:{
                CREATE_SUCCESSFULLY: 'create token successfull',
                CREATE_TOKEN_FAIL: 'create token fail',
                CREATE_SUCCESS: 'create token successfull',
                DECODE_TOKEN_SUCCESSFULL: "decode token successfully",
                VERIFY_TOKEN_SUCCESSFUL:"verify token is successful",
            },
            USER_LOG:{
                LOGIN_SUCCESS: "login successfully",
                REGISTRATION_SUCCESS:"registration is successful" ,  
                WRONG_CREDENTIALS :'Wrong email or password!',  
                NOT_FOUND : 'User not found.',  
                BLOCKED : 'Your account has been blocked by admin.', 
                VERIFICATION_NEEDED : 'Please verify your email to login.',
                CREATE_USER_SUCCESSFULL: 'Create user successfully',
                NO_PERMISSION : 'You do not have permission for this action.',
                UPDATE_USER_SUCCESSFULL: 'Update profile successfully',
                PASSWORD_NOT_MATCH: 'Password does not match.',
                EMAIL_ALREADY_EXISTS: 'This email already exists.',
                DELETE_USER_SUCCESSFULL: 'Delete user successfully.'
            },
            NOTIFICATION_LOG:{
                CREATE_NOTIFICATION_SUCCESSFULL: 'Notification created successfully',
                SENDING_EMAIL_ERROR: 'Error sending an email notification',
                UPDATING_NOTIFICATION_ERROR: 'Error updating the notification',
                DELETING_NOTIFICATION_ERROR: 'Error deleting the notification',
                ERROR_LOADING_DATA: 'An error occurred while loading data',
            },
            VESSEL_LOG:{
                ADD_VESSEL_SUCCESSFUL: 'The vessel was added successfully',
                EDIT_VESSEL_SUCCESSFUL: 'The details of the vessel were updated successfully',
                DELETE_VESSEL_SUCCESSFUL: 'The vessel was deleted successfully',
                ALREADY_REGISTERED: 'This IMO number is already registered in our database, please use another one.',
            }
        },
        LOG_MESSAGE_REQUEST:{
            SUCCESS: 'Request Successful',
            FAILED: 'Request Failed',
            BAD_REQUEST: 'Bad Request. Please check your request body!',
            UNAUTHORIZED: 'Unauthorized. Invalid Token!',
            FORBIDDEN: 'Forbidden. You don\'t have permission to do it',
            NOT_FOUND: 'Not found by this id!',
            SERVER_ERROR: 'Internal Server Error!',
        }
}