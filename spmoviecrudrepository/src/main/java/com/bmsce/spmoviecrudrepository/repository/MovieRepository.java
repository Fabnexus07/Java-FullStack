package com.bmsce.spmoviecrudrepository.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bmsce.spmoviecrudrepository.entity.Movie;

public interface MovieRepository 
        extends JpaRepository<Movie,Integer> {
    
}
