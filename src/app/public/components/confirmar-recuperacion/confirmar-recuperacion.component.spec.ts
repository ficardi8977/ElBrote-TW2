import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarRecuperacionComponent } from './confirmar-recuperacion.component';

describe('ConfirmarRecuperacionComponent', () => {
  let component: ConfirmarRecuperacionComponent;
  let fixture: ComponentFixture<ConfirmarRecuperacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarRecuperacionComponent]
    });
    fixture = TestBed.createComponent(ConfirmarRecuperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
