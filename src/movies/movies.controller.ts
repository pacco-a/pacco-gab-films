import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Redirect,
    Render,
} from "@nestjs/common";
import { UpdateDateColumn } from "typeorm";
import MovieDTO from "./dtos/movie-dto";
import Movie from "./movies.entity";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
    constructor(private moviesService: MoviesService) {}
    @Post()
    @Redirect("/movies/home")
    public async create(@Body() movieDTO: MovieDTO): Promise<Movie> {
        return this.moviesService.createMovie(
            movieDTO.name,
            new Date(movieDTO.date),
            movieDTO.author,
        );
    }

    @Get()
    public async findAll(): Promise<Movie[]> {
        return this.moviesService.getAllMovies();
    }

    @Get("home")
    @Render("movies/index")
    public async getMoviesHome() {
        const movies = await this.moviesService.getAllMovies();
        return {
            movies,
        };
    }

    @Post("/update/:id")
    public async update(
        @Body() movieDTO: MovieDTO,
        @Param("id") id: number,
    ): Promise<Movie> {
        return this.moviesService.updateMovie(id, movieDTO);
    }

    @Get(":id")
    @Render("movies/movie")
    public async getMovieHome(@Param("id") id: number) {
        return {
            movie: await this.moviesService.getOneMovie(id),
        };
    }
}
