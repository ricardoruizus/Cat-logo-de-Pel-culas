import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getPopularMovies(page = 1): Observable<MovieResponse> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<MovieResponse>(`${this.apiUrl}/popular`, { params });
  }

  searchMovies(query: string, page = 1): Observable<MovieResponse> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString());
    return this.http.get<MovieResponse>(`${this.apiUrl}/search`, { params });
  }
}
