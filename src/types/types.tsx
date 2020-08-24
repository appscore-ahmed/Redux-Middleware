export const USER_NAME: string = 'username';
export const PASSWORD: string = 'password';

//CREDENTIALS
const SIGN_IN: string = 'SIGN_IN';
const SIGN_OUT: string = 'SIGN_OUT';
const SIGN_IN_FAILED: string = 'SIGN_IN_FAILED';

//Tokens
const ACCESS_TOKEN: string = 'AccessToken';
const ID_TOKEN: string = 'IdToken';
const NAME: string = 'Name';

enum Status {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
}

//constants for navigation
enum Navigation_Constants {
  PIN = 'Pin',
  LOGIN = 'Login',
  DASHBOARD = 'Dashboard',
}

export {
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_FAILED,
  Status,
  //Tokens
  ACCESS_TOKEN,
  ID_TOKEN,
  NAME,
  Navigation_Constants,
};
