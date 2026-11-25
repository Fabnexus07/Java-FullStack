
package com.bmsce.spmoviecrudvalidation.service;

import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.bmsce.spmoviecrudvalidation.entity.Movie;
import com.bmsce.spmoviecrudvalidation.exception.MovieNotFoundException;
import com.bmsce.spmoviecrudvalidation.exception.DuplicateMovieException;
import com.bmsce.spmoviecrudvalidation.exception.InvalidMovieException;

@Service
public class MovieService {

    private Set<Movie> movieSet = new HashSet<>();

    // VALIDATE MOVIE
    private void validateMovie(Movie movie) throws InvalidMovieException {

        if (movie == null) {
            throw new InvalidMovieException("Movie details cannot be null");
        }

        if (movie.getMovieId() <= 0) {
            throw new InvalidMovieException("Movie ID must be positive");
        }

        if (movie.getRating() < 0 || movie.getRating() > 10) {
            throw new InvalidMovieException(
                    "Movie rating must be between 0 and 10");
        }

        if (movie.getReleaseYear() < 1888) {
            throw new InvalidMovieException(
                    "Release year must be 1888 or later");
        }
    }

    // 1. CREATE
    public boolean addMovie(Movie movie)
            throws DuplicateMovieException, InvalidMovieException {

        validateMovie(movie);

        for (Movie m : movieSet) {
            if (Objects.equals(m.getMovieId(), movie.getMovieId())) {
                throw new DuplicateMovieException(
                        "Movie already exists with ID: " + movie.getMovieId());
            }
        }

        movieSet.add(movie);

        return true;
    }

    // 2. GET BY ID
    public Movie getMovieById(Integer movieId)
            throws MovieNotFoundException {

        for (Movie movie : movieSet) {
            if (Objects.equals(movie.getMovieId(), movieId)) {
                return movie;
            }
        }

        throw new MovieNotFoundException(
                "Movie not found with ID: " + movieId);
    }

    // 3. GET ALL
    public Set<Movie> getAllMovies() {

        return new HashSet<>(movieSet);
    }

    // 4. UPDATE
    public boolean updateMovie(Integer movieId, Movie updatedMovie)
            throws InvalidMovieException, MovieNotFoundException {

        validateMovie(updatedMovie);

        if (!Objects.equals(movieId, updatedMovie.getMovieId())) {
            throw new InvalidMovieException(
                    "URL Movie ID and JSON Movie ID must be the same");
        }

        Movie existingMovie = getMovieById(movieId);

        existingMovie.setMovieName(updatedMovie.getMovieName());
        existingMovie.setDirector(updatedMovie.getDirector());
        existingMovie.setGenre(updatedMovie.getGenre());
        existingMovie.setRating(updatedMovie.getRating());
        existingMovie.setReleaseYear(updatedMovie.getReleaseYear());

        return true;
    }

    // 5. DELETE
    public boolean deleteMovie(Integer movieId)
            throws MovieNotFoundException {

        Movie existingMovie = getMovieById(movieId);

        movieSet.remove(existingMovie);

        return true;
    }
}
