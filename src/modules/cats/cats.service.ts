import { Injectable, HttpService } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

const parse = require('csv-parse/lib/sync');

@Injectable()
export class CatsService {
  constructor(private httpService: HttpService) {}

  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  async findAll() {
    const url =
      'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-28-2020.csv';

    const response = await this.httpService.get(url).toPromise();
    const json = parse(response.data, {
      columns: true,
      skip_empty_lines: true,
    });

    return json;
  }
}
