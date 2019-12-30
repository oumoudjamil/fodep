package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.PosteFodep;
import play.Logger;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.PosteFodepServiceImpl;
import tools.Log;
import tools.Utils;

import java.sql.SQLException;
import java.util.ArrayList;

import static tools.Const.SESSION_CONNECTED;
import static tools.Utils.getObjectNode;

public class PosteFodepController extends Controller {

    public Result getAllPoste(int page, int perPage) throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            PosteFodepServiceImpl servicePoste = new PosteFodepServiceImpl();
            ArrayList<PosteFodep> recettes = servicePoste.getAll(page, perPage, false);

            int total = Utils.getTotalRows("select count(*) as total from dispru.postesfodep");
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
            objectNode.put("postes", Json.toJson(recettes));
            objectNode.put("total", total);
            objectNode.put("total_page", pageNumber);
            objectNode.put("current_page", page);
            objectNode.put("per_page", perPage);
            Logger.debug("postes " + Json.toJson(recettes).toString());

            return ok(objectNode);
        }
    }

    public Result getAll() throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            PosteFodepServiceImpl servicePoste = new PosteFodepServiceImpl();
            ArrayList<PosteFodep> recettes = servicePoste.getAllPoste();

            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("postes", Json.toJson(recettes));
            Logger.debug("postes " + Json.toJson(recettes).toString());

            return ok(objectNode);
        }
    }

    public Result getAllPosteByEtat(String codeEtat) throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            PosteFodepServiceImpl servicePoste = new PosteFodepServiceImpl();
            ArrayList<PosteFodep> postes = servicePoste.getAllPosteEtat(codeEtat);

            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("postes", Json.toJson(postes));
            Logger.debug("postes " + Json.toJson(postes).toString());

            return ok(objectNode);
        }
    }

    public Result addPoste() throws SQLException {

        Log.logActionHeader("********Nouveau Poste FODEP********");

        ObjectNode objectNode = Json.newObject();
        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************"+json.toString());

        String codePoste = json.findPath("codePoste").textValue();
        String libellePoste = json.findPath("libellePoste").textValue();
        String codeEtat = json.findPath("codeEtat").textValue();

        try {
            PosteFodepServiceImpl servicePoste = new PosteFodepServiceImpl();

            boolean newPoste = servicePoste.addPosteFodep(codePoste,libellePoste,codeEtat);

            Logger.info("REPONCE CREATION " + newPoste);

            if (!newPoste) {
                String message = "Parametres incorrect,La creation a echoue !";
                objectNode.put("result","nok");
                objectNode.put("code","3000");
                objectNode.put("message",message);

                return ok(objectNode);

            }
            String message = "Poste cree avec success!";
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

    public Result addPosteWhithFile(String codePoste, String libellePoste, String codeEtat) throws SQLException {

        Log.logActionHeader("********Nouveaux Poste FODEP********");

        ObjectNode objectNode = Json.newObject();

        try {
            PosteFodepServiceImpl service = new PosteFodepServiceImpl();

            boolean newEtat = service.addPosteFodep(codePoste,libellePoste,codeEtat);

            Logger.info("REPONCE CREATION " + newEtat);

            if (!newEtat) {
                String message = "Parametres incorrect,La creation a echoue !";
                objectNode.put("result","nok");
                objectNode.put("code","3000");
                objectNode.put("message",message);

                return ok(objectNode);

            }
            String message = "Etat cree avec success!";
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
    public Result deletePoste(String codePoste) throws SQLException {
        Log.logActionHeader("delete Poste");
        PosteFodepServiceImpl service = new PosteFodepServiceImpl();
        Logger.debug("delPosteByCode -- code : " + codePoste);
        return ok(service.deletePoste(codePoste));

    }

    public Result getPostebyCode(String codePoste) throws SQLException {
        Logger.debug("showdetail -- codePoste :" + codePoste);
        PosteFodepServiceImpl service = new PosteFodepServiceImpl();
        ArrayList<PosteFodep> posteFodeps = service.getPosteByCode(codePoste);

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("Postebyid", Json.toJson(posteFodeps));
        Logger.debug("postebyid " + Json.toJson(posteFodeps).toString());

        return ok(objectNode);
    }

    public Result updatePoste(String codePoste, String libellePoste, String codeEtat) throws SQLException {
        Log.logActionHeader("update poste");
        PosteFodepServiceImpl service = new PosteFodepServiceImpl();

        try {

            boolean b = service
                .updatePoste(codePoste,libellePoste,codeEtat);

            Logger.info("REPONCE UPDATE Poste" + b);

            ObjectNode objectNode = Json.newObject();
            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "Poste modifie avec success!");

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

}
