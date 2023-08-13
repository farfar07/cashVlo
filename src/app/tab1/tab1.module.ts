import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { AddTransaksiComponentModule } from '../modal/add-transaksi/add-transaksi.module';
import { InputSaldoComponentModule } from '../modal/input-saldo/input-saldo.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    AddTransaksiComponentModule,
    InputSaldoComponentModule,
  ],
  declarations: [Tab1Page],
})
export class Tab1PageModule {}
