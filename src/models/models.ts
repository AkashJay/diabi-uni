export interface IFileUpload{
    content:string;
    file_name:string;
    label?:string
}

export interface IPatient{
    name: string;
    dob: Date;
    number: string;
    address: string;
    nic: string
    diagnosedYear?: number
    image: string
}

export interface IDiagnose{
    patientNIC: string;
    dateDiagnosed: string;
    images:IFileUpload[]
}

export interface IAnalyze{
    patientNIC: string;
    rightVA:number;
    leftVA:number;
    howLong:number;
    analyzeDate:string;
    prediction?:string;
}