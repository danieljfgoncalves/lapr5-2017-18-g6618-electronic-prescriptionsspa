export class Posology {
    id: number;
    quantity: string;
    technique: string;
    interval: string;
    period: string;

    constructor(
        id: number,
        quantity: string,
        technique: string,
        interval: string,
        period: string
    ) {
        this.id = id;
        this.quantity = quantity;
        this.technique = technique;
        this.interval = interval;
        this.period = period;
    }
}