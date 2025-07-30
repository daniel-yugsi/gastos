import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registrogastos } from './registrogastos';

describe('Registrogastos', () => {
  let component: Registrogastos;
  let fixture: ComponentFixture<Registrogastos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registrogastos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registrogastos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
