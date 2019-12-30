package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.impl.UtilisateurDaoImpl;
import models.Role;
import models.Utilisateur;
import play.Logger;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.ServiceUtilisateurImpl;
import tools.Const;
import tools.Log;
import tools.Utils;

import java.sql.SQLException;
import java.util.ArrayList;

import static tools.Const.SESSION_CONNECTED;
import static tools.Utils.getObjectNode;

public class UtilisateurController extends Controller {

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
                //play.mvc.Controller.ctx().session().put(Const.SESSION_ID_USER, UtilisateurDaoImpl.iduser);
                play.mvc.Controller.ctx().session().put(Const.SESSION_NOM, UtilisateurDaoImpl.nom);
                play.mvc.Controller.ctx().session().put(Const.SESSION_PRENOM, UtilisateurDaoImpl.prenom);
                play.mvc.Controller.ctx().session().put(Const.SESSION_PROFIL, UtilisateurDaoImpl.role);

                user.put("result", "ok");
                user.put("code", "3000");
                user.put("message", "");
                user.put("users", Json.toJson(users));
                Logger.info("User connected " + Json.toJson(users));
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

    public Result getAll(int page, int perPage) throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            ServiceUtilisateurImpl serviceUtilisateur = new ServiceUtilisateurImpl();
            ArrayList<Utilisateur> users = serviceUtilisateur.getAll(page,perPage,false);

            int total = Utils.getTotalRows("select count(*) as total from dispru.utilisateurs");
            Logger.debug("total",total);
            int pageNumber = 0;
            if (total != 0) {
                pageNumber = total / perPage;
                if (total % perPage > 0) {
                    pageNumber++;
                }
            }
            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("users", Json.toJson(users));
            objectNode.put("total", total);
            objectNode.put("total_page", pageNumber);
            objectNode.put("current_page", page);
            objectNode.put("per_page", perPage);
            Logger.debug("users " + Json.toJson(users).toString());

            return ok(objectNode);
        }
    }

    public Result deleteUtilisateur(int id) throws SQLException {
        Log.logActionHeader("delete Utlilisateur");
        ServiceUtilisateurImpl service = new ServiceUtilisateurImpl();
        Logger.debug("delUtlilisateurByCode -- code : " + id);
        return ok(service.deleteUtilisateur(id));

    }

    public Result getAllRole() throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            ServiceUtilisateurImpl serviceUtilisateur = new ServiceUtilisateurImpl();
            ArrayList<Role> roles = serviceUtilisateur.getAllRole();

            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("roles", Json.toJson(roles));
            Logger.debug("roles " + Json.toJson(roles).toString());

            return ok(objectNode);
        }
    }
    public Result addUtilisateur() throws SQLException {

        Log.logActionHeader("********Nouveau Poste Utilisateur********");

        ObjectNode objectNode = Json.newObject();
        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************"+json.toString());

        String prenom = json.findPath("prenom").textValue();
        String nom = json.findPath("nom").textValue();
        String login = json.findPath("login").textValue();
        String role = json.findPath("role").textValue();

        try {
            ServiceUtilisateurImpl serviceUtilisateur = new ServiceUtilisateurImpl();

            boolean newUser = serviceUtilisateur.addUsers(prenom,nom,login,role);

            Logger.info("REPONCE CREATION " + newUser);

            if (!newUser) {
                String message = "Parametres incorrect,La creation a echoue !";
                objectNode.put("result","nok");
                objectNode.put("code","3000");
                objectNode.put("message",message);

                return ok(objectNode);

            }
            String message = "Utilisateur cree avec success!";
            objectNode.put("result","ok");
            objectNode.put("code","200");
            objectNode.put("message",message);
            return ok(objectNode);

        } catch (NullPointerException e) {
            Logger.error(e.getMessage());
            String message = "Erreur interne Parametres incorrecte.";
            objectNode.put("result","ok");
            objectNode.put("code","3001");
            objectNode.put("message",message);
            return ok(objectNode);
        } finally {

        }
    }

    public Result getUserById(int id) throws SQLException {
        Logger.debug("showdetail -- user :" + id);
        ServiceUtilisateurImpl service = new ServiceUtilisateurImpl();
        ArrayList<Utilisateur> users = service.getUserById(id);

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("user", Json.toJson(users));
        Logger.debug("user " + Json.toJson(users).toString());

        return ok(objectNode);
    }

    public Result updateUser(int id,String prenom, String nom, String login, String role) throws SQLException {
        Log.logActionHeader("update user");
        ServiceUtilisateurImpl service = new ServiceUtilisateurImpl();

        try {

            boolean b = service
                    .updateUser(id,prenom,nom,login,role);

            Logger.info("REPONCE UPDATE USER" + b);

            ObjectNode objectNode = Json.newObject();
            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "Utilisateur modifie avec success!");

            Log.logActionOutput(objectNode.toString());
            return ok(objectNode);

        } catch (NullPointerException e) {
            Logger.error(e.getMessage());
            ObjectNode objectNode = Json.newObject();
            objectNode.put("result", "ok");
            objectNode.put("code", "3001");
            objectNode.put("message", "Erreur interne Parametres incorrecte.");
            Log.logActionOutput(objectNode.toString());
            return ok(objectNode);
        }
    }

    public Result updateStatut(int id,String statut) throws SQLException {
        Log.logActionHeader("update user");
        ServiceUtilisateurImpl service = new ServiceUtilisateurImpl();

        try {

            boolean b = service
                    .updateStatut(id,statut);

            Logger.info("REPONCE UPDATE ETAT USER" + b);

            ObjectNode objectNode = Json.newObject();
            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "Utilisateur modifie avec success!");

            Log.logActionOutput(objectNode.toString());
            return ok(objectNode);

        } catch (NullPointerException e) {
            Logger.error(e.getMessage());
            ObjectNode objectNode = Json.newObject();
            objectNode.put("result", "ok");
            objectNode.put("code", "3001");
            objectNode.put("message", "Erreur interne Parametres incorrecte.");
            Log.logActionOutput(objectNode.toString());
            return ok(objectNode);
        }
    }

    public Result deleteRole(int id) throws SQLException {
        Log.logActionHeader("delete Etat");
        ServiceUtilisateurImpl service = new ServiceUtilisateurImpl();
        Logger.debug("delRoleById -- id : " + id);
        return ok(service.deleteRole(id));

    }

    public Result addRole() throws SQLException {

        Log.logActionHeader("********Nouveau Role********");

        ObjectNode objectNode = Json.newObject();
        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************"+json.toString());

        String role = json.findPath("role").textValue();

        try {
            ServiceUtilisateurImpl serviceUtilisateur = new ServiceUtilisateurImpl();

            boolean newRole = serviceUtilisateur.addRole(role);

            Logger.info("REPONCE CREATION " + newRole);

            if (!newRole) {
                String message = "Parametres incorrect,La creation a echoue !";
                objectNode.put("result","nok");
                objectNode.put("code","3000");
                objectNode.put("message",message);

                return ok(objectNode);

            }
            String message = "Role cree avec success!";
            objectNode.put("result","ok");
            objectNode.put("code","200");
            objectNode.put("message",message);
            return ok(objectNode);

        } catch (NullPointerException e) {
            Logger.error(e.getMessage());
            String message = "Erreur interne Parametres incorrecte.";
            objectNode.put("result","ok");
            objectNode.put("code","3001");
            objectNode.put("message",message);
            return ok(objectNode);
        } finally {

        }
    }
}
