import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppLayoutSidenavMenuComponent } from './app-layout-sidenav-menu.component';

describe('AppLayoutSidenavMenuComponent', () => {
  let component: AppLayoutSidenavMenuComponent;
  let fixture: ComponentFixture<AppLayoutSidenavMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLayoutSidenavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutSidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
