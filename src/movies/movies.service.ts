import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import MovieDTO from "./dtos/movie-dto";
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

        return this.movieRepository.save(newMovie);
    }

    /**
     * Retourne tous les films présents dans la base de donnée
     */
    getAllMovies(): Promise<Movie[]> {
        return this.movieRepository.find({ order: { date: "DESC" } });
    }

    /**
     * Met à jour un film selon un MovieDTO, ce MovieDTO peut ne contenir que les champs à modifier.
     */
    async updateMovie(id: number, movieDTO: MovieDTO): Promise<Movie> {
        try {
            const movieToUpdate = await this.movieRepository.findOneOrFail(id);
            movieToUpdate.author = movieDTO.author
                ? movieDTO.author
                : movieToUpdate.author;
            movieToUpdate.date = movieDTO.date
                ? new Date(movieDTO.date)
                : movieToUpdate.date;
            movieToUpdate.name = movieDTO.name
                ? movieDTO.name
                : movieToUpdate.name;
            return this.movieRepository.save(movieToUpdate);
        } catch (error) {
            console.log(error);
        }
    }

    async getOneMovie(id: number): Promise<Movie> {
        return this.movieRepository.findOneOrFail(id);
    }
}
