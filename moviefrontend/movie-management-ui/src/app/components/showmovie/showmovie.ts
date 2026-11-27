import { Component } from '@angular/core';
import { MovieModel } from '../../movie';
import { MovieService } from '../../services/movieservice-new';

@Component({
  selector: 'app-showmovie',
  standalone: false,
  templateUrl: './showmovie.html',
  styleUrl: './showmovie.css',
})
export class Showmovie {

  movieId: number = 0;

  selectedMovie: MovieModel | undefined;

  message: string = '';

  constructor(private movieService: MovieService) {}

  getMovieById(): void {
    this.movieService.getMovieById(Number(this.movieId)).subscribe({
      next: (movie) => {
        this.selectedMovie = movie;
        this.message = movie ? '' : 'Movie Not Found';
      },
      error: () => {
        this.selectedMovie = undefined;
        this.message = 'Movie Not Found';
      },
    });
  }
}