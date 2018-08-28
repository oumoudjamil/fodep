package tools;

import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;

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
}
