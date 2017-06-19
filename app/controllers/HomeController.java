package controllers;

import play.Logger;
import play.Routes;
import play.mvc.Controller;
import play.mvc.Result;
/**
 * Created by djamil on 27/05/2017.
 */
public class HomeController extends Controller{

    public Result jsRoutes() {
        response().setContentType("text/javascript");
        return ok(Routes.javascriptRouter("appRoutes",
                routes.javascript.RecetteController.getAllRecette(),
                routes.javascript.RecetteController.getRecetteByCategorie(),
                routes.javascript.RecetteController.getAllCategory(),
                routes.javascript.RecetteController.addRecette()

        ));
    }

}
