import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'app/shared/auth/auth.service';
import { Observable } from 'rxjs';
import { Prescription } from 'app/model/prescription';
import { environment } from 'environments/environment';
import { Fill } from 'app/model/fill';
import { Presentation } from 'app/model/presentation';

@Injectable()
export class PrescriptionService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getPrescription(receiptID: string, prescriptionID: string): Observable<Prescription> {

    const url = environment.receipts_frontend.url + '/api/medicalReceipts/' 
    + `${receiptID}` + '/prescriptions/' + `${prescriptionID}`;

    let httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'x-access-token': this.authService.getToken()
      })
    };

    return this.http.get(url, httpOptions).map((res: Response) => {
      let prescriptionJSON = JSON.parse(JSON.stringify(res));

      let fills: Fill[] = new Array();
      for(let fillJSON of prescriptionJSON.fills) {
        let fill: Fill = new Fill(new Date(fillJSON.date), fillJSON.quantity);
        fills.push(fill);
      }
      let presentation: Presentation = new Presentation(null, prescriptionJSON.drug, null, null, null, null, null, null);

      let prescription: Prescription = new Prescription(null, null, presentation, null, null, fills);
      return prescription;
    });

  }

  fillPrescription(receiptID: string, prescriptionID: string, quantity: number): Observable<any> {
    const url = environment.receipts_frontend.url + '/api/medicalReceipts/' 
    + `${receiptID}` + '/prescriptions/' + `${prescriptionID}` + "/Fills";

    let httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'x-access-token': this.authService.getToken()
      })
    };
    let body = {"quantity":quantity};

    return this.http.post(url, body, httpOptions);
  }

}
