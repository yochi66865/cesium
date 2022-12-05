import { TestBed } from '@angular/core/testing';

import { CesiumService } from './cesium-service.service';

describe('CesiumServiceService', () => {
  let service: CesiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CesiumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
