import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Movie from "./movies.entity";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    ) {}

    /**
     * Créer un film (l'enregistre dans la base de donnée)
     */
    createMovie(
        movieName: string,
        movieDate: Date,
        movieAuthor: string,
    ): Promise<Movie> {
        const newMovie = this.movieRepository.create({
            name: movieName,
            date: movieDate,
            author: movieAuthor,
        });

        console.log(newMovie);

        return this.movieRepository.save(newMovie);
    }

    /**
     * Retourne tous les films présents dans la base de donnée
     */
    getAllMovies(): Promise<Movie[]> {
        return this.movieRepository.find({ order: { date: "DESC" } });
    }
}
