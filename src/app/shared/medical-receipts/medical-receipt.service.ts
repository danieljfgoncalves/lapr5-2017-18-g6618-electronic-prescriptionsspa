import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MedicalReceipt } from '../../model/medical-receipt';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'

import { Prescription } from '../../model/prescription';
import { Presentation } from '../../model/presentation';
import { Comment } from '../../model/comment';
import { Posology } from 'app/model/posology';
import { forEach } from '@angular/router/src/utils/collection';
import { Fill } from 'app/model/fill';
import { User } from 'app/model/user';
import { Drug } from 'app/model/drug';
import { Medicine } from 'app/model/medicine';

@Injectable()
export class MedicalReceiptService {

  private baseUrl = environment.receipts_frontend.url;

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  getHeaders() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken(),
      'client_id': environment.receipts_frontend.client_id,
      'client_secret': environment.receipts_frontend.client_secret,
    });
    let httpOptions = {
      headers: headers
    };
    return httpOptions;
  }

  getHeadersMed() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getMedicinesToken()
    });
    let httpOptions = {
      headers: headers
    };
    return httpOptions;
  }

  mapReceipt(json): MedicalReceipt {

    let prescriptions: Prescription[] = new Array();
    for (let prescriptionJSON of json.prescriptions) {
      // fills
      let fills: Fill[] = new Array();
      for (let fillJSON of prescriptionJSON.fills) {
        let fill: Fill = new Fill(new Date(fillJSON.date), fillJSON.quantity);
        fills.push(fill);
      }
      // presentation
      let presentation: Presentation = new Presentation(
        null,
        prescriptionJSON.drug,
        null,
        null,
        prescriptionJSON.presentation.form,
        prescriptionJSON.presentation.concentration,
        prescriptionJSON.presentation.quantity,
        null
      );
      // Posology
      let posology: Posology = new Posology(
        prescriptionJSON.prescribedPosology.posologyId,
        prescriptionJSON.prescribedPosology.quantity,
        prescriptionJSON.prescribedPosology.technique,
        prescriptionJSON.prescribedPosology.interval,
        prescriptionJSON.prescribedPosology.period
      );

      let prescription = new Prescription(
        new Date(prescriptionJSON.expirationDate),
        prescriptionJSON.quantity,
        presentation,
        posology,
        prescriptionJSON.medicine,
        fills
      )
      prescriptions.push(prescription);
    }

    let patient: User = {
      id: json.patient.userID,
      name: json.patient.username,
      email: json.patient.email,
      mobile: json.patient.mobile,
      roles: json.patient.roles
    };

    let physician: User = {
      id: json.physician.userID,
      name: json.physician.username,
      email: json.physician.email,
      mobile: json.physician.mobile,
      roles: json.physician.roles
    };

    return new MedicalReceipt(
      json._id,
      prescriptions,
      new Date(json.creationDate),
      physician,
      patient
    );
  }

  getReceipts(): Observable<MedicalReceipt[]> {

    const url = this.baseUrl + '/api/medicalReceipts'

    return this.http.get<MedicalReceipt[]>(url,
      this.getHeaders()).map(res => {
        // Parse res to JSON
        let json = JSON.parse(JSON.stringify(res));

        let receipts: MedicalReceipt[] = new Array();
        for (let receipt of json) {
          receipts.push(this.mapReceipt(receipt));
        }
        return receipts;
      });
  }

  getDrugs(): Observable<Drug[]> {

    const url = environment.medicines_backend.url + '/api/Drugs'

    return this.http.get<Drug[]>(url, this.getHeadersMed()).map(res => {
      // Parse res to JSON
      let json = JSON.parse(JSON.stringify(res));

      let drugs: Drug[] = new Array();
      for (let drug of json) {

        let newDrug: Drug = {
          id: drug.drugId,
          name: drug.name
        }
        drugs.push(newDrug);
      }
      return drugs;
    });
  }

  getMedicines(): Observable<Medicine[]> {

    const url = environment.medicines_backend.url + '/api/Medicines'

    return this.http.get<Medicine[]>(url, this.getHeadersMed()).map(res => {
      // Parse res to JSON
      let json = JSON.parse(JSON.stringify(res));

      let medicines: Medicine[] = new Array();
      for (let medicine of json) {

        let newMed: Medicine = {
          id: medicine.medicineId,
          name: medicine.name
        }
        medicines.push(newMed);
      }
      return medicines;
    });
  }

  getMedicinesByDrug(drug): Observable<Medicine[]> {

    const url = environment.medicines_backend.url + '/api/Medicines'

    return this.http.get<Medicine[]>(url, this.getHeadersMed()).map(res => {
      // Parse res to JSON
      let json = JSON.parse(JSON.stringify(res));

      let medicines: Medicine[] = new Array();
      for (let medicine of json) {
        if (medicine.drug.name == drug) {
          let newMed: Medicine = {
            id: medicine.id,
            name: medicine.name
          }
          medicines.push(newMed);
        }
      }
      return medicines;
    });
  }

  getPosologies(): Observable<Posology[]> {

    const url = environment.medicines_backend.url + '/api/Posologies'

    return this.http.get<Posology[]>(url, this.getHeadersMed()).map(res => {
      // Parse res to JSON
      let json = JSON.parse(JSON.stringify(res));

      let posologies: Posology[] = new Array();
      for (let posology of json) {

        let newPosology: Posology = {
          id: posology.posologyId,
          quantity: posology.quantity,
          technique: posology.technique,
          interval: posology.interval,
          period: posology.period
        }
        posologies.push(newPosology);
      }
      return posologies;
    });
  }

  getPosologiesByPresentation(presentation): Observable<Posology[]> {

    const url = environment.medicines_backend.url + '/api/Posologies'

    return this.http.get<Posology[]>(url, this.getHeadersMed()).map(res => {
      // Parse res to JSON
      let json = JSON.parse(JSON.stringify(res));

      let posologies: Posology[] = new Array();
      for (let posology of json) {
        if (posology.presentation.id === presentation) {

          let newPosology: Posology = {
            id: posology.id,
            quantity: null,
            technique: posology.technique,
            interval: posology.interval,
            period: posology.period
          }
          posologies.push(newPosology);
        }
      }
      return posologies;
    });
  }

  postReceipt(body): Observable<boolean> {

    const url = this.baseUrl + '/api/medicalReceipts'

    return this.http.post<boolean>(url, body,
      this.getHeaders());
  }

  putReceipt(body, id): Observable<boolean> {

    const url = this.baseUrl + '/api/medicalReceipts/' + id

    return this.http.put<boolean>(url, body,
      this.getHeaders());
  }
}
