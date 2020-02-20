package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Resultat;
import play.Logger;
import play.i18n.Messages;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.ResultatsFodepServiceImpl;
import tools.Log;

import java.sql.SQLException;
import java.util.ArrayList;

import static tools.Const.SESSION_CONNECTED;
import static tools.Utils.getObjectNode;

public class ResultatsController extends Controller {

    public Result getExpoNette(String codePoste) throws SQLException {
        ObjectNode objectNode = Json.newObject();

        ResultatsFodepServiceImpl resultatsFodepService = new ResultatsFodepServiceImpl();
        String expoNette = resultatsFodepService.getExpositionNette(codePoste);

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("expo", expoNette);
        Logger.debug("expo " + expoNette);

        return ok(objectNode);

    }

    public String getResult(String codePoste, String codeEtat, String colonne) throws SQLException {
        ObjectNode objectNode = Json.newObject();

        ResultatsFodepServiceImpl resultatsFodepService = new ResultatsFodepServiceImpl();
        String getResult = resultatsFodepService.getResult(codePoste, codeEtat, colonne);

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("result", getResult);
        Logger.debug("result " + getResult);

        if (getResult.equals("") || getResult.equals("null")) {
            getResult = "";
        }
        return getResult;
    }

    public String getPonderation(String codePoste) throws SQLException {
        ObjectNode objectNode = Json.newObject();

        ResultatsFodepServiceImpl resultatsFodepService = new ResultatsFodepServiceImpl();
        String getResult = resultatsFodepService.getExpositionNette(codePoste);

        objectNode.put("result", "ok");
        objectNode.put("code", "200");
        objectNode.put("message", "");
        objectNode.put("result", getResult);
        Logger.debug("result " + getResult);

        if (getResult.equals("") || getResult.equals("null")) {
            getResult = "";
        }
        return getResult;
    }

    public Result chargeResultat() throws SQLException {

        Log.logActionHeader("********Nouveau resultat ********");

        ObjectNode objectNode = Json.newObject();
        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************" + json.toString());
        boolean resultat = false;
        try {
            String codeEtat = json.findPath("codeEtat").textValue();
            String codePoste = json.findPath("codePoste").textValue();
            String libellePoste = json.findPath("libellePoste").textValue();
            String session_id = json.findPath("session").textValue();

            String ponderation = "";
            String mnt4 ;
            Double colonne2 = 0.0;
            Double colonne3 = 0.0;
            int mnt6 = 0;
            Double mnt7 = 0.0;
            Double mnt8 = 0.0;
            Double mnt9 = 0.0;

            ponderation = getPonderation(codePoste);
            mnt4 = getResult(codePoste, codeEtat, "mnt4");

            if (ponderation.equals("") || ponderation.isEmpty()) {
                ponderation = "0";
            }

            if (mnt4.equals("") || mnt4.isEmpty()) {
                colonne2 = 0.0;
            }
            else {
                colonne2 = Double.parseDouble(mnt4) / 1000000;
            }

            String creance = getResult(codePoste, codeEtat, "mnt5");
            if (creance.equals("") || creance.isEmpty()) {
                colonne3 = 0.0;
            }else{
                colonne3 = Double.parseDouble(creance) / 1000000;
            }

            if(codeEtat.replaceAll(" ","").equals("EP20")){
                colonne3 = ((Double.parseDouble(ponderation) * colonne2));
            }

            if(codeEtat.replaceAll(" ","").equals("EP09")){

                String provision = getResult(codePoste, codeEtat, "mnt7");

                if (provision.equals("") || provision.isEmpty()) {
                    mnt7 = 0.0;
                }else{
                    mnt9 = Double.parseDouble(mnt4) + Double.parseDouble(provision);
                }
                if(mnt9 != 0.0){
                    mnt9 = mnt9 / 1000000;
                }

            }

            ResultatsFodepServiceImpl resultatsFodepService = new ResultatsFodepServiceImpl();

            if(codePoste.replaceAll(" ","").equals("RC276")){
                resultat = resultatsFodepService.chargeTotaux(codeEtat,codePoste,libellePoste,session_id);
            }else {
                resultat = resultatsFodepService.chargeResultat(codeEtat, codePoste, libellePoste, ponderation + "%", colonne2,
                        colonne3, session_id,mnt6,mnt7, mnt9);
            }
            Logger.info("REPONCE CREATION " + resultat);

            if (!resultat) {
                String message = "Parametres incorrect,La creation a echoue !";
                objectNode.put("result", "nok");
                objectNode.put("code", "3000");
                objectNode.put("message", message);

                return ok(objectNode);

            }
            String message = "charger avec success!";
            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", message);
            return ok(objectNode);

        } catch (NullPointerException e) {
            Logger.error(e.getMessage());
            String message = "Erreur interne Parametres incorrecte.";
            objectNode.put("result", "ok");
            objectNode.put("code", "3001");
            objectNode.put("message", message);
            return ok(objectNode);
        } finally {

        }
    }

    public static ArrayList<Resultat> getAll(String etat) throws SQLException {
        ObjectNode objectNode = Json.newObject();
        String session = session(SESSION_CONNECTED);
        if (session == null) {
            objectNode = getObjectNode("nosession", "3001", Messages.get("error.session"));
            Log.logActionOutput(objectNode.toString());
            return null;
        } else {
            ResultatsFodepServiceImpl service = new ResultatsFodepServiceImpl();
            ArrayList<Resultat> resultats = service.getAll(etat);

            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "");
            objectNode.put("resultats", Json.toJson(resultats));
            Logger.debug("resultats " + Json.toJson(resultats).toString());

            return resultats;
        }
    }

}
