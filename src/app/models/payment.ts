export class Payment {
  name: string;
  ccn: string;
  exp: string;
  ccv: string;

  constructor(name: string, ccn: string, exp: string, ccv: string) {
    this.name = name;
    this.ccn = ccn;
    this.exp = exp;
    this.ccv = ccv;
  }
}
