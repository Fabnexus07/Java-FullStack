import { TestBed } from '@angular/core/testing';
import { MovieService } from './movieservice';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updates a movie and notifies subscribers', () => {
    let updatedMovies: ReturnType<typeof service.getMovieById>[] = [];
    service.getAllMovies().subscribe(movies => {
      updatedMovies = movies;
    });

    const updatedDetails = {
      movieName: 'Updated Interstellar',
      director: 'Christopher Nolan',
      genre: 'Science Fiction',
      rating: 9,
      releaseYear: 2014
    };

    expect(service.updateMovie(101, updatedDetails)).toBe(true);
    expect(service.getMovieById(101)).toEqual({
      movieId: 101,
      ...updatedDetails
    });
    expect(updatedMovies[0]).toEqual({
      movieId: 101,
      ...updatedDetails
    });
  });

  it('returns false when the movie to update does not exist', () => {
    expect(service.updateMovie(999, {
      movieName: 'Missing Movie',
      director: 'Unknown',
      genre: 'Unknown',
      rating: 0,
      releaseYear: 2000
    })).toBe(false);
  });
});
