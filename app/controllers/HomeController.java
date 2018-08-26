package controllers;

import play.Logger;
import play.Routes;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.*;

/**
 * Created by djamil on 27/05/2017.
 */
public class HomeController extends Controller{

    public Result recette() {

        return ok(recettes
                .render());
    }

    public Result menu() {

        return ok(menu
                .render());
    }

    public Result single() {

        return ok(single
                .render());
    }

    public Result jsRoutes() {
        response().setContentType("text/javascript");
        return ok(Routes.javascriptRouter("appRoutes",
                routes.javascript.RecetteController.getAllRecette(),
                routes.javascript.RecetteController.getRecetteByCategorie(),
                routes.javascript.RecetteController.getAllCategory(),
                routes.javascript.RecetteController.addRecette(),
                routes.javascript.RecetteController.getRecettebyId(),
                routes.javascript.RecetteController.updateRecette(),
                routes.javascript.HomeController.recette(),
                routes.javascript.HomeController.menu(),
                routes.javascript.HomeController.single(),
                routes.javascript.RecetteController.delRecette()
        ));
    }

}
