import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionDetailsComponent } from './conversion-details.component';

describe('ConversionDetailsComponent', () => {
  let component: ConversionDetailsComponent;
  let fixture: ComponentFixture<ConversionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
