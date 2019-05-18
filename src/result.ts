export class Ok<a> {
  constructor(readonly value: a) {}

  map<b>(fn: (a: a) => b): Result<b> {
    return ok(fn(this.value));
  }
}
export class Err {
  constructor(readonly error: string) {}

  map<b>(fn: (a: any) => b): Result<b> {
    return this;
  }
}
export type Result<a> = Ok<a> | Err;

export function ok<a>(value: a): Result<a> {
  return new Ok(value);
}

export function err<a>(error: string): Result<a> {
  return new Err(error);
}
