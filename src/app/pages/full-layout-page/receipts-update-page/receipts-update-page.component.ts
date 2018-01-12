import { Component, OnInit, OnChanges, Input, EventEmitter, NgModule } from '@angular/core';
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

  prescriptions = [];
  prescriptionsVisual = [];

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
      this.receiptService.getReceipts()
    ).subscribe(data => {
      this.drugs = data[0];
      this.patients = data[1]
      this.receipts = data[2];
    });
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

  onReceiptSelection() {

    let receiptId = (<FormControl>this.receiptForm.get('selectedReceipt')).value;
    this.receipt = this.findReceipt(receiptId).pop();

    this.mapPrescriptions(this.receipt.prescriptions);
  }

  mapPrescriptions(prescs) {

    prescs.forEach(presc => {
      this.receiptService.getMedicinesByDrug(presc.presentation.drug).subscribe(meds => {

        let expDate = new Date(presc.expirationDate).toJSON();

        let prescDTO = {
          expirationDate: expDate,
          quantity: presc.quantity,
          presentation: presc.presentation.id,
          medicine: null,
          posology: presc.posology.id
        };
        let visualPrescDTO = {
          expirationDate: presc.expirationDate,
          quantity: presc.quantity,
          presentation: presc.presentation,
          drug: null,
          medicine: null,
          posology: presc.posology
        };

        // filter drug
        for(let i = 0; i < this.drugs.length; i++) {
          let d = this.drugs[i];
          if(d.name === presc.presentation.drug) {
            visualPrescDTO.drug = d.name;
          }
        }

        // filter medicine
        for(let i = 0; i < meds.length; i++) {
          let m = meds[i];
          if(m.name === presc.medicine) {
            prescDTO.medicine = m.id;
            visualPrescDTO.medicine = m.name;
          }
        }

        this.prescriptions.push(prescDTO);
        this.prescriptionsVisual.push(visualPrescDTO);

        console.log(prescDTO);
        console.log(visualPrescDTO);
      });;
    });

  }

  findReceipt(id: String) {
    return this.receipts.filter(receipt => receipt.id == id);
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

      this.addVisualPrescription(prescription);
      delete prescription.drug;
      this.prescriptions.push(prescription);

      this.modalRef.close();
    }
  }

  addVisualPrescription(prescription) {
    var visualPresc = {
      expirationDate: prescription.expirationDate,
      quantity: prescription.quantity,
      presentation: null,
      drug: prescription.drug,
      medicine: null,
      posology: null
    };

    // set presentations
    for (let i = 0; i < this.presentations.length; i++) {
      let pres = this.presentations[i];
      if (pres.id === prescription.presentation) {
        visualPresc.presentation = pres;
      }
    }

    // set medicines
    for (let i = 0; i < this.medicines.length; i++) {
      let med = this.medicines[i];
      if (med.id === prescription.medicine) {
        visualPresc.medicine = med.name;
      }
    }

    // set posologies
    for (let i = 0; i < this.posologies.length; i++) {
      let pos = this.posologies[i];
      if (pos.id === prescription.posology) {
        visualPresc.posology = pos;
      }
    }

    this.prescriptionsVisual.push(visualPresc);
  }

  /**
  * Sends update method requests to the api
  * @method onSubmit
  */
  onSubmit() {

    let newReceipt = {
      patient: (<FormControl>this.receiptForm.controls['patient']).value,
      prescriptions: this.prescriptions
    }

    if (this.receiptForm.valid) {
      console.log(newReceipt);
      this.receiptService.putReceipt(newReceipt, this.receipt.id).subscribe(
        res => {
          console.log(res);
          swal("Medical Receipts succesfully updated!");
        },
        err => {
          console.log(err);
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

  /*
 * Removes prescription from table when creating a new receipt.
 */
  removePrescription(i: number) {
    this.prescriptions.splice(i, 1);
    this.prescriptionsVisual.splice(i, 1);
  }

  // MODAL

  // Open default modal
  open(content) {

    this.receiptForm.controls['prescriptions'].reset();
    this.isDrugSelected = false;
    this.isPresentationSelected = false;

    this.modalRef = this.modalService.open(content);
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
