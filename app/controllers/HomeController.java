package controllers;

import models.Utilisateur;
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

    public Result login() {
        return ok(login
                .render());
    }
    public Result dashbord() {
        return ok(tableaudebord
                .render());
    }
    public Result balance() {
        return ok(balance
                .render());
    }
    public Result pisteAudite() {
        return ok(pisteAudite
                .render());
    }
    public Result etatfodep() {
        String session = session(Const.SESSION_CONNECTED);
        /*if (session != null) {

        }
        Utilisateur user = new Utilisateur(session(Const.SESSION_PRENOM),session(Const.SESSION_NOM),session(Const.SESSION_LOGIN));
        */
        return ok(etatfodep
                .render());
    }
    public Result postefodep() {
        return ok(postefodep
                .render());
    }

    public Result attribut() {
        return ok(attribut
                .render());
    }
    public Result defaultPonderation() {
        return ok(defaultPonderation
                .render());
    }
    public Result reglesFodep() {
        return ok(reglesPonderation
                .render());
    }

    public Result utilisateur() {
        return ok(utilisateur
                .render());
    }

    public Result role() {
        return ok(role
                .render());
    }

    public Result generateEtat() {
        return ok(generationEtat
                .render());
    }

    public Result logout() {
        session().clear();
        return ok(login.render());
    }

    public Result sessionFodep() {
        return ok(sessionFodep.render());
    }

    public Result jsRoutes() {
        response().setContentType("text/javascript");
        return ok(Routes.javascriptRouter("jsRoutes",
                routes.javascript.EtatFodepController.addEtat(),
                routes.javascript.EtatFodepController.getAllEtat(),
                routes.javascript.EtatFodepController.getAll(),
                routes.javascript.EtatFodepController.deleteEtat(),
                routes.javascript.EtatFodepController.getEtatbyCode(),
                routes.javascript.EtatFodepController.updateEtat(),
                routes.javascript.EtatFodepController.addEtatWhithFile(),
                routes.javascript.PosteFodepController.addPoste(),
                routes.javascript.PosteFodepController.getAllPoste(),
                routes.javascript.PosteFodepController.getAll(),
                routes.javascript.PosteFodepController.deletePoste(),
                routes.javascript.PosteFodepController.getPostebyCode(),
                routes.javascript.PosteFodepController.updatePoste(),
                routes.javascript.PosteFodepController.addPosteWhithFile(),
                routes.javascript.PosteFodepController.getAllPosteByEtat(),
                routes.javascript.AttributController.addAttribut(),
                routes.javascript.AttributController.getAllAttribut(),
                routes.javascript.AttributController.deleteAttribut(),
                routes.javascript.AttributController.getAttributbyCode(),
                routes.javascript.AttributController.updateAttribut(),
                routes.javascript.AttributController.getColumnsNames(),
                routes.javascript.PonderationDefaultController.getAll(),
                routes.javascript.PonderationDefaultController.addPonderation(),
                routes.javascript.PonderationDefaultController.deletePonderation(),
                routes.javascript.PonderationDefaultController.getPonderationbyCode(),
                routes.javascript.PonderationDefaultController.updatePonderation(),
                routes.javascript.ReglePonderationController.getAll(),
                routes.javascript.ReglePonderationController.addPonderation(),
                routes.javascript.ReglePonderationController.deletePonderation(),
                routes.javascript.ReglePonderationController.getPonderationbyCode(),
                routes.javascript.ReglePonderationController.updatePonderation(),
                routes.javascript.ReglePonderationController.addPonderationWhithFile(),
                routes.javascript.SessionController.getAll(),
                routes.javascript.SessionController.getActiveSession(),
                routes.javascript.SessionController.deleteSession(),
                routes.javascript.SessionController.addSession(),
                routes.javascript.SessionController.deleteSession(),
                routes.javascript.SessionController.updateStatus(),
                routes.javascript.UtilisateurController.connectUser(),
                routes.javascript.UtilisateurController.getAll(),
                routes.javascript.UtilisateurController.deleteUtilisateur(),
                routes.javascript.UtilisateurController.getAllRole(),
                routes.javascript.UtilisateurController.addUtilisateur(),
                routes.javascript.UtilisateurController.getUserById(),
                routes.javascript.UtilisateurController.updateUser(),
                routes.javascript.UtilisateurController.updateStatut(),
                routes.javascript.UtilisateurController.deleteRole(),
                routes.javascript.UtilisateurController.addRole(),
                routes.javascript.BalanceController.getAll(),
                routes.javascript.ResultatsController.getExpoNette(),
                //routes.javascript.ResultatsController.getResult(),
                routes.javascript.ResultatsController.chargeResultat(),
                routes.javascript.ExportController.generateReport()
                ));
    }

}
