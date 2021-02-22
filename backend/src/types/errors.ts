// eslint-disable-next-line max-classes-per-file
export class DuplicateEntityError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundEntityError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = this.constructor.name;
  }
}
