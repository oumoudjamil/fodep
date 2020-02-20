package services.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.impl.AttributDAOImpl;
import models.AttributReporting;
import services.AttributService;

import java.sql.SQLException;
import java.util.ArrayList;

public class AttributServiceImpl implements AttributService {
    @Override
    public boolean addAttribut(String codeAttribut, String libelleAttribut, String sourceValeur, String sourceDonnees,String sourceValeur2, String sourceDonnees2) throws SQLException {
        AttributDAOImpl attributDAO = new AttributDAOImpl();
        return attributDAO.addAttribut(codeAttribut, libelleAttribut, sourceValeur, sourceDonnees,sourceValeur2,sourceDonnees2);
    }

    @Override
    public ArrayList<AttributReporting> getAll() throws SQLException {
        AttributDAOImpl attributDAO = new AttributDAOImpl();
        return attributDAO.getAll();
    }

    @Override
    public ObjectNode deleteAttribut(String codeAttribut) throws SQLException {
        AttributDAOImpl attributDAO = new AttributDAOImpl();
        return attributDAO.deleteAttribut(codeAttribut);
    }

    @Override
    public ArrayList<AttributReporting> getAttributByCode(String codeAttribut) throws SQLException {
        AttributDAOImpl attributDAO = new AttributDAOImpl();
        return attributDAO.getAttributByCode(codeAttribut);
    }

    @Override
    public boolean updateAttribut(String codeAttribut, String libelleAttribut, String sourceValeur, String sourceDonnees) throws SQLException{
        AttributDAOImpl attributDAO = new AttributDAOImpl();
        return attributDAO.updateAttribut(codeAttribut,libelleAttribut,sourceValeur,sourceDonnees);
    }
    @Override
    public String getColumnsNames(String tableName) throws SQLException{
        AttributDAOImpl attributDAO = new AttributDAOImpl();
        return attributDAO.getColumnsNames(tableName);
    }
}
