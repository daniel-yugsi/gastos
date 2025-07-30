import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Historialgasto } from './historialgasto';

describe('Historialgasto', () => {
  let component: Historialgasto;
  let fixture: ComponentFixture<Historialgasto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Historialgasto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Historialgasto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
