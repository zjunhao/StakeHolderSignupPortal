import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeFormattingService {

  constructor() { }

  // dateTimeString: yyyy-MM-ddTHH:mm in local time zone
  // return value: number of seconds passed since 1970–01–01 00:00:00 GMT
  toUNIXTimestamp(dateTimeString: string): number {
    return Date.parse(dateTimeString);
  }

  // timestamp: number of seconds passed since 1970–01–01 00:00:00 GMT
  // returnvalue: yyyy-MM-ddTHH:mm in local time zone
  toLocalDateTimeString(timestamp: number): string {
    const date = new Date(timestamp);
    return this.getLocaleISOString(date);
  }

  private getLocaleISOString(date: Date): string {
    return `${date.getFullYear()}-${this.addPrefixZeroIfNeeded(date.getMonth()+1)}-${this.addPrefixZeroIfNeeded(date.getDate())}T`
            +`${this.addPrefixZeroIfNeeded(date.getHours())}:${this.addPrefixZeroIfNeeded(date.getMinutes())}`;
  }

  private addPrefixZeroIfNeeded(val: number): string {
    if (val >= 10) {
      return val.toString();
    } else {
      return '0' + val.toString();
    }
  }

}
