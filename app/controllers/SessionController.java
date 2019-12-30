package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Session;
import play.Logger;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.SessionServiceImpl;
import tools.Log;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import static tools.Const.SESSION_CONNECTED;
import static tools.Utils.getObjectNode;

public class SessionController extends Controller {

    public Result getAll() throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            SessionServiceImpl serviceSession = new SessionServiceImpl();
            ArrayList<Session> sessions = serviceSession.getAll();

            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("sessions", Json.toJson(sessions));
            Logger.debug("sessions " + Json.toJson(sessions).toString());

            return ok(objectNode);
        }
    }

    public Result getActiveSession() throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            SessionServiceImpl serviceSession = new SessionServiceImpl();
            ArrayList<Session> sessions = serviceSession.getActiveSession();

            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("sessions", Json.toJson(sessions));
            Logger.debug("sessions " + Json.toJson(sessions).toString());

            return ok(objectNode);
        }
    }

    public Result addSession() throws SQLException {

        Log.logActionHeader("********Nouvelle Session FODEP********");

        ObjectNode objectNode = Json.newObject();
        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************"+json.toString());

        String idSession = json.findPath("idSession").textValue();
        String dateSession = json.findPath("dateSession").textValue();
        String status = "ac";

        SimpleDateFormat formDate = new SimpleDateFormat("yyyy-MM-dd");
        Date sessDate = null;

        try {
            sessDate = formDate.parse(dateSession);

        } catch (ParseException e) {
            e.printStackTrace();
        }
        try {

            SessionServiceImpl serviceSession = new SessionServiceImpl();

            boolean newSession = serviceSession.addSessionFodep(Integer.parseInt(idSession),dateSession,status);

            Logger.info("REPONCE CREATION " + newSession);

            if (!newSession) {
                String message = "Parametres incorrect,La creation a echoue !";
                objectNode.put("result","nok");
                objectNode.put("code","3000");
                objectNode.put("message",message);

                return ok(objectNode);

            }
            String message = "Session cree avec success!";
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
        }  finally {

        }
    }

    public Result deleteSession(int idSession) throws SQLException {
        Log.logActionHeader("delete Session");
        SessionServiceImpl service = new SessionServiceImpl();
        Logger.debug("delSessionByCode -- code : " + idSession);
        return ok(service.deleteSession(idSession));

    }

    public Result updateStatus(int idSession, String status) throws SQLException {
        Log.logActionHeader("update Session");
        SessionServiceImpl service = new SessionServiceImpl();

        try {

            boolean b = service
                    .updateSessionStatus(idSession,status);

            Logger.info("REPONCE UPDATE Session" + b);

            ObjectNode objectNode = Json.newObject();
            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "Session modifie avec success!");

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
