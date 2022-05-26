import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { IonicModule } from '@ionic/angular';
import { CinemaListPage } from './list.page';
import { CinemaListRoutingModule } from './list-routing.module';
import { HomePageModule } from '../../home/home.module';

@NgModule({
  imports: [CommonModule, FormsModule, ThemeModule, IonicModule, CinemaListRoutingModule, HomePageModule],
  declarations: [CinemaListPage],
  exports: [CinemaListPage]
})
export class CinemaListPageModule {
}
