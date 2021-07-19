import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'uppercaseWords'})
export class UppercaseWords implements PipeTransform {
  transform(value: string): string {
    const words = value.split(/(?=[A-Z])/);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ');
  }
}
