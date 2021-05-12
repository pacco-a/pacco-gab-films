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

    // hbs views
    app.setBaseViewsDir(join(__dirname, "..", "..", "views"));
    app.setViewEngine("hbs");

    // app.set("view options", {
    //     layout: "layouts/main",
    // });

    hbs.registerPartials(join(__dirname, "..", "..", "views/partials"), null);

    //#region hbs custom helpers

    // format date
    hbs.registerHelper("date", (vDate: Date): string => {
        let date = vDate.getDate().toString();
        let month = (vDate.getMonth() + 1).toString();
        if (date.length <= 1) {
            date = `0${date}`;
        }
        if (month.length <= 1) {
            month = `0${month}`;
        }
        return `${date}/${month}/${vDate.getFullYear()}`;
    });

    hbs.registerHelper(
        "testAuthor",
        (movieDTO: MovieDTO, authorToTest: string): Boolean => {
            console.log(movieDTO.author);
            console.log(authorToTest);

            if (movieDTO.author === authorToTest) {
                return true;
            } else {
                return false;
            }
        },
    );

    //#endregion

    // listen
    await app.listen(3000);
}
bootstrap();
