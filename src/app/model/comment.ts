import { User } from './user'

export class Comment {
    comment: string;
    physician: User;

    constructor(
        comment: string,
        physician: User
    ) {
        this.comment = comment;
        this.physician = physician;
    }
}