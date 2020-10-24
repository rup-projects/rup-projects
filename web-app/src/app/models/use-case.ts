export class UseCase {

  constructor(public  id: number,
              public  name: string,
              public  description: string,
              public priority: number) {
  }

  static build(useCase: UseCase): UseCase {
    return new UseCase(useCase.id, useCase.name, useCase.description, useCase.priority);
  }

}
