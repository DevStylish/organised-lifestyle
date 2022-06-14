import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpMenuComponent } from './up-menu.component';

describe('UpMenuComponent', () => {
  let component: UpMenuComponent;
  let fixture: ComponentFixture<UpMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
