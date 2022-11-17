export interface LoginInfo {
  email: string;
  password: string;
}

export interface UserInfo {
  email: string;
  displayName: string;
  career: string;
  profile: string;
}

export interface SignUpInfo extends UserInfo {
  password: string;
}
