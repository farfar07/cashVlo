import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  saldoDapur: number = 0;
  saldoTabungan: number = 0;
  saldoPuxiboo: number = 0;

  BCA: number = 0;
  BNI: number = 0;
  DanaMomi: number = 0;
  DanaAppa: number = 0;
  SpayMomi: number = 0;

  SpayAppa: number = 0;
  Seabank: number = 0;
  CashMomi: number = 0;
  CashAppa: number = 0;
  Coin: number = 0;

  Selisih: number = 0;

  BCADisplay: string = '';
  BNIDisplay: string = '';
  DanaMomiDisplay: string = '';
  DanaAppaDisplay: string = '';
  SpayMomiDisplay: string = '';

  SpayAppaDisplay: string = '';
  SeabankDisplay: string = '';
  CashMomiDisplay: string = '';
  CashAppaDisplay: string = '';
  CoinDisplay: string = '';

  SelisihDisplay: string = '';
  constructor(private storage: StorageService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.storage.get('Saldo/tabs/tab1')?.then((res) => {
      if (res !== null) {
        this.saldoDapur = parseInt(res.saldoAkhir);
      }
    });

    this.storage.get('Saldo/tabs/tab2')?.then((res) => {
      if (res !== null) {
        this.saldoTabungan = parseInt(res.saldoAkhir);
      }
    });

    this.storage.get('Saldo/tabs/tab3')?.then((res) => {
      if (res !== null) {
        this.saldoPuxiboo = parseInt(res.saldoAkhir);
      }
    });
  }

  inputValidator(evt: any, jenis: string) {
    setTimeout(() => {
      switch (jenis) {
        case 'BCA':
          if (evt.value.toString() !== '' && evt.value.toString() !== 'Rp ') {
            let rate = parseInt(evt.value.toString().replace(/[^0-9]/g, ''));
            this.BCA = Math.round(rate);
            this.BCADisplay = Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(rate);
          } else {
            this.BCA = 0;
            this.BCADisplay = '';
          }
          break;

        case 'BNI':
          if (evt.value.toString() !== '' && evt.value.toString() !== 'Rp ') {
            let rate = parseInt(evt.value.toString().replace(/[^0-9]/g, ''));
            this.BNI = Math.round(rate);
            this.BNIDisplay = Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(rate);
          } else {
            this.BNI = 0;
            this.BNIDisplay = '';
          }
          break;
        case 'DanaMomi':
          if (evt.value.toString() !== '' && evt.value.toString() !== 'Rp ') {
            let rate = parseInt(evt.value.toString().replace(/[^0-9]/g, ''));
            this.DanaMomi = Math.round(rate);
            this.DanaMomiDisplay = Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(rate);
          } else {
            this.DanaMomi = 0;
            this.DanaMomiDisplay = '';
          }
          break;
        case 'DanaAppa':
          if (evt.value.toString() !== '' && evt.value.toString() !== 'Rp ') {
            let rate = parseInt(evt.value.toString().replace(/[^0-9]/g, ''));
            this.DanaAppa = Math.round(rate);
            this.DanaAppaDisplay = Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(rate);
          } else {
            this.DanaAppa = 0;
            this.DanaAppaDisplay = '';
          }
          break;
        case 'SpayMomi':
          if (evt.value.toString() !== '' && evt.value.toString() !== 'Rp ') {
            let rate = parseInt(evt.value.toString().replace(/[^0-9]/g, ''));
            this.SpayMomi = Math.round(rate);
            this.SpayMomiDisplay = Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(rate);
          } else {
            this.SpayMomi = 0;
            this.SpayMomiDisplay = '';
          }
          break;
        case 'SpayAppa':
          if (evt.value.toString() !== '' && evt.value.toString() !== 'Rp ') {
            let rate = parseInt(evt.value.toString().replace(/[^0-9]/g, ''));
            this.SpayAppa = Math.round(rate);
            this.SpayAppaDisplay = Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(rate);
          } else {
            this.SpayAppa = 0;
            this.SpayAppaDisplay = '';
          }
          break;
        case 'Seabank':
          if (evt.value.toString() !== '' && evt.value.toString() !== 'Rp ') {
            let rate = parseInt(evt.value.toString().replace(/[^0-9]/g, ''));
            this.Seabank = Math.round(rate);
            this.SeabankDisplay = Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(rate);
          } else {
            this.Seabank = 0;
            this.SeabankDisplay = '';
          }
          break;
        case 'CashMomi':
          if (evt.value.toString() !== '' && evt.value.toString() !== 'Rp ') {
            let rate = parseInt(evt.value.toString().replace(/[^0-9]/g, ''));
            this.CashMomi = Math.round(rate);
            this.CashMomiDisplay = Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(rate);
          } else {
            this.CashMomi = 0;
            this.CashMomiDisplay = '';
          }
          break;
        case 'CashAppa':
          if (evt.value.toString() !== '' && evt.value.toString() !== 'Rp ') {
            let rate = parseInt(evt.value.toString().replace(/[^0-9]/g, ''));
            this.CashAppa = Math.round(rate);
            this.CashAppaDisplay = Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(rate);
          } else {
            this.CashAppa = 0;
            this.CashAppaDisplay = '';
          }
          break;
        case 'Coin':
          if (evt.value.toString() !== '' && evt.value.toString() !== 'Rp ') {
            let rate = parseInt(evt.value.toString().replace(/[^0-9]/g, ''));
            this.Coin = Math.round(rate);
            this.CoinDisplay = Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(rate);
          } else {
            this.Coin = 0;
            this.CoinDisplay = '';
          }
          break;
        default:
          break;
      }
    }, 50);
  }

  async copy() {
    let saldo = '';
    if (this.saldoDapur > 0) {
      saldo +=
        'Saldo Dapur: Rp ' +
        this.saldoDapur.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }
    if (this.saldoTabungan > 0) {
      saldo +=
        'Saldo Tabungan: Rp ' +
        this.saldoTabungan.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }
    if (this.saldoPuxiboo > 0) {
      saldo +=
        'Saldo Puxiboo: Rp ' +
        this.saldoPuxiboo.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '';
    }
    saldo +=
      '\n\nTotal: Rp ' +
      (this.saldoDapur + this.saldoTabungan + this.saldoPuxiboo).toLocaleString(
        'id',
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }
      ) +
      '\n\n';

    if (this.BCA > 0) {
      saldo +=
        'BCA: Rp ' +
        this.BCA.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }
    if (this.BNI > 0) {
      saldo +=
        'BNI: Rp ' +
        this.BNI.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }
    if (this.DanaMomi > 0) {
      saldo +=
        'DanaMomi: Rp ' +
        this.DanaMomi.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }
    if (this.DanaAppa > 0) {
      saldo +=
        'DanaAppa: Rp ' +
        this.DanaAppa.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }
    if (this.SpayMomi > 0) {
      saldo +=
        'SpayMomi: Rp ' +
        this.SpayMomi.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }

    if (this.SpayAppa > 0) {
      saldo +=
        'SpayAppa: Rp ' +
        this.SpayAppa.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }
    if (this.Seabank > 0) {
      saldo +=
        'Seabank: Rp ' +
        this.Seabank.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }
    if (this.CashMomi > 0) {
      saldo +=
        'CashMomi: Rp ' +
        this.CashMomi.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }
    if (this.CashAppa > 0) {
      saldo +=
        'CashAppa: Rp ' +
        this.CashAppa.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }
    if (this.Coin > 0) {
      saldo +=
        'Coin: Rp ' +
        this.Coin.toLocaleString('id', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }) +
        '\n';
    }

    saldo +=
      '\n\nTotal Uang Real: Rp ' +
      (
        this.BCA +
        this.BNI +
        this.DanaMomi +
        this.DanaAppa +
        this.SpayMomi +
        this.SpayAppa +
        this.Seabank +
        this.CashMomi +
        this.CashAppa +
        this.Coin
      ).toLocaleString('id', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) +
      '\n\n';

    saldo +=
      'Selisih: Rp ' +
      (
        this.BCA +
        this.BNI +
        this.DanaMomi +
        this.DanaAppa +
        this.SpayMomi +
        this.SpayAppa +
        this.Seabank +
        this.CashMomi +
        this.CashAppa +
        this.Coin -
        (this.saldoDapur + this.saldoTabungan + this.saldoPuxiboo)
      ).toLocaleString('id', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }) +
      '\n\n';
    await Clipboard.write({
      string: saldo,
    });
  }
}
