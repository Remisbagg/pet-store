import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCuidadorComponent } from './registro-cuidador.component';

describe('RegistroCuidadorComponent', () => {
  let component: RegistroCuidadorComponent;
  let fixture: ComponentFixture<RegistroCuidadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroCuidadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCuidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
