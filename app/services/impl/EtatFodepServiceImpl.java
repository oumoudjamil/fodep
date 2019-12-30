package services.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.EtatFodepDAO;
import dao.impl.EtatFodepDAOImpl;
import models.EtatFodep;
import services.EtatFodepService;

import java.sql.SQLException;
import java.util.ArrayList;

public class EtatFodepServiceImpl implements EtatFodepService {

    @Override
    public boolean addEtatFodep(String codeEtat, String libelleEtat) throws SQLException{
        EtatFodepDAOImpl etatFodepDAO = new EtatFodepDAOImpl();
        return etatFodepDAO.addEtatFodep(codeEtat, libelleEtat);
    }

    @Override
    public ArrayList<EtatFodep> getAll(int page, int perPage, boolean all) throws SQLException {
        EtatFodepDAOImpl etatFodepDAO = new EtatFodepDAOImpl();
        return etatFodepDAO.getAll(page,perPage,all);
    }

    @Override
    public ArrayList<EtatFodep> getAll() throws SQLException {
        EtatFodepDAOImpl etatFodepDAO = new EtatFodepDAOImpl();
        return etatFodepDAO.getAll();
    }

    @Override
    public ObjectNode deleteEtat(String codeEtat) throws SQLException {
        EtatFodepDAOImpl etatFodepDAO = new EtatFodepDAOImpl();
        return etatFodepDAO.deleteEtat(codeEtat);
    }

    @Override
    public ArrayList<EtatFodep> getEtatByCode(String codeEtat) throws SQLException {
        EtatFodepDAOImpl etatFodepDAO = new EtatFodepDAOImpl();
        return etatFodepDAO.getEtatByCode(codeEtat);
    }

    @Override
    public boolean updateEtat(String codeEtat, String libelleEtat) throws SQLException{
        EtatFodepDAOImpl etatFodepDAO = new EtatFodepDAOImpl();
        return etatFodepDAO.updateEtat(codeEtat,libelleEtat);
    }
}
