import { Dispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

export declare type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

// 사용자 정보
export interface IUserData {
  [index: string]: string;
  address: string;
  age: string;
  username: string;
  gender: string;
  interestField1: string;
  interestField2: string;
  interestField3: string;
  job: string;
  link: string;
  major1: string;
  major2: string;
  nickname: string;
  phone: string;
  picture: string;
  univ: string;
}

export interface ILoginData {
  name?: string;
  password: string;
  username: string;
}

export type PostUserLoginFn = (url: string, data: ILoginData) => Promise<AxiosResponse>;

// 커리어 맵
export interface IMyMap {
  mapIdx: number;
  title: string;
  career: string;
}

export interface IMapInputs {
  [index: string]: string;
  title: string;
  career: string;
}

// 커리어 맵 아이템
interface IItem {
  itemIdx: number;
  sequence: number;
}

export interface IItemSequence {
  mapIdx: number;
  list: IItem[];
}
