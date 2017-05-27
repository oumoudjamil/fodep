package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import model.Recette;
import play.mvc.Controller;

import java.sql.SQLException;
import java.util.ArrayList;
import play.Logger;
import play.libs.Json;
import play.mvc.Result;
import services.impl.ServiceRecetteImpl;

/**
 * Created by djamil on 27/05/2017.
 */
public class RecetteController extends Controller {

    public Result getAllRecette() throws SQLException {
        ServiceRecetteImpl serviceRecette = new ServiceRecetteImpl();
        ArrayList<Recette> factures = serviceRecette.getAllRecette();

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "1000");
        objectNode.put("message", "");
        objectNode.put("recettes", Json.toJson(factures));
        Logger.debug("recettes " + Json.toJson(factures).toString());

        return ok(objectNode);
    }

}
