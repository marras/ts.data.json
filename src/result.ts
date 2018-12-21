export class Ok<a> {
  constructor(readonly value: a) {}
}
export class Err {
  constructor(readonly error: string) {}
}
export type Result<a> = Ok<a> | Err;

export function ok<a>(value: a): Result<a> {
  return new Ok(value);
}

export function err<a>(error: string): Result<a> {
  return new Err(error);
}
