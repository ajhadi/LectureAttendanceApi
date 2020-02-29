import ErrorFactory from '../views/errorFactory';

export class AppError {
    static DefaultErrorMessage              = new ErrorFactory( 1000,  500,  "Something happens on the server" );
    static ValidationError                  = new ErrorFactory( 1001,  400,  "Input doesn't valid" );
    static UserNotFound                     = new ErrorFactory( 1002,  404,  "User not Found!" );
    static ClassIsExist                     = new ErrorFactory( 1003,  400,  "Class already exists. Please use a different name" );
    static ClassNotExist                     = new ErrorFactory( 1004,  404,  "Class doesn't exist." );
    static UserIsNotTeacher                    = new ErrorFactory( 1005,  404,  "User is not a teacher" );
    static StudentNotFound                   = new ErrorFactory( 1006,  404,  "Student not found!" );
}
