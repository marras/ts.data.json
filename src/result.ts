export class Ok<a> {
  constructor(readonly value: a) {}

  map<b>(fn: (a: a) => b): Result<b> {
    return ok(fn(this.value));
  }
}

export class Err<a> {
  constructor(readonly error: string) {}

  map<b>(fn: (a: a) => b): Result<b> {
    return err<b>(this.error);
  }
}

export type Result<a> = Ok<a> | Err<a>;

export function ok<a>(value: a): Result<a> {
  return new Ok(value);
}

export function err<a>(error: string): Result<a> {
  return new Err<a>(error);
}
