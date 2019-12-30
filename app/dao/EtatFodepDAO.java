package dao;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.EtatFodep;

import java.sql.SQLException;
import java.util.ArrayList;

public interface EtatFodepDAO {
    boolean addEtatFodep(String codeEtat, String libelleEtat) throws SQLException;
    ArrayList<EtatFodep> getAll(int page, int perPage, boolean all) throws SQLException;
    ArrayList<EtatFodep> getAll() throws SQLException;
    ObjectNode deleteEtat(String codeEtat) throws SQLException;
    ArrayList<EtatFodep> getEtatByCode(String codeEtat) throws SQLException;
    boolean updateEtat(String codeEtat, String libelleEtat) throws SQLException;
}
