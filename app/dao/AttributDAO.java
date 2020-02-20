package dao;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.AttributReporting;

import java.sql.SQLException;
import java.util.ArrayList;

public interface AttributDAO {
    boolean addAttribut(String codeAttribut, String libelleAttribut, String sourceValeur, String sourceDonnees,String sourceValeur2, String sourceDonnees2) throws SQLException;
    ArrayList<AttributReporting> getAll() throws SQLException;
    ObjectNode deleteAttribut(String codeAttribut) throws SQLException;
    ArrayList<AttributReporting> getAttributByCode(String codeAttribut) throws SQLException;
    boolean updateAttribut(String codeAttribut, String libelleAttribut, String sourceValeur, String sourceDonnees) throws SQLException;
    String getColumnsNames (String tablename) throws SQLException;
}
