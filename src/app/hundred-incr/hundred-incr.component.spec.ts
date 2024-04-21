import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HundredIncrComponent } from './hundred-incr.component';

describe('HundredIncrComponent', () => {
  let component: HundredIncrComponent;
  let fixture: ComponentFixture<HundredIncrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HundredIncrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HundredIncrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
