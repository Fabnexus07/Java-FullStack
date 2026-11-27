import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieModel } from '../movie';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = environment.apiURL;
  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<MovieModel[]> {
    return this.http.get<MovieModel[]>(this.apiUrl);
  }

  getMovieById(movieId: number): Observable<MovieModel> {
    return this.http.get<MovieModel>(`${this.apiUrl}/${movieId}`);
  }

  addMovie(movie: MovieModel): Observable<MovieModel> {
    return this.http.post<MovieModel>(this.apiUrl, movie);
  }

  updateMovie(movieId: number, movie: MovieModel): Observable<MovieModel> {
    return this.http.put<MovieModel>(`${this.apiUrl}/${movieId}`, movie);
  }

  deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${movieId}`);
  }
}
