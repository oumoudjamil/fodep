package services.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.impl.PonderationDAOImpl;
import models.DefaultPonderation;
import services.PonderationService;

import java.sql.SQLException;
import java.util.ArrayList;

public class PonderationServiceImpl implements PonderationService {
    @Override
    public boolean addPonderation(int codeReglePonderation, int defaultPonderation) throws SQLException {
        PonderationDAOImpl ponderationDAO = new PonderationDAOImpl();
        return ponderationDAO.addPonderation(codeReglePonderation, defaultPonderation);
    }

    @Override
    public ArrayList<DefaultPonderation> getAll() throws SQLException {
        PonderationDAOImpl ponderationDAO = new PonderationDAOImpl();
        return ponderationDAO.getAll();
    }

    @Override
    public ObjectNode deletePonderation(int codeReglePonderation) throws SQLException {
        PonderationDAOImpl ponderationDAO = new PonderationDAOImpl();
        return ponderationDAO.deletePonderation(codeReglePonderation);
    }

    @Override
    public ArrayList<DefaultPonderation> getPonderationByCode(int codeReglePonderation) throws SQLException {
        PonderationDAOImpl ponderationDAO = new PonderationDAOImpl();
        return ponderationDAO.getPonderationByCode(codeReglePonderation);
    }

    @Override
    public boolean updatePonderation(int codeReglePonderation, int defaultPonderation) throws SQLException{
        PonderationDAOImpl ponderationDAO = new PonderationDAOImpl();
        return ponderationDAO.updatePonderation(codeReglePonderation,defaultPonderation);
    }
}
