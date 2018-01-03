import { Role } from './role'

export class User {
    id: string;
    name: string;
    email: string;
    mobile: string;
    roles: Role[];

    constructor(
        id: string,
        name: string,
        email: string,
        mobile: string,
        roles: Role[]
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.roles = roles;
    }
}