import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAnimalesComponent } from './listado-animales.component';

describe('ListadoAnimalesComponent', () => {
  let component: ListadoAnimalesComponent;
  let fixture: ComponentFixture<ListadoAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAnimalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
