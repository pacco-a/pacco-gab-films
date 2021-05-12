import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "../ormconfig";
import { MoviesController } from "./movies/movies.controller";
import { MoviesService } from "./movies/movies.service";
import Movie from "./movies/movies.entity";

@Module({
    imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Movie])],
    controllers: [AppController, MoviesController],
    providers: [AppService, MoviesService],
})
export class AppModule {}
