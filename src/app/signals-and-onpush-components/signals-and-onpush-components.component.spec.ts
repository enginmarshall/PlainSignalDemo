import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsAndOnpushComponentsComponent } from './signals-and-onpush-components.component';

describe('SignalsAndOnpushComponentsComponent', () => {
  let component: SignalsAndOnpushComponentsComponent;
  let fixture: ComponentFixture<SignalsAndOnpushComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsAndOnpushComponentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalsAndOnpushComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
