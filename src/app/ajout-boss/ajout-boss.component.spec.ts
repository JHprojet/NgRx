import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBossComponent } from './ajout-boss.component';

describe('AjoutBossComponent', () => {
  let component: AjoutBossComponent;
  let fixture: ComponentFixture<AjoutBossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
