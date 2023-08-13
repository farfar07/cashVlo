import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

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
    private storage: StorageService
  ) {}

  ionViewWillEnter() {
    this.storage.get('SaldoTabungan')?.then((res) => {
      if (res !== null) {
        this.saldoAwal = res.saldoAwal;
        this.saldoAkhir = res.saldoAkhir;
      } else {
        this.presentSaldo();
      }
    });
  }

  ionViewDidEnter() {
    this.storage.get('CashflowTabungan')?.then((res) => {
      if (res !== null) {
        this.history = res;
        console.log(this.history);
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

            this.storage.get('SaldoTabungan')?.then((res) => {
              if (res !== null) {
                let saldo = parseInt(res.saldoAkhir);

                if (jenis === 'Pemasukan') {
                  this.saldoAkhir = saldo + nominal;
                  this.storage.set('SaldoTabungan', {
                    saldoAwal: this.saldoAwal,
                    saldoAkhir: this.saldoAkhir,
                  });
                } else if (jenis === 'Pengeluaran') {
                  this.saldoAkhir = saldo - nominal;
                  this.storage.set('SaldoTabungan', {
                    saldoAwal: this.saldoAwal,
                    saldoAkhir: this.saldoAkhir,
                  });
                }
              }
            });

            let orderTersimpan: any[] = [];
            this.storage.get('CashflowTabungan')!.then((res) => {
              if (res !== null) {
                orderTersimpan = res.concat(cashflow);
                this.storage.set('CashflowTabungan', orderTersimpan);
              } else {
                orderTersimpan.push(cashflow);
                this.storage.set('CashflowTabungan', orderTersimpan);
              }
              this.history = orderTersimpan;
            });
          },
        },
      ],
    });

    await alert.present().then(() => {
      document.getElementById('Nama')!.setAttribute('maxlength', '15');
    });
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
            this.storage.set('SaldoTabungan', {
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
            this.storage.get('SaldoTabungan')?.then((res) => {
              if (res !== null) {
                this.storage.set('SaldoTabungan', {
                  saldoAwal: res.saldoAkhir,
                  saldoAkhir: res.saldoAkhir,
                });

                this.storage.remove('CashflowTabungan');
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
            this.storage.remove('CashflowTabungan');
            this.storage.remove('SaldoTabungan');
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
}
