import { Component, OnInit, OnChanges, Input, EventEmitter, NgModule } from '@angular/core';
// import * as alertFunctions from '../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';

// Forms
import {
  Form, FormGroup, FormBuilder,
  FormArray, Validators, FormControl
} from '@angular/forms';

// Pipes
import { DatePipe } from '@angular/common';

// Modals
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-receipts-create-page',
  templateUrl: './receipts-create-page.component.html',
  styleUrls: ['./receipts-create-page.component.scss']
})

export class MedicalReceiptCreatePageComponent implements OnInit {

  receipt: MedicalReceipt;
  patients: User[];
  drugs: Drug[];
  presentations: Presentation[];
  medicines: Medicine[];
  posologies: Posology[];

  prescriptions = [];

  receiptForm: FormGroup;

  modalRef;

  @Input() selectedDrug: string;
  @Input() selectedPresentation: string;
  @Input() isDrugSelected: boolean = false;
  @Input() isPresentationSelected: boolean = false;

  constructor(private receiptService: MedicalReceiptService,
    private usersService: UserService,
    private presentationsService: PresentationService,
    private fb: FormBuilder,
    private modalService: NgbModal) {

  }

  ngOnInit() {

    this.initForm();

    Observable.forkJoin(
      this.receiptService.getDrugs(),
      this.usersService.getPatients(),
    ).subscribe(data => {
      this.drugs = data[0];
      this.patients = data[1];
    });
  }

  /**
   * Initialises the receiptForm 
   * @method initForm
   */
  initForm(): void {
    let patient: "patient";
    let prescriptions: FormArray = new FormArray([]);

    this.receiptForm = new FormGroup({
      patient: new FormControl('', Validators.required),
      prescriptions: prescriptions
    })
    // Creating a new presccription
    this.addPrescription();
  }

  drugDropDownCallback(): void {
    this.isDrugSelected = false; // clears form after selecting other drug
    this.isPresentationSelected = false;
    this.posologies = [];
    Observable.forkJoin(
      this.receiptService.getMedicinesByDrug(this.selectedDrug),
      this.presentationsService.getPresentationsByDrug(this.selectedDrug)
    ).subscribe(data => {
      this.medicines = data[0],
        this.presentations = data[1],
        this.isDrugSelected = true // waits for data to be loaded before enable form
    })
  }

  presentationDropDownCallback(): void {
    this.isPresentationSelected = false; // clears form after selecting other presentation
    Observable.forkJoin(
      this.receiptService.getPosologiesByPresentation(this.selectedPresentation)
    ).subscribe(data => {
      this.posologies = data[0],
        this.isPresentationSelected = true // waits for data to be loaded before enable form
    })

  }

  /*
   * Adds a prescription to the table when creating a new receipt.
   */
  onSave() {
    for (let input of (<FormArray>this.receiptForm.controls['prescriptions']).value) {
      let prescription = {
        expirationDate: input.expiration,
        quantity: input.quantity,
        presentation: input.presentation,
        drug: input.drug,
        medicine: input.medicine,
        posology: input.posology,
      }

      this.prescriptions.push(prescription);

      this.modalRef.close();
    }
  }

  /**
  * Sends update and create method requests to the api
  * @method onSubmit
  */
  onSubmit() {

    // let prescriptions = new Array();
    // for (let prescription of this.prescriptions) {

    //   let newPrescription = {
    //     expirationDate: prescription.expirationDate,
    //     quantity: prescription.quantity,
    //     presentation: prescription.presentation,
    //     drug: prescription.drug,
    //     medicine: prescription.medicine,
    //     posology: prescription.posology
    //   }
    //   prescriptions.push(newPrescription);
    // }

    let newReceipt = {
      patient: (<FormControl>this.receiptForm.controls['patient']).value,
      prescriptions: this.prescriptions,
      //creationDate: (new Date()).toString()
    }

    if (this.receiptForm.valid) {
      console.log(newReceipt);
      this.receiptService.postReceipt(newReceipt).subscribe(
        res => {
          console.log(res);
          swal("Medical Receipts succesfully created!");
        },
        err => {
          console.log(err);
        }
      );
    }
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

  /*
   * Removes prescription from table when creating a new receipt.
   */
  removePrescription(i: number) {
    this.prescriptions.splice(i, 1);
  }

  // MODAL

  // Open default modal
  open(content) {
    this.modalRef = this.modalService.open(content);
  }

}
