import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  saldoAwal: number = 0;
  saldoAkhir: number = 0;
  history: any[] = [];
  constructor(
    private alertController: AlertController,
    private storage: StorageService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.storage
      .get('SaldoTabungan')
      ?.then((saldo) => {
        if (saldo !== null) {
          this.storage.set('Saldo' + this.router.url, saldo);
        }
      })
      .then(() => {
        this.storage.set('SaldoTabungan', null);
      });

    this.storage
      .get('CashflowTabungan')
      ?.then((saldo) => {
        if (saldo !== null) {
          this.storage.set('Cashflow' + this.router.url, saldo);
        }
      })
      .then(() => {
        this.storage.set('CashflowTabungan', null);
      });

    this.storage.get('Saldo' + this.router.url)?.then((res) => {
      if (res !== null) {
        this.saldoAwal = res.saldoAwal;
        this.saldoAkhir = res.saldoAkhir;
      } else {
        this.presentSaldo();
      }
    });
  }

  ionViewDidEnter() {
    this.storage.get('Cashflow' + this.router.url)?.then((res) => {
      if (res !== null) {
        this.history = res;
      }
    });
  }

  async presentInput(jenis: string) {
    const alert = await this.alertController.create({
      header: jenis,
      mode: 'ios',
      backdropDismiss: false,
      inputs: [
        {
          id: 'Nama',
          name: 'Nama',
          type: 'text',
          placeholder: 'Keterangan',
        },
        {
          id: 'Jumlah',
          name: 'Jumlah',
          type: 'number',
          placeholder: 'Nominal',
        },
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'OK',

          handler: (ev) => {
            let nominal = parseInt(ev.Jumlah);

            let cashflow = {
              jenis: jenis,
              tgl: new Date().toLocaleString('id-ID'),
              nama: ev.Nama,
              nominal: nominal,
            };

            this.storage.get('Saldo' + this.router.url)?.then((res) => {
              if (res !== null) {
                let saldo = parseInt(res.saldoAkhir);

                if (jenis === 'Pemasukan') {
                  this.saldoAkhir = saldo + nominal;
                  this.storage.set('Saldo' + this.router.url, {
                    saldoAwal: this.saldoAwal,
                    saldoAkhir: this.saldoAkhir,
                  });
                } else if (jenis === 'Pengeluaran') {
                  this.saldoAkhir = saldo - nominal;
                  this.storage.set('Saldo' + this.router.url, {
                    saldoAwal: this.saldoAwal,
                    saldoAkhir: this.saldoAkhir,
                  });
                }
              }
            });

            let orderTersimpan: any[] = [];
            this.storage.get('Cashflow' + this.router.url)!.then((res) => {
              if (res !== null) {
                orderTersimpan = res.concat(cashflow);
                this.storage.set('Cashflow' + this.router.url, orderTersimpan);
              } else {
                orderTersimpan.push(cashflow);
                this.storage.set('Cashflow' + this.router.url, orderTersimpan);
              }
              this.history = orderTersimpan;
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async presentSaldo() {
    const alert = await this.alertController.create({
      header: 'Masukkan Saldo Awal',
      mode: 'ios',
      backdropDismiss: false,
      inputs: [
        {
          id: 'Jumlah',
          name: 'Jumlah',
          type: 'number',
          placeholder: 'Jumlah',
        },
      ],
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'OK',

          handler: (ev) => {
            this.storage.set('Saldo' + this.router.url, {
              saldoAwal: ev.Jumlah,
              saldoAkhir: ev.Jumlah,
            });

            this.saldoAwal = ev.Jumlah;
            this.saldoAkhir = this.saldoAwal;
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Pilih Action!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Pindah Bulan',
          handler: () => {
            this.storage.get('Saldo' + this.router.url)?.then((res) => {
              if (res !== null) {
                this.storage.set('Saldo' + this.router.url, {
                  saldoAwal: res.saldoAkhir,
                  saldoAkhir: res.saldoAkhir,
                });

                this.storage.remove('Cashflow' + this.router.url);
                this.saldoAwal = res.saldoAkhir;
                this.saldoAkhir = res.saldoAkhir;
                this.history = [];
              }
            });
          },
        },
        {
          text: 'Reset Semua',
          handler: () => {
            this.storage.remove('Cashflow' + this.router.url);
            this.storage.remove('Saldo' + this.router.url);
            this.saldoAwal = 0;
            this.saldoAkhir = 0;

            this.history = [];

            this.presentSaldo();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertHapusTrx(Trx: any) {
    const alert = await this.alertController.create({
      message: 'Hapus Transaksi ' + Trx.nama + '?',
      buttons: [
        {
          text: 'G',
          role: 'cancel',
        },
        {
          text: 'Y',
          handler: () => {
            this.hapusTrx(Trx);
          },
        },
      ],
    });

    await alert.present();
  }
  hapusTrx(Trx: any) {
    if (Trx.jenis === 'Pemasukan') {
      this.saldoAkhir = this.saldoAkhir - Trx.nominal;
    } else {
      this.saldoAkhir = this.saldoAkhir + Trx.nominal;
    }

    this.storage
      .set('Saldo' + this.router.url, {
        saldoAwal: this.saldoAwal,
        saldoAkhir: this.saldoAkhir,
      })
      ?.then(() => {
        let index = this.history.findIndex((x) => x === Trx);
        this.storage.get('Cashflow' + this.router.url)!.then((res) => {
          res.splice(index, 1);
          this.storage.set('Cashflow' + this.router.url, res);
          this.history = res;
        });
      });
  }
}
