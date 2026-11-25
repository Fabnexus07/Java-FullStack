package com.bmsce.spmoviecrudrepository.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bmsce.spmoviecrudrepository.entity.Movie;
import com.bmsce.spmoviecrudrepository.repository.MovieRepository;
import com.bmsce.spmoviecrudrepository.exception.MovieNotFoundException;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    // Constructor Injection
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    // 1. ADD MOVIE
    public Movie addMovie(Movie movie) {

        return movieRepository.save(movie);
    }

    // 2. GET MOVIE BY ID
    public Movie getMovieById(Integer movieId) throws MovieNotFoundException {

        return movieRepository.findById(movieId)
                .orElseThrow(() ->
                    new MovieNotFoundException(
                        "Movie not found with ID: " + movieId
                    )
                );
    }

    // 3. GET ALL MOVIES
    public List<Movie> getAllMovies() {

        return movieRepository.findAll();
    }

    // 4. UPDATE MOVIE
    public Movie updateMovie(Integer movieId, Movie updatedMovie) throws MovieNotFoundException {

        // Check whether movie exists
        Movie existingMovie = movieRepository.findById(movieId)
                .orElseThrow(() ->
                    new MovieNotFoundException(
                        "Movie not found with ID: " + movieId
                    )
                );

        // Update existing movie details
        existingMovie.setMovieName(updatedMovie.getMovieName());
        existingMovie.setDirector(updatedMovie.getDirector());
        existingMovie.setGenre(updatedMovie.getGenre());
        existingMovie.setRating(updatedMovie.getRating());
        existingMovie.setReleaseYear(updatedMovie.getReleaseYear());

        // Save updated movie
        return movieRepository.save(existingMovie);
    }

    // 5. DELETE MOVIE
    public void deleteMovie(Integer movieId) throws MovieNotFoundException {

        // Check whether movie exists
        if (!movieRepository.existsById(movieId)) {

            throw new MovieNotFoundException(
                "Movie not found with ID: " + movieId
            );
        }

        movieRepository.deleteById(movieId);
    }
}