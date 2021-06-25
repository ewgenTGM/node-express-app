interface IResponseModel<T> {
    success: boolean
    errors: Array<string>
    messages: Array<string>
    data: T | null
}

export class ResponseModel<T> implements IResponseModel<T> {
    data: T | null;
    errors: Array<string>;
    messages: Array<string>;
    success: boolean;

    constructor() {
        this.success = true;
        this.data = null;
        this.messages = [];
        this.errors = [];
    }
}