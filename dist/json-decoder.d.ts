import { Result } from './result';
export declare namespace JsonDecoder {
    export class Decoder<a> {
        private decodeFn;
        constructor(decodeFn: (json: any) => Result<a>);
        /**
         * Decodes a JSON object of type <a> and returns a Result<a>
         * @param json The JSON object
         */
        decode(json: any): Result<a>;
        /**
         * Decodes a JSON object of type <a> and calls onOk() on success or onErr() on failure, both return <b>
         * @param json The JSON object to decode
         * @param onOk function called when the decoder succeeds
         * @param onErr function called when the decoder fails
         */
        onDecode<b>(json: any, onOk: (result: a) => b, onErr: (error: string) => b): b;
        /**
         * Decodes a JSON object of type <a> and returns a Promise<a>
         * @param json The JSON object to decode
         */
        decodePromise<b>(json: any): Promise<a>;
        /**
         * Chains decoder result transformations
         * @param fn The transformation function
         */
        map<b>(fn: (value: a) => b): Decoder<b>;
        /**
         * Chains decoders
         * @param fn Function that returns a new decoder
         */
        then<b>(fn: (value: a) => Decoder<b>): Decoder<b>;
    }
    /**
     * Decoder for recursive data structures.
     *
     * @param mkDecoder A function that returns a decoder
     */
    export function lazy<a>(mkDecoder: () => Decoder<a>): Decoder<a>;
    /**
     * Decoder for `string`.
     */
    export const string: Decoder<string>;
    /**
     * Decoder for `number`.
     */
    export const number: Decoder<number>;
    /**
     * Decoder for `boolean`.
     */
    export const boolean: Decoder<boolean>;
    export type DecoderObject<a> = {
        [p in keyof Required<a>]: Decoder<a[p]>;
    };
    export type DecoderObjectKeyMap<a> = {
        [p in keyof a]?: string;
    };
    /**
     * Decoder for objects.
     *
     * @param decoders Key/value pairs of decoders for each object field.
     * @param decoderName How to display the name of the object being decoded in errors.
     * @param keyMap Optional map between json field names and user land field names.
     *               Useful when the client model does not match with what the server sends.
     */
    export function object<a>(decoders: DecoderObject<a>, decoderName: string, keyMap?: DecoderObjectKeyMap<a>): Decoder<a>;
    /**
     * Decoder for objects that performs strict key checks.
     * The decoder will fail if there are any extra keys in the provided object.
     *
     * @param decoders Key/value pairs of decoders for each object field.
     * @param decoderName How to display the name of the object being decoded in errors.
     */
    export function objectStrict<a>(decoders: DecoderObject<a>, decoderName: string): Decoder<a>;
    /**
     * Always succeeding decoder
     */
    export const succeed: Decoder<any>;
    /**
     * Always failing decoder
     */
    export function fail<a>(error: string): Decoder<a>;
    /**
     * Tries to decode with `decoder` and returns `defaultValue` on failure.
     * (It was called maybe() before)
     *
     * @param defaultValue The default value returned in case of decoding failure.
     * @param decoder The actual decoder to use.
     */
    export function failover<a>(defaultValue: a, decoder: Decoder<a>): Decoder<a>;
    /**
     * Tries to decode with `decoder` and returns `error` on failure, but allows
     * for `undefined` or `null` values to be present at the top level and returns
     * an `undefined` if the value was `undefined` or `null`.
     *
     * @param decoder The actual decoder to use.
     */
    export function optional<a>(decoder: Decoder<a>): Decoder<a | undefined>;
    /**
     * Tries to decode the provided json value with any of the provided `decoders`.
     * If all provided `decoders` fail, this decoder fails.
     * Otherwise, it returns the first successful decoder.
     *
     * @param decoders An array of decoders to try.
     */
    export function oneOf<a>(decoders: Array<Decoder<a>>, decoderName: string): Decoder<a>;
    type SubtractOne<T extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30][T];
    /**
     * Plucks the last type in a tuple of length 30 or less.
     * Else returns the first type in a tuple.
     */
    export type AllOfDecoderReturn<T extends unknown[]> = T[SubtractOne<T['length']>] extends JsonDecoder.Decoder<infer R> ? R : T[0];
    /**
     * Tries to decode the provided json value with all of the provided `decoders`.
     * The order of the provided decoders matters: the output of one decoder is passed
     * as input to the next decoder. If any of the provided `decoders` fail, this
     * decoder fails. Otherwise, it returns the output of the last decoder.
     *
     * @param decoders a spread of decoders to use.
     */
    export function allOf<T extends Array<Decoder<unknown>>, R = AllOfDecoderReturn<T>>(...decoders: T): Decoder<R>;
    /**
     * Decoder for key/value pairs.
     *
     * @param decoder An object decoder for the values. All values must have the same shape or use oneOf otherwise.
     */
    export const dictionary: <a>(decoder: Decoder<a>, decoderName: string) => Decoder<{
        [name: string]: a;
    }>;
    /**
     * Decoder for Array<T>.
     *
     * @param decoder The decoder for the array element.
     */
    export const array: <a>(decoder: Decoder<a>, decoderName: string) => Decoder<a[]>;
    /**
     * Decoder that only succeeds when json is strictly (===) `null`.
     * When succeeds it returns `defaultValue`.
     *
     * @param defaultValue The value returned when json is `null`.
     */
    export function isNull<a>(defaultValue: a): Decoder<a>;
    /**
     * Decoder that only succeeds when json is strictly (===) `undefined`.
     * When succeeds it returns `defaultValue`.
     *
     * @param defaultValue The value returned when json is `undefined`.
     */
    export function isUndefined<a>(defaultValue: a): Decoder<a>;
    /**
     * Decoder that always succeeds returning `value`.
     *
     * @param value The value returned.
     */
    export const constant: <a>(value: a) => Decoder<a>;
    /**
     * Decoder that only succeeds when json is strictly (===) `value`.
     * When succeeds it returns `value`.
     *
     * @param value The value returned on success.
     */
    export function isExactly<a>(value: a): Decoder<a>;
    export {};
}
export declare namespace $JsonDecoderErrors {
    const primitiveError: (value: any, tag: string) => string;
    const exactlyError: (json: any, value: any) => string;
    const undefinedError: (json: any) => string;
    const nullError: (json: any) => string;
    const dictionaryError: (decoderName: string, key: string, error: string) => string;
    const oneOfError: (decoderName: string, json: any) => string;
    const objectError: (decoderName: string, key: string, error: string) => string;
    const arrayError: (decoderName: string, index: number, error: string) => string;
    const objectJsonKeyError: (decoderName: string, key: string, jsonKey: string, error: string) => string;
    const objectStrictUnknownKeyError: (decoderName: string, key: string) => string;
}
