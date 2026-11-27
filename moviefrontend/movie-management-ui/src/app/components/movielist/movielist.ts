import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from '../../movie';
import { MovieService } from '../../services/movieservice-new';

@Component({
  selector: 'app-movielist',
  standalone: false,
  templateUrl: './movielist.html',
  styleUrl: './movielist.css',
})
export class Movielist {

  movies$: Observable<MovieModel[]>;

  constructor(private movieService: MovieService) {

    this.movies$ = this.movieService.getAllMovies();

  }

  deleteMovie(movieId: number): void {
  this.movieService.deleteMovie(movieId).subscribe({
    next: () => {
      this.movies$ = this.movieService.getAllMovies();
    },
    error: (error) => {
      console.error('Failed to delete movie:', error);
      alert('Unable to delete movie. Check the backend and try again.');
    },
  });
  }
}