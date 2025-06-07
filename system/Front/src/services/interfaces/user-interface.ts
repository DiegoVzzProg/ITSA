export interface IGetUsersOptions {
  user_id: number;
}

export interface IGetUsers {
  user_id: number;
}

export interface IAddUser {
  username: string;
  email: string;
  password: string;
  role_id: number;
}
