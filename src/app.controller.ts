import { Controller, Get, Redirect, Render } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    // @Redirect("/movies/home")
    @Render("index")
    getHello() {
        return {
            title: "Index",
            me: {
                name: "Pacco",
                age: 20,
            },
            today: new Date(Date.now()),
        };
    }
}
