import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormatter'
})
export class DateTimeFormatterPipe implements PipeTransform {

  // 2020-08-12T16:23 (string) -> 08/12/2020 16:23 (string)
  transform(dateTimeStr: string): string {
    var regexParser = /(\d+)-(\d\d)-(\d\d)T(\d\d):(\d\d)/g
    var match = regexParser.exec(dateTimeStr);

    if (match) {
      const year = match[1];
      const month = match[2];
      const day = match[3];
      const hour = match[4];
      const minute = match[5];
  
      const formattedStr = `${month}/${day}/${year} ${hour}:${minute}`;
  
      return formattedStr;
    } else {
      return dateTimeStr;
    }
  }

}
