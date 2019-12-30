package services.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.impl.SessionDAOImpl;
import dao.impl.SessionDAOImpl;
import models.Session;
import services.SessionService;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

public class SessionServiceImpl implements SessionService {
    @Override
    public boolean addSessionFodep(int sessionId, String dateSession, String status) throws SQLException {
        SessionDAOImpl session = new SessionDAOImpl();
        return session.addSessionFodep(sessionId,dateSession,status);
    }

    @Override
    public ArrayList<Session> getAll() throws SQLException {
        SessionDAOImpl SessionDAO = new SessionDAOImpl();
        return SessionDAO.getAll();
    }

    @Override
    public ArrayList<Session> getActiveSession() throws SQLException {
        SessionDAOImpl SessionDAO = new SessionDAOImpl();
        return SessionDAO.getActiveSession();
    }

    @Override
    public ObjectNode deleteSession(int idSession) throws SQLException {
        SessionDAOImpl SessionDAO = new SessionDAOImpl();
        return SessionDAO.deleteSession(idSession);
    }

    @Override
    public boolean updateSessionStatus(int sessionId, String status) throws SQLException {
        SessionDAOImpl SessionDAO = new SessionDAOImpl();
        return SessionDAO.updateSessionStatus(sessionId,status);
    }

}
