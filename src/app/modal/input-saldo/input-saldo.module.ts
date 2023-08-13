import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { InputSaldoComponent } from './input-saldo.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [InputSaldoComponent],
  exports: [InputSaldoComponent],
})
export class InputSaldoComponentModule {}
