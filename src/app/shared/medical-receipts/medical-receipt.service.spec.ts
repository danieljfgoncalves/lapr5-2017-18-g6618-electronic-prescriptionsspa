import { TestBed, inject } from '@angular/core/testing';

import { MedicalReceiptService } from './medical-receipt.service';

describe('MedicalReceiptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalReceiptService]
    });
  });

  it('should be created', inject([MedicalReceiptService], (service: MedicalReceiptService) => {
    expect(service).toBeTruthy();
  }));
});
