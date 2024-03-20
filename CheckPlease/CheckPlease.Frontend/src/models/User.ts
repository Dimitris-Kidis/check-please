export class User {
  public email: string;
  public password: string;

  public constructor(password: string, email: string) {
    this.email = email;
    this.password = password;
  }
}

export interface IUserGridRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  age: number;
  gender: string;
  isAdmin: boolean;
}
