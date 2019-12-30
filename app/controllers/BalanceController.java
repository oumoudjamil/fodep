package controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Balance;
import play.Logger;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.BalanceServiceImpl;
import tools.Log;
import tools.Utils;

import java.sql.SQLException;
import java.util.ArrayList;

import static tools.Const.SESSION_CONNECTED;
import static tools.Utils.getObjectNode;

public class BalanceController extends Controller {

    public Result getAll(int page, int perPage) throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return unauthorized(objectNode);
        }
        else {
            BalanceServiceImpl balanceService = new BalanceServiceImpl();
            ArrayList<Balance> balances = balanceService.getAll(page, perPage, false);
            int total = Utils.getTotalRows("select count(*) as total from dispru.balance");
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
            objectNode.put("balances", Json.toJson(balances));
            objectNode.put("total", total);
            objectNode.put("total_page", pageNumber);
            objectNode.put("current_page", page);
            objectNode.put("per_page", perPage);
            Logger.debug("balances " + Json.toJson(balances).toString());

            return ok(objectNode);
        }
    }
}
