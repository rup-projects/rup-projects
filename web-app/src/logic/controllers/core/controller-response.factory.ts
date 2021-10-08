import { ControllerResponse, ControllerResponseStatus } from './types/controller-response';
import { AppError } from './types/app-error';

export class ControllerResponseFactory {

  static createSuccess<T>(data: T): ControllerResponse<T> {
    return new SuccessControllerResponse(data);
  }

  static createFail(systemError: Error): ControllerResponse<null> {
    return new FailControllerResponse(systemError);
  }
}

class SuccessControllerResponse<T> extends ControllerResponse<T> {
  constructor(data: T) {
    super();
    this.responseData = data;
    this.responseStatus = ControllerResponseStatus.OK;
    this.responseError = new NullAppError();
  }
}

class FailControllerResponse extends ControllerResponse<null> {
  constructor(error: Error) {
    super();
    this.responseData = null;
    this.responseStatus = ControllerResponseStatus.ERROR;
    this.responseError = new ConcreteAppError(error);
  }
}

class ConcreteAppError implements AppError {
  public readonly message: string;

  constructor(error: Error) {
    this.message = 'Unknown error';
    if (error instanceof Error) {
      this.message = error.message;
    }
  }
}

class NullAppError implements AppError {
  public readonly message: string;

  constructor() {
    this.message = '';
  }
}
