export interface AppError {
  readonly message: string;
}

export class ConcreteAppError implements AppError {
  public readonly message: string;

  constructor(error: Error) {
    this.message = 'Unknown error';
    if (error instanceof Error) {
      this.message = error.message;
    }
  }
}

export class NullAppError implements AppError {
  public readonly message: string;

  constructor() {
    this.message = '';
  }
}
