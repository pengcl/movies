import {Inject, Injectable} from '@angular/core';
import {getIndex} from '../home/entryComponents/city/city.component';
import {HttpClient} from '@angular/common/http';
import {cinemas} from './cinemas';
import {movies} from './movies';

import { Observable } from 'rxjs';


const prefix = 'https://oms.ai-datas.com';

// const prefix = 'https://test.ai-datas.com';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public cinemas: any[] = cinemas;
  public movies: any[] = movies;

  constructor(@Inject('PREFIX_URL') private prefixUrl, private http: HttpClient) {
  }

  plans(): Observable<any> {
    const data = {
      chanelCode: 'net',
      publicKey: 'net888'
    };
    return this.http.post(prefix + '/oms-api/movie/netMovieQuery', {data});
  }

  moviePlans(data): Observable<any> {
    data.dataType = 1;
    data.needActPrice = '1';
    return this.http.post(prefix + '/oms-api/movie/netPlansQuery', {data});
  }

  test(data): Observable<any> {
    return this.http.post('https://www.bihetech.com/plans/planShowService-api/planShow/showList', {data});
  }

  code(data): Observable<any> {
    return this.http.post(prefix + '/oms-api/wechatMiniApps/getNetMovieSaleCode', {data});
  }

  getProvinces(): any[] {
    const provinces = [];
    this.cinemas.forEach(cinema => {
      const provinceIndex = getIndex(provinces, 'name', cinema.province);
      if (provinceIndex === -1) {
        provinces.push({
          name: cinema.province, cities: [{
            name: cinema.city, cinemas: [{
              name: cinema.name,
              province: cinema.province,
              city: cinema.city,
              code: cinema.code
            }]
          }]
        });
      } else {
        const cityIndex = getIndex(provinces[provinceIndex].cities, 'name', cinema.city);
        if (cityIndex === -1) {
          provinces[provinceIndex].cities.push({
            name: cinema.city, cinemas: [{
              name: cinema.name,
              province: cinema.province,
              city: cinema.city,
              code: cinema.code
            }]
          });
        } else {
          provinces[provinceIndex].cities[cityIndex].cinemas.push({
            name: cinema.name,
            province: cinema.province,
            city: cinema.city,
            code: cinema.code
          });
        }
      }
    });
    return provinces;
  }

  public getMovies(): any[] {
    return this.movies;
  }

  public getMovieById(id: number): any {
    return this.movies[id];
  }

  public getCinemas(): any[] {
    return this.cinemas;
  }

  public getCinemaByCode(code: string): any[] {
    return this.cinemas[code];
  }
}
