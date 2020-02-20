package services;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.PisteDaudit;
import models.ReglePonderation;

import java.sql.SQLException;
import java.util.ArrayList;

public interface ReglePonderationService {
    boolean addReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste, String valeur, String operateur, String condition) throws SQLException;
    ArrayList<ReglePonderation> getAll(int page, int perPage, boolean all) throws SQLException;
    ObjectNode deleteReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste) throws SQLException;
    ArrayList<ReglePonderation> getReglePonderationByCode(int codeReglePonderation, String codeAttribut, String codePoste) throws SQLException;
    boolean updateReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste, String condition) throws SQLException;
    ArrayList<PisteDaudit> getAllPiste(int page, int perPage, boolean all) throws SQLException;

}
