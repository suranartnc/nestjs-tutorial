import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  constructor(private httpService: HttpService) {}
  
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll() {
    const url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-28-2020.csv'
    return this.httpService.get(url).pipe(map(response => response.data))
    
  }
}