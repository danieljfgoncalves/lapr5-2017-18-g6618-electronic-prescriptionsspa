export class Registration {
    qr: String;
    username: boolean;

    constructor(qr: String, username: boolean) {
        this.qr = qr;
        this.username = username;
    }
}