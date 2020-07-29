import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'BRL', minDigits: number = 2): string {
    if(!value) {
      return null;
    }

    //let currencyPipe: CurrencyPipe = new CurrencyPipe('pt-br');
    //let newValue: string = currencyPipe.transform(value, currencyCode, symbolDisplay, digits);

    //return newValue;

    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currencyCode, minimumFractionDigits: minDigits }).format(value);
  }

}
