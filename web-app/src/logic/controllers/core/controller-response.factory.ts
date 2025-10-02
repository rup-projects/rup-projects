import {ControllerResponse, FailControllerResponse, SuccessControllerResponse} from './types/controller-response';

export class ControllerResponseFactory {

  static createSuccess<T>(data: T): ControllerResponse<T> {
    return new SuccessControllerResponse(data);
  }

  static createFail(systemError: Error): ControllerResponse<null> {
    return new FailControllerResponse(systemError);
  }
}

