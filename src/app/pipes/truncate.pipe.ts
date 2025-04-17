import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, length = 20): string {
    return value.length > length ? value.slice(0, length) + '...' : value;
  }
}
