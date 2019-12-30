package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.DefaultPonderation;
import play.Logger;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.PonderationServiceImpl;
import tools.Log;

import java.sql.SQLException;
import java.util.ArrayList;

import static tools.Const.SESSION_CONNECTED;
import static tools.Utils.getObjectNode;

public class PonderationDefaultController extends Controller {

    public Result getAll() throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            PonderationServiceImpl ponderationService = new PonderationServiceImpl();
            ArrayList<DefaultPonderation> ponderations = ponderationService.getAll();

            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("ponderations", Json.toJson(ponderations));
            Logger.debug("ponderations " + Json.toJson(ponderations).toString());

            return ok(objectNode);
        }
    }

    public Result addPonderation() throws SQLException {

        Log.logActionHeader("********Nouveau Ponderation ********");

        ObjectNode objectNode = Json.newObject();
        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************"+json.toString());

        String codeReglePonderation = json.findPath("codeReglePonderation").textValue();
        String ponderationDefaut = json.findPath("ponderationDefaut").textValue();

        try {
            PonderationServiceImpl ponderationService = new PonderationServiceImpl();

            boolean newPondera = ponderationService.addPonderation(Integer.parseInt(codeReglePonderation),Integer.parseInt(ponderationDefaut));

            Logger.info("REPONCE CREATION " + newPondera);

            if (!newPondera) {
                String message = "Parametres incorrect,La creation a echoue !";
                objectNode.put("result","nok");
                objectNode.put("code","3000");
                objectNode.put("message",message);

                return ok(objectNode);

            }
            String message = "Ponderation cree avec success!";
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

    public Result deletePonderation(int codePonderation) throws SQLException {
        Log.logActionHeader("delete Ponderation");
        PonderationServiceImpl service = new PonderationServiceImpl();
        Logger.debug("delPonderationByCode -- code : " + codePonderation);
        return ok(service.deletePonderation(codePonderation));

    }

    public Result getPonderationbyCode(int codePonderation) throws SQLException {
        Logger.debug("showdetail -- codePonderation :" + codePonderation);
        PonderationServiceImpl service = new PonderationServiceImpl();
        ArrayList<DefaultPonderation> ponderations = service.getPonderationByCode(codePonderation);

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("ponderations", Json.toJson(ponderations));
        Logger.debug("ponderations " + Json.toJson(ponderations).toString());

        return ok(objectNode);
    }

    public Result updatePonderation(int codePonderation,int ponderationDefaut) throws SQLException {
        Log.logActionHeader("update ponderation");
        PonderationServiceImpl service = new PonderationServiceImpl();

        try {

            boolean b = service
                    .updatePonderation(codePonderation,ponderationDefaut);

            Logger.info("REPONCE UPDATE Ponderation" + b);

            ObjectNode objectNode = Json.newObject();
            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "Ponderation modifie avec success!");

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