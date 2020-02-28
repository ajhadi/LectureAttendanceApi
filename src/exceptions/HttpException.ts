class HttpException extends Error {
    public HttpStatusCode: number;
    public Code: number;
    public Message: string;
    public AdditionalMessage: any;
    public Details: [];

    constructor(error: any) {
        super();
        this.HttpStatusCode = error.HttpStatusCode;
        this.Code = error.Code;
        this.Message = error.Message;
        this.AdditionalMessage = error.AdditionalMessage;
        this.Details = error.Details;
    }

    public SetCode(code: number) {
        this.Code = code ? code : this.Code;
        return this;
    }

    public SetMessage(message: string) {
        this.Message = (message !== null && message !== '') ? message : this.Message;
        return this;
    }

    public AddMessage(message: string) {
        this.Message = `${this.Message}. ${message}`;
        return this;
    }

    public AddDeveloperMessage(message: string) {
        this.AdditionalMessage = `${message}`;
        return this;
    }

}

export default HttpException;
