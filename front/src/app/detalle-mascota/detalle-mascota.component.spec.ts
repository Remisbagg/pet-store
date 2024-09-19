import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMascotaComponent } from './detalle-mascota.component';

describe('DetalleMascotaComponent', () => {
  let component: DetalleMascotaComponent;
  let fixture: ComponentFixture<DetalleMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
