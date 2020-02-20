package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.AttributReporting;
import play.Logger;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.AttributServiceImpl;
import tools.Log;

import java.sql.SQLException;
import java.util.ArrayList;

import static tools.Const.SESSION_CONNECTED;
import static tools.Utils.getObjectNode;

public class AttributController extends Controller {

    public Result getAllAttribut() throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            AttributServiceImpl attributService = new AttributServiceImpl();
            ArrayList<AttributReporting> attributs = attributService.getAll();


            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("attributs", Json.toJson(attributs));
            Logger.debug("attributs " + Json.toJson(attributs).toString());

            return ok(objectNode);
        }
    }

    public Result addAttribut() throws SQLException {

        Log.logActionHeader("********Nouveau Attribut ********");

        ObjectNode objectNode = Json.newObject();
        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************"+json.toString());

        String codeAttribut = json.findPath("codeAttribut").textValue();
        String libelleAttribut = json.findPath("libelleAttribut").textValue();
        String sourceValeur = json.findPath("sourceValeur").textValue();
        String sourceDonnees = json.findPath("sourceDonnees").textValue();
        String sourceValeur2 = json.findPath("sourceValeur2").textValue();
        String sourceDonnees2 = json.findPath("sourceDonnees2").textValue();

        try {
            AttributServiceImpl attributService = new AttributServiceImpl();

            boolean newAttribut = attributService.addAttribut(codeAttribut,libelleAttribut,sourceValeur,sourceDonnees,sourceValeur2,sourceDonnees2);

            Logger.info("REPONCE CREATION " + newAttribut);

            if (!newAttribut) {
                String message = "Parametres incorrect,La creation a echoue !";
                objectNode.put("result","nok");
                objectNode.put("code","3000");
                objectNode.put("message",message);

                return ok(objectNode);

            }
            String message = "Attribut cree avec success!";
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

    public Result deleteAttribut(String codeAttribut) throws SQLException {
        Log.logActionHeader("delete Attribut");
        AttributServiceImpl service = new AttributServiceImpl();
        Logger.debug("delAttributByCode -- code : " + codeAttribut);
        return ok(service.deleteAttribut(codeAttribut));

    }

    public Result getAttributbyCode(String codeAttribut) throws SQLException {
        Logger.debug("showdetail -- codeAttribut :" + codeAttribut);
        AttributServiceImpl service = new AttributServiceImpl();
        ArrayList<AttributReporting> attributs = service.getAttributByCode(codeAttribut);

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("attributbyid", Json.toJson(attributs));
        Logger.debug("attributbyid " + Json.toJson(attributs).toString());

        return ok(objectNode);
    }

    public Result updateAttribut(String codeAttribut, String libelleAttribut, String sourceValeur, String sourceDonnees) throws SQLException {
        Log.logActionHeader("update attribut");
        AttributServiceImpl service = new AttributServiceImpl();

        try {

            boolean b = service
                    .updateAttribut(codeAttribut,libelleAttribut,sourceValeur,sourceDonnees);

            Logger.info("REPONCE UPDATE Attribut" + b);

            ObjectNode objectNode = Json.newObject();
            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "Attribut modifie avec success!");

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

    public Result getColumnsNames(String tableName) throws SQLException {
        Logger.debug("getcolumns -- table :" + tableName);
        AttributServiceImpl service = new AttributServiceImpl();
        String columns = service.getColumnsNames(tableName);

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("columns", Json.toJson(columns));
        Logger.debug("columns " + Json.toJson(columns).toString());

        return ok(objectNode);
    }
}

