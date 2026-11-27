import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MovieService } from '../../services/movieservice-new';
import { MovieModel } from '../../movie';

@Component({
  selector: 'app-movie-create',
  standalone: false,
  templateUrl: './moviecreate.html',
  styleUrl: './moviecreate.css',
})
export class MovieCreate {
  movieForm: FormGroup;

  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      movieName: ['', [Validators.required, Validators.minLength(2)]],

      director: ['', Validators.required],

      genre: ['', Validators.required],

      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],

      releaseYear: ['', [Validators.required, Validators.min(1888), Validators.max(2100)]],
    });
  }

  addMovie(): void {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    const movie: MovieModel = this.movieForm.value;
    this.movieService.addMovie(movie).subscribe({
      next: (response) => {
        alert('Movie Created Successfully');
        console.log(response);
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        console.log(error);
        alert('Unable to create movie. Check the Movie ID or other details.');
      }
    });
  }
}
