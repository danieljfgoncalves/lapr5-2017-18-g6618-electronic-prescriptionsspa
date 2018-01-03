import { Component, OnInit, OnChanges, Input, EventEmitter, NgModule } from '@angular/core';
import swal from 'sweetalert2';

// Forms
import {
  Form, FormGroup, FormBuilder,
  FormArray, Validators, FormControl
} from '@angular/forms';

// Pipes
import { DatePipe } from '@angular/common';

// Services
import { MedicalReceiptService } from '../../../shared/medical-receipts/medical-receipt.service'
import { UserService } from 'app/shared/user.service';
// Models
import { MedicalReceipt } from '../../../model/medical-receipt'
import { User } from 'app/model/user';
import { Prescription } from 'app/model/prescription';
import { Observable } from 'rxjs/Observable';
import { Drug } from 'app/model/drug';
import { Presentation } from 'app/model/presentation';
import { PresentationService } from 'app/presentation.service';
import { Medicine } from 'app/model/medicine';
import { Posology } from 'app/model/posology';

@Component({
  selector: 'app-receipts-update-page',
  templateUrl: './receipts-update-page.component.html',
  styleUrls: ['./receipts-update-page.component.scss']
})
export class MedicalReceiptUpdatePageComponent implements OnInit {

  receipt: MedicalReceipt = null;

  receipts: MedicalReceipt[];
  patients: User[];
  drugs: Drug[];
  presentations: Presentation[];
  medicines: Medicine[];
  posologies: Posology[];

  receiptForm: FormGroup;

  constructor(private receiptService: MedicalReceiptService,
              private usersService: UserService,
              private presentationsService: PresentationService,
              private fb: FormBuilder) { 
              }

  ngOnInit() {

    this.initForm();

    Observable.forkJoin(
      this.receiptService.getDrugs(),
      this.usersService.getPatients(),
      this.receiptService.getMedicines(),
      this.presentationsService.getPresentations(),
      this.receiptService.getPosologies(),
      this.receiptService.getReceipts()
    ).subscribe(data => {
      this.drugs = data[0];
      this.patients = data[1];
      this.medicines = data[2];
      this.presentations = data[3];
      this.posologies = data[4];
      this.receipts = data[5];
    });
  }

  onReceiptSelection() {

    let receiptId = (<FormControl>this.receiptForm.get('selectedReceipt')).value;
    this.receipt = this.findReceipt(receiptId).pop();
  }

  findReceipt(id:String) {
      return this.receipts.filter(receipt => receipt.id == id);
  }

  /**
  * Sends update method requests to the api
  * @method onSubmit
  */
  onSubmit() {

    let prescriptions = new Array();
    for(let input of (<FormArray>this.receiptForm.controls['prescriptions']).value) {

      let prescription = {
        expirationDate: input.expiration,
        quantity: input.quantity,
        presentation: input.presentation,
        drug: input.drug,
        medicine: input.medicine,
        posology: input.posology
      }

      prescriptions.push(prescription);
    }

    let newReceipt = {
      patient: (<FormControl>this.receiptForm.controls['patient']).value,
      prescriptions: prescriptions,
      creationDate: (new Date()).toString()
    }

    if (this.receiptForm.valid) {
      console.log(newReceipt);
      this.receiptService.putReceipt(newReceipt, this.receipt.id).subscribe(
        res => {
          console.log(res);
          swal("Medical Receipts succesfully updated!");
        },
        err => {
          console.log("Error occured");
        }
      );
    }
  }

  /**
   * Initialises the receiptForm 
   * @method initForm
   */
  initForm(): void {
    let patient: "patient";
    let prescriptions: FormArray = new FormArray([]);
    let receipt: "";

    this.receiptForm = new FormGroup({
      selectedReceipt: new FormControl(receipt),
      patient: new FormControl('', Validators.required),
      prescriptions: prescriptions
    })
    // Creating a new presccription
    this.addPrescription();
 
  }

  /**
   * Adds a prescription FormGroup to the prescriptions <FormArray>FormControl(__prescriptions__)
   * @method addPrescription
   * @param void
   * @return void
   */
  addPrescription(): void {
    let expDate = '';
    let quantity = '';
    let drug = '';
    let medicine = '';
    let presentation = '';
    let posology = '';

    (<FormArray>this.receiptForm.controls['prescriptions']).push(
      new FormGroup({
        expiration: new FormControl(expDate, Validators.required),
        quantity: new FormControl(quantity, Validators.required),
        drug: new FormControl(drug, Validators.required),
        medicine: new FormControl(medicine, Validators.required),
        presentation: new FormControl(presentation, Validators.required),
        posology: new FormControl(posology, Validators.required)
      })
    )
  }

  // change(event) {
  //   let drugId = event.currentTarget.value;
  //   let formArrayID = event.currentTarget.name;
  //   let formArray = this.receiptForm.get('prescriptions');
  // }

  // getPresentations(name:String) {
  //   this.presentationsService.getPresentations().subscribe(presentations => {
  //     this.presentations = presentations.filter(presentation => presentation.drug == name);
  //   })
  // }
}
