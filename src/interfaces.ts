import { AxiosResponse } from 'axios';

// 네이버 로그인에서 사용
export interface IUserLoginInfo {
  token: string;
  email: string;
  name: string;
  profileImg: string;
  nickname?: string;
}

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
