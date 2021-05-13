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
    makeHbsHelpers(hbs);

    // listen
    await app.listen(3000);
}

function makeHbsHelpers(hbsObj: any) {
    // format date
    /**
     * le mode : 1 renvoi le format français normal
     * le mode : 2 renvoi un format compris par html form
     */
    hbsObj.registerHelper("date", (mode: number, vDate: Date): string => {
        let date = vDate.getDate().toString();
        let month = (vDate.getMonth() + 1).toString();
        if (date.length <= 1) {
            date = `0${date}`;
        }
        if (month.length <= 1) {
            month = `0${month}`;
        }
        switch (mode) {
            case 1:
                return `${date}/${month}/${vDate.getFullYear()}`;
                break;
            case 2:
                return `${vDate.getFullYear()}-${month}-${date}`;
                break;
            default:
                return `Incorrect mode`;
                break;
        }
    });
}

bootstrap();
