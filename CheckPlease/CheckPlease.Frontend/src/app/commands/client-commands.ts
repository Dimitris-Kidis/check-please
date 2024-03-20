export class CreateNewClient {
  public fullName: string;
  public phoneNumber: string;

  public constructor(fullName: string, phoneNumber: string) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
  }
}
