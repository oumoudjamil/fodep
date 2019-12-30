package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.EtatFodep;
import play.Logger;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.EtatFodepServiceImpl;
import tools.Log;
import tools.Utils;

import java.sql.SQLException;
import java.util.ArrayList;

import static tools.Const.SESSION_CONNECTED;
import static tools.Utils.getObjectNode;

public class EtatFodepController extends Controller {

    public Result getAll() throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {

            EtatFodepServiceImpl serviceEtat= new EtatFodepServiceImpl();
            ArrayList<EtatFodep> etats = serviceEtat.getAll();


            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("etats", Json.toJson(etats));
            Logger.debug("etats " + Json.toJson(etats).toString());

            return ok(objectNode);
        }
    }
    public Result getAllEtat(int page, int perPage) throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {

        EtatFodepServiceImpl serviceEtat= new EtatFodepServiceImpl();
        ArrayList<EtatFodep> etats = serviceEtat.getAll(page, perPage, false);

            int total = Utils.getTotalRows("select count(*) as total from dispru.etatsfodep");
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
        objectNode.put("etats", Json.toJson(etats));
        objectNode.put("total", total);
        objectNode.put("total_page", pageNumber);
        objectNode.put("current_page", page);
        objectNode.put("per_page", perPage);
        Logger.debug("etats " + Json.toJson(etats).toString());

        return ok(objectNode);
        }
    }

    public Result addEtat() throws SQLException {

        Log.logActionHeader("********Nouveau Etat FODEP********");

        ObjectNode objectNode = Json.newObject();
        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************"+json.toString());

        String codeEtat = json.findPath("codeEtat").textValue();
        String libelleEtat = json.findPath("libelleEtat").textValue();

        try {
            EtatFodepServiceImpl serviceEtat = new EtatFodepServiceImpl();

            boolean newEtat = serviceEtat.addEtatFodep(codeEtat,libelleEtat);

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

    public Result addEtatWhithFile(String codeEtat, String libelleEtat) throws SQLException {

        Log.logActionHeader("********Nouveaux Etat FODEP********");

        ObjectNode objectNode = Json.newObject();

        try {
            EtatFodepServiceImpl serviceEtat = new EtatFodepServiceImpl();

            boolean newEtat = serviceEtat.addEtatFodep(codeEtat,libelleEtat);

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

    public Result deleteEtat(String codeEtat) throws SQLException {
        Log.logActionHeader("delete Etat");
        EtatFodepServiceImpl service = new EtatFodepServiceImpl();
        Logger.debug("delEtatByCode -- code : " + codeEtat);
        return ok(service.deleteEtat(codeEtat));

    }

    public Result getEtatbyCode(String codeEtat) throws SQLException {
        Logger.debug("showdetail -- codeEtat :" + codeEtat);
        EtatFodepServiceImpl service = new EtatFodepServiceImpl();
        ArrayList<EtatFodep> etatFodeps = service.getEtatByCode(codeEtat);

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("etatbyid", Json.toJson(etatFodeps));
        Logger.debug("etatbyid " + Json.toJson(etatFodeps).toString());

        return ok(objectNode);
    }

    public Result updateEtat(String codeEtat, String libelleEtat) throws SQLException {
        Log.logActionHeader("update etat");
        EtatFodepServiceImpl service = new EtatFodepServiceImpl();

        try {

            boolean b = service
                    .updateEtat(codeEtat,libelleEtat);

            Logger.info("REPONCE UPDATE ETAT" + b);

            ObjectNode objectNode = Json.newObject();
            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "Etat modifie avec success!");

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
