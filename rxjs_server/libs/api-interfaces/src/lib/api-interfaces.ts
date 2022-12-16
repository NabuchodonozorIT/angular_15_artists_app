
export interface QuoteModel {
  id: number;
  text: string;
  author: string;
}

export interface QuotesDto {
  page: number,
  pageSize: number,
  total: number,
  data: QuoteModel[],
}

export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;

}

export interface ProfileModel {
  id: number;
  userId: number;
  description: string;
  photoUrl: string;
}
export interface SessionModel {
  token: string;
  user: UserModel
}

export interface LoginDto {
  token: string;
}

export interface SessionDto {
  token: string;
  user: UserModel;
}
