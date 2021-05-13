import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import * as hbs from "hbs";
import handlebars from "handlebars";
import MovieDTO from "./movies/dtos/movie-dto";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // static folder
    app.useStaticAssets(join(__dirname, "..", "..", "public"));

    // pug views
    app.setBaseViewsDir(join(__dirname, "..", "..", "views"));
    app.setViewEngine("pug");
    app.setLocal("basedir", join(__dirname, "..", "..", "views"));

    // listen
    await app.listen(3000);
}

bootstrap();
