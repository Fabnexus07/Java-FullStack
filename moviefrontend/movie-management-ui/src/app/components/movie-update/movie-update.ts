import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieService } from '../../services/movieservice';
import { MovieModel } from '../../movie';


@Component({
  selector: 'app-movie-update',
  standalone: false,
  templateUrl: './movie-update.html',
  styleUrl: './movie-update.css',
})
export class MovieUpdate implements OnInit{

  movieForm: FormGroup;

  movieId: number = 101;

  movies$: Observable<MovieModel[]>;

  hasMovieId: boolean = false;

  movieNotFound: boolean = false;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {
    this.movies$ = this.movieService.getAllMovies();

    this.movieForm = this.fb.group({

      movieName: [
        '',
        [Validators.required, Validators.minLength(2)]
      ],

      director: [
        '',
        Validators.required
      ],

      genre: [
        '',
        Validators.required
      ],

      rating: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(10)
        ]
      ],

      releaseYear: [
        '',
        [
          Validators.required,
          Validators.min(1888),
          Validators.max(2100)
        ]
      ]

    });

  }


  ngOnInit(): void {

    // Read movieId from URL

    const movieIdParam = this.route.snapshot.paramMap.get('movieId');

    this.hasMovieId = movieIdParam !== null;

    if (!this.hasMovieId) {
      return;
    }

    this.movieId = Number(movieIdParam);

    // Get existing movie from service

    const movie: MovieModel | undefined =
      Number.isInteger(this.movieId)
        ? this.movieService.getMovieById(this.movieId)
        : undefined;


    if (!movie) {

      this.movieNotFound = true;

      return;

    }


    // Populate form with existing movie details

    this.movieForm.patchValue({

      movieName: movie.movieName,

      director: movie.director,

      genre: movie.genre,

      rating: movie.rating,

      releaseYear: movie.releaseYear

    });

  }


  updateMovie(): void {

    if (this.movieForm.invalid) {

      this.movieForm.markAllAsTouched();

      return;

    }


    const updatedDetails = this.movieForm.value;


    const status = this.movieService.updateMovie(

      this.movieId,

      {

        movieName: updatedDetails.movieName,

        director: updatedDetails.director,

        genre: updatedDetails.genre,

        rating: Number(updatedDetails.rating),

        releaseYear: Number(updatedDetails.releaseYear)

      }

    );


    if (status) {

      this.router.navigate(['/movies']);

    } else {

      this.movieNotFound = true;

    }

  }


  cancel(): void {

    this.router.navigate(['/movies']);

  }

}