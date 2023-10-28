import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUserListComponent } from './gestion-user-list.component';

describe('GestionUserListComponent', () => {
  let component: GestionUserListComponent;
  let fixture: ComponentFixture<GestionUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionUserListComponent]
    });
    fixture = TestBed.createComponent(GestionUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
