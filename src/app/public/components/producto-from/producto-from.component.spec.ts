import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFromComponent } from './producto-from.component';

describe('ProductoFromComponent', () => {
  let component: ProductoFromComponent;
  let fixture: ComponentFixture<ProductoFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoFromComponent]
    });
    fixture = TestBed.createComponent(ProductoFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
