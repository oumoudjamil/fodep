package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.UtilisateurDAO;
import dao.impl.UtilisateurDaoImpl;
import model.Utilisateur;
import play.Logger;
import play.libs.Json;
import play.mvc.Result;
import services.impl.ServiceUtilisateurImpl;
import tools.Const;
import tools.Log;
import tools.Utils;

import java.sql.SQLException;
import java.util.ArrayList;

import static play.mvc.Controller.request;
import static play.mvc.Results.ok;

/**
 * Created by djamil on 28/08/2018.
 */
public class UtilisateurController {

    public Result connectUser() {
        Log.logActionHeader("Nouvelle connexion d'un utilisateur");
        JsonNode json = request().body().asJson();
        ObjectNode user = Json.newObject();
        try {
            String login = json.findPath("login").textValue();
            String mdp = json.findPath("password").textValue();
            Logger.info("user Login " + login);
            Logger.info("user Password " + mdp);
            String[] data = new String[]{login, mdp};
            if (!Utils.checkData(data)) {
                return ok(Utils.getObjectNode("nok", "3001", "Parametres incorrects."));
            }

            ServiceUtilisateurImpl serviceUtilisateur = new ServiceUtilisateurImpl();
            ArrayList<Utilisateur> users = serviceUtilisateur.connectUser(login,mdp);

            Logger.info("User  Okkk");

            if(!users.isEmpty()) {

                    play.mvc.Controller.ctx().session().clear();
                    play.mvc.Controller.ctx().session().put(Const.SESSION_CONNECTED, "true");
                    play.mvc.Controller.ctx().session().put(Const.SESSION_LOGIN, login);
                    play.mvc.Controller.ctx().session().put(Const.SESSION_ID_USER, UtilisateurDaoImpl.iduser);
                    play.mvc.Controller.ctx().session().put(Const.SESSION_NOM, UtilisateurDaoImpl.nom);
                    play.mvc.Controller.ctx().session().put(Const.SESSION_PRENOM, UtilisateurDaoImpl.prenom);

                user.put("result", "ok");
                user.put("code", "3000");
                user.put("message", "");
                user.put("users", Json.toJson(users));
                Logger.info("User connecte " + Json.toJson(users));
            }else {
                user.put("result", "nok");
                user.put("code", "3002");
                user.put("message", "Aucun user");
                user.put("users", Json.toJson(users));
                Logger.info("User not connected " + Json.toJson(users));
            }
            return ok(user);
        } catch (SQLException e) {
            Logger.error("getUser SQLException " + e.getMessage());
            ObjectNode result = Json.newObject();
            result = Utils.getObjectNode("nok","3005","Echec de la connexion!");
            return ok(result);
        }

    }

}
