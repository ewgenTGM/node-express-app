

interface IResponseModel<T> {
  success: boolean
  errors: Array<string>
  data: T | null
}

export class ResponseModel<T> implements IResponseModel<T> {
  data: T | null;
  errors: Array<string>;
  success: boolean;

  constructor() {
    this.success = true;
    this.errors = [];
    this.data = null;
  }
}