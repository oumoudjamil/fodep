package dao;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.ReglePonderation;

import java.sql.SQLException;
import java.util.ArrayList;

public interface ReglePonderationDAO {
    boolean addReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste, String condition) throws SQLException;
    ArrayList<ReglePonderation> getAll(int page, int perPage, boolean all) throws SQLException;
    ObjectNode deleteReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste) throws SQLException;
    ArrayList<ReglePonderation> getReglePonderationByCode(int codeReglePonderation, String codeAttribut, String codePoste) throws SQLException;
    boolean updateReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste, String condition) throws SQLException;

}
