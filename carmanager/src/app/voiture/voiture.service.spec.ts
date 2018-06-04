import { TestBed, inject } from '@angular/core/testing';

import { VoitureService } from './voiture.service';

describe('VoitureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoitureService]
    });
  });

  it('should be created', inject([VoitureService], (service: VoitureService) => {
    expect(service).toBeTruthy();
  }));
});
