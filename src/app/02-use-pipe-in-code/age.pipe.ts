import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any): any {
    if (typeof value === 'number') {
      return `${value} years old`;
    } else {
      return value;
    }
  }

}
