import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../services/movieservice-new';
import { MovieModel } from '../../movie';


@Component({
  selector: 'app-movie-update',
  standalone: false,
  templateUrl: './movie-update.html',
  styleUrls: ['./movie-update.css']
})

export class MovieUpdate implements OnInit {
  movieId!: number;
  movieForm!: FormGroup;
  movieNotFound = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService

  ) { }


  ngOnInit(): void {
    this.movieForm = this.fb.group({
      movieId: [{ value: null, disabled: true }],
      movieName: ['', [Validators.required, Validators.minLength(2)]],
      director: ['', Validators.required],
      genre: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      releaseYear: [null, [Validators.required, Validators.min(1888), Validators.max(2100)]]
    });
    this.movieId = Number(this.route.snapshot.paramMap.get('movieId'));
    this.loadMovie();

  }


  loadMovie(): void {
    this.movieService.getMovieById(this.movieId).subscribe({
      next: (movie) => {
        this.movieForm.patchValue({
          movieId: movie.movieId,
          movieName: movie.movieName,
          director: movie.director,
          genre: movie.genre,
          rating: movie.rating,
          releaseYear: movie.releaseYear
        });
      },
      error: (error) => {
        console.error(error);
        this.movieNotFound = true;
      }

    });
  }

  updateMovie(): void {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    const updatedMovie: MovieModel = {
      movieId: this.movieId,
      ...this.movieForm.getRawValue()
    };


    this.movieService.updateMovie(this.movieId, updatedMovie).subscribe({
      next: (response) => {
        alert('Movie updated successfully');
        console.log(response);
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        console.error(error);
        alert('Unable to update movie');
      }
    });
  }


  cancel(): void {
    this.router.navigate(['/movies']);
  }

}