package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Client;
import play.Logger;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.ClientServiceImpl;
import tools.Log;

import java.sql.SQLException;
import java.util.ArrayList;

import static tools.Const.SESSION_CONNECTED;
import static tools.Utils.getObjectNode;

public class ClientFodepController extends Controller {


    public Result getAll() throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            ClientServiceImpl clientService = new ClientServiceImpl();
            ArrayList<Client> clients = clientService.getAll();

            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("clients", Json.toJson(clients));
            Logger.debug("clients " + Json.toJson(clients).toString());

            return ok(objectNode);
        }
    }

}
