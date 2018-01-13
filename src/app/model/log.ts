export class Log {
  id: string;
  type: string;
  date: string;
  audience: string;


  constructor(
    id: string,
    type: string,
    date: string,
    audience: string,

  ) {
    this.id = id;
    this.type = type;
    this.date = date;
    this.audience = audience;

  }
}
