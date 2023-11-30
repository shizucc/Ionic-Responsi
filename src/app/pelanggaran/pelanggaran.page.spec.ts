import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PelanggaranPage } from './pelanggaran.page';

describe('PelanggaranPage', () => {
  let component: PelanggaranPage;
  let fixture: ComponentFixture<PelanggaranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PelanggaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
