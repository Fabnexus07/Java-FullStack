import { Component } from '@angular/core';
import { MovieModel } from '../../movie';
import { MovieService } from '../../services/movieservice';

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

    this.selectedMovie =
      this.movieService.getMovieById(Number(this.movieId));

    if (this.selectedMovie) {

      this.message = '';

    } else {

      this.message = 'Movie Not Found';

    }
  }
}