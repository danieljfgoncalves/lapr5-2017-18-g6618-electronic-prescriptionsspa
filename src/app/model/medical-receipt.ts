import { User } from './user'
import { Prescription } from './prescription'

export class MedicalReceipt {
    id:String;
    prescriptions: Prescription[];
    creationDate: Date;
    physician: User;
    patient: User;

    constructor(
        id:String,
        prescriptions: Prescription[],
        creationDate: Date,
        physician: User,
        patient: User
    ) {
        this.id = id;
        this.prescriptions = prescriptions;
        this.creationDate = creationDate;
        this.physician = physician;
        this.patient = patient;
    }
}