import ErrorFactory from '../views/errorFactory';

export class AppError {
    static DefaultErrorMessage              = new ErrorFactory( 1000,  500,  "Something happens on the server" );
    static ValidationError                  = new ErrorFactory( 1001,  400,  "Input doesn't valid" );
}
