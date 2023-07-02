import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTestPageComponent } from './state-test-page.component';

describe('StateTestPageComponent', () => {
  let component: StateTestPageComponent;
  let fixture: ComponentFixture<StateTestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateTestPageComponent]
    });
    fixture = TestBed.createComponent(StateTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
