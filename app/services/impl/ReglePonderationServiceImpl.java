package services.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.impl.ReglePonderationDAOImpl;
import models.ReglePonderation;
import services.ReglePonderationService;

import java.sql.SQLException;
import java.util.ArrayList;

public class ReglePonderationServiceImpl implements ReglePonderationService {
    @Override
    public boolean addReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste, String condition) throws SQLException {
        ReglePonderationDAOImpl ponderationDAO = new ReglePonderationDAOImpl();
        return ponderationDAO.addReglePonderation(codeReglePonderation, codeAttribut,codePoste,condition);
    }

    @Override
    public ArrayList<ReglePonderation> getAll(int page, int perPage, boolean all) throws SQLException {
        ReglePonderationDAOImpl ponderationDAO = new ReglePonderationDAOImpl();
        return ponderationDAO.getAll(page,perPage,all);
    }

    @Override
    public ObjectNode deleteReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste) throws SQLException {
        ReglePonderationDAOImpl ponderationDAO = new ReglePonderationDAOImpl();
        return ponderationDAO.deleteReglePonderation(codeReglePonderation,codeAttribut,codePoste);
    }

    @Override
    public ArrayList<ReglePonderation> getReglePonderationByCode(int codeReglePonderation, String codeAttribut, String codePoste) throws SQLException {
        ReglePonderationDAOImpl ponderationDAO = new ReglePonderationDAOImpl();
        return ponderationDAO.getReglePonderationByCode(codeReglePonderation,codeAttribut,codePoste);
    }

    @Override
    public boolean updateReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste, String condition) throws SQLException{
        ReglePonderationDAOImpl ponderationDAO = new ReglePonderationDAOImpl();
        return ponderationDAO.updateReglePonderation(codeReglePonderation,codeAttribut,codePoste,condition);
    }
}
