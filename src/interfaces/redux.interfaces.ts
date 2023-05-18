import { store } from '../index';

export interface IStringMap<T> {
	[key: string]: T
}

export type IAnyFunction = (..._args: any[]) => any;
export type IActionUnion<A extends IStringMap<IAnyFunction>> = ReturnType<A[keyof A]>;

export type Store = ReturnType<typeof store.getState>;

export type IGetState = typeof store.getState;
export type IDistpatch = typeof store.dispatch;
