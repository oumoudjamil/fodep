package services.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.impl.PosteFodepDAOImpl;
import models.PosteFodep;
import services.PosteFodepService;

import java.sql.SQLException;
import java.util.ArrayList;

public class PosteFodepServiceImpl implements PosteFodepService {
    @Override
    public boolean addPosteFodep(String codePoste, String libellePoste, String codeEtat) throws SQLException {
        PosteFodepDAOImpl posteFodepDAO = new PosteFodepDAOImpl();
        return posteFodepDAO.addPosteFodep(codePoste, libellePoste, codeEtat);
    }

    @Override
    public ArrayList<PosteFodep> getAll(int page, int perPage, boolean all) throws SQLException {
        PosteFodepDAOImpl posteFodepDAO = new PosteFodepDAOImpl();
        return posteFodepDAO.getAll(page,perPage,all);
    }

    @Override
    public ArrayList<PosteFodep> getAllPosteEtat(String codeEtat) throws SQLException {
        PosteFodepDAOImpl posteFodepDAO = new PosteFodepDAOImpl();
        return posteFodepDAO.getAllPosteEtat(codeEtat);
    }

    @Override
    public ArrayList<PosteFodep> getAllPoste() throws SQLException {
        PosteFodepDAOImpl posteFodepDAO = new PosteFodepDAOImpl();
        return posteFodepDAO.getAllPoste();
    }

    @Override
    public ObjectNode deletePoste(String codePoste) throws SQLException {
        PosteFodepDAOImpl posteFodepDAO = new PosteFodepDAOImpl();
        return posteFodepDAO.deletePoste(codePoste);
    }

    @Override
    public ArrayList<PosteFodep> getPosteByCode(String codePoste) throws SQLException {
        PosteFodepDAOImpl posteFodepDAO = new PosteFodepDAOImpl();
        return posteFodepDAO.getPosteByCode(codePoste);
    }

    @Override
    public boolean updatePoste(String codePoste, String libellePoste, String codeEtat) throws SQLException{
        PosteFodepDAOImpl posteFodepDAO = new PosteFodepDAOImpl();
        return posteFodepDAO.updatePoste(codePoste,libellePoste,codeEtat);
    }
}
