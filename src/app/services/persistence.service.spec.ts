/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PersistenceService } from './persistence.service';

import { environment }    from '../../environments/environment';

describe('Service: Persistence', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PersistenceService,
        environment.logger
        ],
    });
  });

  it('should ...', inject([PersistenceService], (service: PersistenceService) => {
    expect(service).toBeTruthy();
  }));
});
