package dao;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.DefaultPonderation;

import java.sql.SQLException;
import java.util.ArrayList;

public interface PonderationDAO {
    boolean addPonderation(int codeReglePonderation, int defaultPonderation) throws SQLException;
    ArrayList<DefaultPonderation> getAll() throws SQLException;
    ObjectNode deletePonderation(int codeReglePonderation) throws SQLException;
    ArrayList<DefaultPonderation> getPonderationByCode(int codeReglePonderation) throws SQLException;
    boolean updatePonderation(int codeReglePonderation, int defaultPonderation) throws SQLException;
}
