import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular/common/providers/alert-controller';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ModalController } from '@ionic/angular';
const USERNAME = 'namasaya';
@Component({
  selector: 'app-pelanggaran',
  templateUrl: './pelanggaran.page.html',
  styleUrls: ['./pelanggaran.page.scss'],
})
export class PelanggaranPage implements OnInit {
  public sessionNama = '';

  dataPelanggaran: any = [];
  modal_tambah = false;
  id: any;
  nama: any;
  lokasi: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public _apiService: ApiService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.cekSesi();
    this.getPelanggaran();
  }
  async cekSesi() {
    const ambilNama = localStorage.getItem(USERNAME);
    if (ambilNama) {
      let namaUser = ambilNama;
      this.sessionNama = namaUser;
    } else {
      this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }

  getPelanggaran() {
    this._apiService.tampil('tampilPelanggaran.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataPelanggaran = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  reset_model() {
    this.id = null;
    this.nama = '';
    this.lokasi = '';
  }
  modal_edit = false;
  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }
  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilPelanggaran(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }
  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  tambahPelanggaran() {
    if (this.nama != '' && this.lokasi != '') {
      let data = {
        nama: this.nama,
        lokasi: this.lokasi,
      };
      this._apiService.tambah(data, 'tambahPelanggaran.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah pelanggaran');
          this.getPelanggaran();
          this.modal_tambah = true;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log(err);
          console.log('gagal tambah pelanggaran');
        },
      });
    } else {
      console.log('gagal tambah pelanggaran karena masih ada data yg kosong');
    }
  }

  ambilPelanggaran(id: any) {
    this._apiService.lihat(id, '/lihatPelanggaran.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let pelanggaran = hasil;
        this.id = pelanggaran.id;
        this.nama = pelanggaran.nama;
        this.lokasi = pelanggaran.lokasi;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editPelanggaran() {
    let data = {
      id: this.id,
      nama: this.nama,
      lokasi: this.lokasi,
    };
    this._apiService.edit(data, '/editPelanggaran.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getPelanggaran();
        console.log('berhasil edit Pelanggaran');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Pelanggaran');
      },
    });
  }

  hapusPelanggaran(id: any) {
    this._apiService.hapus(id, '/hapusPelanggaran.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getPelanggaran();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }
}
