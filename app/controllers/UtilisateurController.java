package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.DAOFactory;
import dao.UtilisateurDAO;
import dao.impl.UtilisateurDaoImpl;
import model.Utilisateur;
import play.Logger;
import play.libs.Json;
import play.mvc.Result;
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
            UtilisateurDAO dao = DAOFactory.getUtilisateurDAO();
            ArrayList<Utilisateur> getUser = dao.connectUser(login, mdp);
            if(!getUser.isEmpty()) {
            user.put("result", "ok");
                user.put("code", "3000");
                user.put("message", "");
                user.put("users", Json.toJson(getUser));
                Logger.info("User connecte " + Json.toJson(getUser));
            }else {
                user.put("result", "nok");
                user.put("code", "3002");
                user.put("message", "Aucun user");
                user.put("users", Json.toJson(getUser));
                Logger.info("User connecte " + Json.toJson(getUser));
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
