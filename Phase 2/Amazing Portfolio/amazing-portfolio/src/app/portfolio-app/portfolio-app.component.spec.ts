import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAppComponent } from './portfolio-app.component';

describe('PortfolioAppComponent', () => {
  let component: PortfolioAppComponent;
  let fixture: ComponentFixture<PortfolioAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
