import { AppError } from './app-error';

export interface ControllerResponse<T> {
  readonly status: ControllerResponseStatus;
  readonly data: T;
  readonly error?: AppError;
}

export enum ControllerResponseStatus {
  OK, ERROR
}

/*export class ControllerResponseImplementation<T> implements ControllerResponse<T> {
  constructor(
    public status: ControllerResponseStatus,
    public data: T,
    public error: AppError,
  ) {
    if (status === ControllerResponseStatus.OK) {
      this.error = null;
    }
  }
}
*/


