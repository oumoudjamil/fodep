package tools;

import com.fasterxml.jackson.databind.node.ObjectNode;
import play.Logger;
import play.db.DB;
import play.libs.Json;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Created by djamil on 28/08/2018.
 */
public class Utils {
    public static boolean checkData(String... data) {
        for (String s : data) {
            if (s == null) {
                return false;
            } else if (s.isEmpty()) {
                return false;
            }
        }
        return true;

    }

    public static ObjectNode getObjectNode(int code, String message) {
        ObjectNode result = Json.newObject();

        result.put("code", code);
        result.put("message", message);

        return result;
    }

    public static ObjectNode getObjectNode(String res, String code, String message) {
        ObjectNode result = Json.newObject();
        result.put("result", res);
        result.put("code", code);
        result.put("message", message);

        return result;
    }

    public static int getTotalRows(String reqForTotalRows) {
        Logger.debug("RESQUEST TOTAL >>> " + reqForTotalRows);
        Connection connection = DB.getConnection();
        Statement statement;
        int i;
        try {
            statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(reqForTotalRows);
            if (resultSet.next()) {
                i = resultSet.getInt("total");
            } else {
                i = 0;
            }
        } catch (SQLException e) {
            return 0;
        } finally {
            try {
                connection.close();
            } catch (SQLException e) {
                Logger.error("SQLException " + e.getMessage());
            }
        }
        Logger.debug("Total: " + i);
        return i;
    }
}
