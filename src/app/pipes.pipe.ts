import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'rmb',
  pure: false
})

@Injectable()
export class RmbPipe implements PipeTransform {
  constructor(private currency: CurrencyPipe) {
  }

  transform(value): any {
    return this.currency.transform(value, 'CNY', 'symbol-narrow');
  }
}
