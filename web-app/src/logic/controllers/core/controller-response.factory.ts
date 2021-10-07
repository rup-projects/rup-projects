import {ControllerResponse, ControllerResponseStatus} from './types/controller-response';

export class ControllerResponseFactory {

  static failResponse(systemError: Error): ControllerResponse<null> {
    let errorMessage = 'Unknown error';
    if (systemError instanceof Error) {
      errorMessage = systemError.message;
    }
    return {
      data: null,
      status: ControllerResponseStatus.ERROR,
      error: {message: errorMessage}
    };
  }

}
