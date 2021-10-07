import { AppError } from './app-error';

export interface ControllerResponse<T> {
  readonly status: ControllerResponseStatus;
  readonly data: T;
  readonly error: AppError;
}

export enum ControllerResponseStatus {
  OK, ERROR
}
