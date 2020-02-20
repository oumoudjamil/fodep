package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Resultat;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import org.apache.poi.ss.usermodel.Workbook;
import play.Logger;
import play.db.DB;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.impl.ResultatsFodepServiceImpl;
import tools.Log;

import java.io.File;
import java.sql.Connection;
import java.util.*;

public class ExportController extends Controller{

    public Result generateReport() throws Exception {
        ObjectNode objectNode = Json.newObject();

        JsonNode json = request().body().asJson();
        Log.logActionInputJson("JSON*******************"+json.toString());

        String etat = json.findPath("etat").textValue();
        String session_id = json.findPath("session").textValue();
        int session = Integer.parseInt(session_id);

        Connection c = DB.getConnection();

        ResultatsFodepServiceImpl service= new ResultatsFodepServiceImpl();
        ArrayList<Resultat> resultats = service.getAll(etat);

        File returnedFile = null;
        // Create a JasperReport data source and ...
        JRBeanCollectionDataSource resultatsDS = new JRBeanCollectionDataSource(resultats);

        // ... add them to the parameters Map object
        Map<String, Object> parameters = new HashMap<String, Object>();

        parameters.put("LIBELLEETAT", "Risque de crédit : expositions sur les autres actifs");
        parameters.put("P_codeetat", etat);
        parameters.put("P_session", session);
        // Call fillReport method passing the main report and the parameters
        // To finish, export the report to a PDF file
        try {

            JasperPrint jasperPrint = JasperFillManager.fillReport("app/ressources/"+etat+".jasper",parameters, c);
            JRXlsxExporter xlsExporter = new JRXlsxExporter();
            xlsExporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            xlsExporter.setExporterOutput(new SimpleOutputStreamExporterOutput("conf/"+etat+".xlsx"));
            xlsExporter.exportReport();

            returnedFile = new File("conf/", etat+".xlsx");
            Long filesize = null;
            filesize = returnedFile.length();

            response().setHeader("Cache-Control", " no-cache, must-revalidate");
            response().setHeader("Cache-Control", " post-check=0,pre-check=0");
            response().setHeader("Cache-Control", " max-age=0");
            response().setHeader("Pragma", " no-cache");
            response().setHeader("Expires", " 0");
            //response().setHeader("Content-Type: application/force-download");
            response().setHeader("Content-Length", String.valueOf(filesize));

            response().setContentType("application/vnd.ms-excel");
            response().setHeader("Content-Disposition",
                    "attachment; filename=\"" + returnedFile.getName() + "\"");

            objectNode.put("result", "ok");
            objectNode.put("code", "200");
            objectNode.put("message", "Generation effectuée");
            objectNode.put("data", Json.toJson(objectNode));
        }catch (Exception e){
            Logger.error(e.getMessage());
            objectNode.put("result", "nok");
            objectNode.put("code", "3000");
            objectNode.put("message", "Generation echouée");
            objectNode.put("data", Json.toJson(objectNode));
        }
        return ok(objectNode);
    }
}