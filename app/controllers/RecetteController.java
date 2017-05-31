package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import model.Category;
import model.Recette;
import play.mvc.Controller;

import java.sql.SQLException;
import java.util.ArrayList;
import play.Logger;
import play.libs.Json;
import play.mvc.Result;
import services.impl.ServiceCategoryImpl;
import services.impl.ServiceRecetteImpl;
import io.swagger.annotations.*;

/**
 * Created by djamil on 27/05/2017.
 */
@Api(value = "/lesrecettes", description = "Renvoie les recettes")
public class RecetteController extends Controller {

    @ApiOperation(
            nickname = "/getAllRecette",
            value = "Liste des recettes",
            httpMethod = "GET",
            consumes = ("application/json"),
    produces = ("application/json"),
    response = Recette.class
    )
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Liste recupere.", response = Recette.class),
            @ApiResponse(code = 450, message = "Parametres incorrects.", response = Recette.class),
            @ApiResponse(code = 451, message = "Donnees erronees.", response = Recette.class),
    })
    public Result getAllRecette() throws SQLException {
        ServiceRecetteImpl serviceRecette = new ServiceRecetteImpl();
        ArrayList<Recette> recettes = serviceRecette.getAll();

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("recettes", Json.toJson(recettes));
        Logger.debug("recettes " + Json.toJson(recettes).toString());

        return ok(objectNode);
    }

    @ApiOperation(
            nickname = "/getAllCategory",
            value = "Liste des category",
            httpMethod = "GET",
            consumes = ("application/json"),
            produces = ("application/json"),
            response = Category.class
    )
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Liste recupere.", response = Category.class),
            @ApiResponse(code = 450, message = "Parametres incorrects.", response = Category.class),
            @ApiResponse(code = 451, message = "Donnees erronees.", response = Category.class),
    })
    public Result getAllCategory() throws SQLException {
        ServiceCategoryImpl serviceCategory = new ServiceCategoryImpl();
        ArrayList<Category> categories = serviceCategory.getAll();

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("categories", Json.toJson(categories));
        Logger.debug("categories " + Json.toJson(categories).toString());

        return ok(objectNode);
    }

    @ApiOperation(
            nickname = "/getRecetteByCategorie",
            value = "Liste des recettes dun category",
            httpMethod = "GET",
            consumes = ("application/json"),
            produces = ("application/json"),
            response = Recette.class
    )
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Liste recupere.", response = Recette.class),
            @ApiResponse(code = 450, message = "Parametres incorrects.", response = Recette.class),
            @ApiResponse(code = 451, message = "Donnees erronees.", response = Recette.class),
    })
    public Result getRecetteByCategorie(int id) throws SQLException {
        ServiceRecetteImpl serviceRecette = new ServiceRecetteImpl();
        ArrayList<Recette> recettes = serviceRecette.getRecetteByCategorie(id);

        ObjectNode objectNode = Json.newObject();

        objectNode.put("result", "ok");
        objectNode.put("code", "1000");
        objectNode.put("message", "");
        objectNode.put("recettes", Json.toJson(recettes));
        Logger.debug("recettes " + Json.toJson(recettes).toString());

        return ok(objectNode);
    }

}
