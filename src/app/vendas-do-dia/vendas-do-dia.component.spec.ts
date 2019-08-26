import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasDoDiaComponent } from './vendas-do-dia.component';

describe('VendasDoDiaComponent', () => {
  let component: VendasDoDiaComponent;
  let fixture: ComponentFixture<VendasDoDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendasDoDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendasDoDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
