import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  saldoAwal: number = 0;
  saldoAkhir: number = 0;
  history: any[] = [];
  constructor(
    private alertController: AlertController,
    private storage: StorageService
  ) {}

  ionViewWillEnter() {
    this.storage.get('SaldoPuxiboo')?.then((res) => {
      if (res !== null) {
        this.saldoAwal = res.saldoAwal;
        this.saldoAkhir = res.saldoAkhir;
      } else {
        this.presentSaldo();
      }
    });
  }

  ionViewDidEnter() {
    this.storage.get('CashflowPuxiboo')?.then((res) => {
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

            this.storage.get('SaldoPuxiboo')?.then((res) => {
              if (res !== null) {
                let saldo = parseInt(res.saldoAkhir);

                if (jenis === 'Pemasukan') {
                  this.saldoAkhir = saldo + nominal;
                  this.storage.set('SaldoPuxiboo', {
                    saldoAwal: this.saldoAwal,
                    saldoAkhir: this.saldoAkhir,
                  });
                } else if (jenis === 'Pengeluaran') {
                  this.saldoAkhir = saldo - nominal;
                  this.storage.set('SaldoPuxiboo', {
                    saldoAwal: this.saldoAwal,
                    saldoAkhir: this.saldoAkhir,
                  });
                }
              }
            });

            let orderTersimpan: any[] = [];
            this.storage.get('CashflowPuxiboo')!.then((res) => {
              if (res !== null) {
                orderTersimpan = res.concat(cashflow);
                this.storage.set('CashflowPuxiboo', orderTersimpan);
              } else {
                orderTersimpan.push(cashflow);
                this.storage.set('CashflowPuxiboo', orderTersimpan);
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
            this.storage.set('SaldoPuxiboo', {
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
            this.storage.get('SaldoPuxiboo')?.then((res) => {
              if (res !== null) {
                this.storage.set('SaldoPuxiboo', {
                  saldoAwal: res.saldoAkhir,
                  saldoAkhir: res.saldoAkhir,
                });

                this.storage.remove('CashflowPuxiboo');
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
            this.storage.remove('CashflowPuxiboo');
            this.storage.remove('SaldoPuxiboo');
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
