import { Fill } from './fill'
import { Posology } from './posology'
import { Presentation } from './presentation'

export class Prescription {
    expirationDate: Date;
    quantity: number;
    presentation: Presentation;
    posology: Posology;
    medicine: string;
    fills: Fill[];

    constructor(
        expirationDate: Date,
        quantity: number,
        presentation: Presentation,
        posology: Posology,
        medicine: string,
        fills: Fill[],
    ) {
        this.expirationDate = expirationDate;
        this.quantity = quantity;
        this.presentation = presentation;
        this.posology = posology;
        this.medicine = medicine;
        this.fills = fills;
    }
}