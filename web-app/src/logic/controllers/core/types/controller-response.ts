import {AppError, ConcreteAppError, NullAppError} from './app-error';

export abstract class ControllerResponse<T> {
  protected responseData: T;
  protected responseStatus: ControllerResponseStatus;
  protected responseError: AppError;

  get data(): T {
    return this.responseData;
  }

  get status(): ControllerResponseStatus {
    return this.responseStatus;
  }

  get error(): AppError {
    return this.responseError;
  }

  isSuccess(): boolean {
    return this.responseStatus === ControllerResponseStatus.OK;
  }

}

export enum ControllerResponseStatus {
  OK, ERROR
}

export class SuccessControllerResponse<T> extends ControllerResponse<T> {
  constructor(data: T) {
    super();
    this.responseData = data;
    this.responseStatus = ControllerResponseStatus.OK;
    this.responseError = new NullAppError();
  }
}

export class FailControllerResponse extends ControllerResponse<null> {
  constructor(error: Error) {
    super();
    this.responseData = null;
    this.responseStatus = ControllerResponseStatus.ERROR;
    this.responseError = new ConcreteAppError(error);
  }
}
