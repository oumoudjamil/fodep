package controllers;

import play.Logger;
import play.Routes;
import play.mvc.Controller;
import play.mvc.Result;
import tools.Const;
import views.html.*;

/**
 * Created by djamil on 27/05/2017.
 */
public class HomeController extends Controller{

    public Result recette() {
        
        String session = session(Const.SESSION_CONNECTED);
        if (session == null) {
            Logger.info("unauthorized!");
            return ok(index.render());
        }
        return ok(recettes
                .render());
    }

    public Result index() {
        String session = session(Const.SESSION_CONNECTED);
        if (session != null) {
            return redirect(controllers.routes.HomeController.recette());
        }
        return ok(index.render());
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
                routes.javascript.RecetteController.addCategorie(),
                routes.javascript.RecetteController.updateEtatRecette(),
                routes.javascript.HomeController.recette(),
                routes.javascript.HomeController.index(),
                routes.javascript.RecetteController.delRecette(),
                routes.javascript.UtilisateurController.connectUser()
                ));
    }

}
