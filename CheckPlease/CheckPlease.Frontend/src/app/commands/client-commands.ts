export class CreateNewClient {
    fullName: string;
    phoneNumber: string;
    jobTitle?: string;
    
    constructor(fullName: string, phoneNumber: string, jobTitle: string) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.jobTitle = jobTitle;
    }
}

