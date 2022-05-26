import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {IonicModule} from '@ionic/angular';
import {CinemaItemPage} from './item.page';
import {CinemaItemRoutingModule} from './item-routing.module';
import { HomePageModule } from '../../home/home.module';

@NgModule({
  imports: [CommonModule, ThemeModule, FormsModule, IonicModule, CinemaItemRoutingModule, HomePageModule],
  declarations: [CinemaItemPage],
  exports: [CinemaItemPage]
})
export class CinemaItemPageModule {
}
