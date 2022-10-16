import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorVisitanteComponent } from './selector-visitante.component';

describe('SelectorVisitanteComponent', () => {
  let component: SelectorVisitanteComponent;
  let fixture: ComponentFixture<SelectorVisitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorVisitanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorVisitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
