import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';
import {COMPONENTS, ENTRY_COMPONENTS, PIPES, DIRECTIVES} from './index';
import {ToastModule} from './modules/toast';
import {MaskModule} from './modules/mask';
import {DialogModule} from './modules/dialog';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    ToastModule,
    MaskModule,
    DialogModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule,
    MaskModule,
    DialogModule,
    ...COMPONENTS,
    ...ENTRY_COMPONENTS,
    ...PIPES,
  ],
  declarations: [...COMPONENTS, ...ENTRY_COMPONENTS, ...PIPES, ...DIRECTIVES],
  entryComponents: [ENTRY_COMPONENTS],
  providers: []
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [...PIPES]
    } as ModuleWithProviders<ThemeModule>;
  }
}
