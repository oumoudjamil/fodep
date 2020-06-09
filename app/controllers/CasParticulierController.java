package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.impl.CasParticulierDAOImpl;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.CasParticulierServiceImpl;
import tools.Log;

import java.sql.SQLException;

public class CasParticulierController extends Controller {

    public Result chargeClinetele() throws SQLException {

        ObjectNode objectNode = Json.newObject();
        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************" + json.toString());

        String client_id = json.findPath("client_id").textValue();
        Logger.debug("client_id " + client_id);
        CasParticulierServiceImpl casParticulierService = new CasParticulierServiceImpl();

        casParticulierService.getClientele(client_id);

        String message = "charger avec success!";
        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", message);
        return ok(objectNode);

    }

}
