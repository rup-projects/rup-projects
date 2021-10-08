import { AppError } from './app-error';

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
}

export enum ControllerResponseStatus {
  OK, ERROR
}
