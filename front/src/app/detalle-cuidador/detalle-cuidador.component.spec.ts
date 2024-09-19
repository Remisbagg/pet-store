import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCuidadorComponent } from './detalle-cuidador.component';

describe('DetalleCuidadorComponent', () => {
  let component: DetalleCuidadorComponent;
  let fixture: ComponentFixture<DetalleCuidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleCuidadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
