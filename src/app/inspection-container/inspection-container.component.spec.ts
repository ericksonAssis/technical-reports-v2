import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionContainerComponent } from './inspection-container.component';

describe('InspectionContainerComponent', () => {
  let component: InspectionContainerComponent;
  let fixture: ComponentFixture<InspectionContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionContainerComponent]
    });
    fixture = TestBed.createComponent(InspectionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
