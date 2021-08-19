import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McQuestionsComponent } from './mc-questions.component';

describe('McQuestionsComponent', () => {
  let component: McQuestionsComponent;
  let fixture: ComponentFixture<McQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
