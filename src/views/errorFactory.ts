class ErrorFactory{
    public HttpStatusCode: number;
    public Code: number;
    public Message: string;
    public AdditionalMessage: any;
    public Details: [];

    constructor( code: number, httpStatusCode: number, message: string, additionalMessage: any = null) {
        this.HttpStatusCode = httpStatusCode;
        this.Code = code;
        this.Message = message;
        this.AdditionalMessage = additionalMessage;
        this.Details = [];
    }
}

export default ErrorFactory;
