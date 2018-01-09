import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroPage } from './cadastro';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CadastroPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(CadastroPage),
  ],
})
export class CadastroPageModule {}
