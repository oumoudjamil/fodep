package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.PisteDaudit;
import models.ReglePonderation;
import play.Logger;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.ReglePonderationServiceImpl;
import tools.Log;
import tools.Utils;

import java.sql.SQLException;
import java.util.ArrayList;

import static tools.Const.SESSION_CONNECTED;
import static tools.Utils.getObjectNode;

public class ReglePonderationController extends Controller {
    public Result getAll(int page, int perPage) throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            ReglePonderationServiceImpl ponderationService = new ReglePonderationServiceImpl();
            ArrayList<ReglePonderation> ponderations = ponderationService.getAll(page, perPage, false);
            int total = Utils.getTotalRows("select count(*) as total from dispru.details_regle_ponderation");
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
            objectNode.put("ponderations", Json.toJson(ponderations));
            objectNode.put("total", total);
            objectNode.put("total_page", pageNumber);
            objectNode.put("current_page", page);
            objectNode.put("per_page", perPage);
            Logger.debug("ponderations " + Json.toJson(ponderations).toString());

            return ok(objectNode);
        }
    }

    public Result addPonderation() throws SQLException {

        Log.logActionHeader("********Nouveau Regle Ponderation ********");

        ObjectNode objectNode = Json.newObject();
        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************"+json.toString());

        String codeReglePonderation = json.findPath("codeReglePonderation").textValue();
        String codeAttribut = json.findPath("codeAttribut").textValue();
        String codePoste = json.findPath("codePoste").textValue();
        String source = json.findPath("source").textValue();
        String operateur = json.findPath("operateur").textValue();
        String valeur = json.findPath("valeur").textValue();
        String condition = json.findPath("condition").textValue();

        try {
            ReglePonderationServiceImpl ponderationService = new ReglePonderationServiceImpl();

            boolean newPondera = ponderationService.addReglePonderation(Integer.parseInt(codeReglePonderation),codeAttribut,codePoste,valeur,operateur,condition);

            Logger.info("REPONCE CREATION " + newPondera);

            if (!newPondera) {
                String message = "Parametres incorrect,La creation a echoue !";
                objectNode.put("result","nok");
                objectNode.put("code","3000");
                objectNode.put("message",message);

                return ok(objectNode);

            }
            String message = "Regle Ponderation cree avec success!";
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

    public Result addPonderationWhithFile(int codeReglePonderation, String codeAttribut, String codePoste, String condition) throws SQLException {

        Log.logActionHeader("********Nouveaux Etat FODEP********");

        ObjectNode objectNode = Json.newObject();

        try {
            ReglePonderationServiceImpl ponderationService = new ReglePonderationServiceImpl();

            boolean newPondera = true ;//ponderationService.addReglePonderation(codeReglePonderation,codeAttribut,codePoste,condition);


            Logger.info("REPONCE CREATION " + newPondera);

            if (!newPondera) {
                String message = "Parametres incorrect,La creation a echoue !";
                objectNode.put("result","nok");
                objectNode.put("code","3000");
                objectNode.put("message",message);

                return ok(objectNode);

            }
            String message = "Regle cree avec success!";
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

    public Result deletePonderation(int codePonderation, String codeAttribut, String codePoste) throws SQLException {
        Log.logActionHeader("delete ReglePonderation");
        ReglePonderationServiceImpl service = new ReglePonderationServiceImpl();
        Logger.debug("delPonderationByCode -- code : " + codePonderation);
        return ok(service.deleteReglePonderation(codePonderation,codeAttribut,codePoste));

    }

    public Result getPonderationbyCode(int codePonderation, String codeAttribut, String codePoste) throws SQLException {
        Logger.debug("showdetail -- codePonderation :" + codePonderation);
        Logger.debug("showdetail -- codeAttribut :" + codeAttribut);
        Logger.debug("showdetail -- codePoste :" + codePoste);
        ReglePonderationServiceImpl service = new ReglePonderationServiceImpl();
        ArrayList<ReglePonderation> ponderations = service.getReglePonderationByCode(codePonderation,codeAttribut,codePoste);

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("ponderations", Json.toJson(ponderations));
        Logger.debug("ponderations " + Json.toJson(ponderations).toString());

        return ok(objectNode);
    }

    public Result updatePonderation(int codePonderation, String codeAttribut, String codePoste, String condition) throws SQLException {
        Log.logActionHeader("update regle ponderation");
        ReglePonderationServiceImpl service = new ReglePonderationServiceImpl();

        try {

            boolean b = service
                    .updateReglePonderation(codePonderation,codeAttribut,codePoste,condition);

            Logger.info("REPONCE UPDATE Regle Ponderation" + b);

            ObjectNode objectNode = Json.newObject();
            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "Regle Ponderation modifie avec success!");

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

    public Result getAllPiste(int page, int perPage) throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            ReglePonderationServiceImpl ponderationService = new ReglePonderationServiceImpl();
            ArrayList<PisteDaudit> piste = ponderationService.getAllPiste(page, perPage, false);
            int total = Utils.getTotalRows("select count(*) as total from dispru.postesfodep p, dispru.attributs a, dispru.details_regle_ponderation d " +
                    "WHERE p.codeposte=d.codeposte AND d.codeattribut=a.codeattribut");
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
            objectNode.put("pistes", Json.toJson(piste));
            objectNode.put("total", total);
            objectNode.put("total_page", pageNumber);
            objectNode.put("current_page", page);
            objectNode.put("per_page", perPage);
            Logger.debug("pistes " + Json.toJson(piste).toString());

            return ok(objectNode);
        }
    }
}
