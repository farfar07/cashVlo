import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AddTransaksiComponent } from './add-transaksi.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [AddTransaksiComponent],
  exports: [AddTransaksiComponent],
})
export class AddTransaksiComponentModule {}
