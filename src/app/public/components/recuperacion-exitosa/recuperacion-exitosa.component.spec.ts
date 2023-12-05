import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacionExitosaComponent } from './recuperacion-exitosa.component';

describe('RecuperacionExitosaComponent', () => {
  let component: RecuperacionExitosaComponent;
  let fixture: ComponentFixture<RecuperacionExitosaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperacionExitosaComponent]
    });
    fixture = TestBed.createComponent(RecuperacionExitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
