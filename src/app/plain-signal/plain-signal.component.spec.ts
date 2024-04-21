import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainSignalComponent } from './plain-signal.component';

describe('PlainSignalComponent', () => {
  let component: PlainSignalComponent;
  let fixture: ComponentFixture<PlainSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlainSignalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlainSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
