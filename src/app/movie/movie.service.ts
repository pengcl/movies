import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MovieService {

  constructor(@Inject('PREFIX_URL') private prefixUrl, private http: HttpClient) {
  }

  items(): Observable<any> {
    return this.http.get(this.prefixUrl + '/movies');
  }

  item(id): Observable<any> {
    return this.http.get(this.prefixUrl + '/movies/' + id);
  }

  find(body): Observable<any> {
    return this.http.get(this.prefixUrl + '/movies', {params: body});
  }

  count(body?): Observable<any> {
    return this.http.get(this.prefixUrl + '/movies/count', {params: body});
  }

  create(body): Observable<any> {
    return this.http.post(this.prefixUrl + '/movies', body);
  }

  update(id, body): Observable<any> {
    return this.http.put(this.prefixUrl + '/movies/' + id, body);
  }

  delete(id): Observable<any> {
    return this.http.delete(this.prefixUrl + '/movies/' + id);
  }

}
