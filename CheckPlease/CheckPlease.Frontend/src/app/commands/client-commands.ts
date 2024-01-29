export class CreateNewClient {
  public fullName: string;
  public phoneNumber: string;
  public jobTitle?: string;

  public constructor(fullName: string, phoneNumber: string, jobTitle: string) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.jobTitle = jobTitle;
  }
}
