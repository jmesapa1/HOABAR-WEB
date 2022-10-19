import { TestBed } from '@angular/core/testing';

import { VotacionesGuard } from './votaciones.guard';

describe('VotacionesGuard', () => {
  let guard: VotacionesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VotacionesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
