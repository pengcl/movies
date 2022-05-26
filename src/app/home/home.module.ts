import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../@theme/theme.module';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {HomePage} from './home.page';
import {HomePageRoutingModule} from './home-routing.module';
import {CityComponent} from './entryComponents/city/city.component';
import {CodeComponent} from './entryComponents/code/code';
import {RmbPipe} from '../pipes.pipe';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, CityComponent, CodeComponent, RmbPipe],
  entryComponents: [CityComponent, CodeComponent],
  exports: [
    RmbPipe
  ],
  providers: [RmbPipe]
})
export class HomePageModule {
}
