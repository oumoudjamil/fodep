package dao;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Session;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

public interface SessionDAO {
    boolean addSessionFodep(int sessionId, String dateSession, String status) throws SQLException;
    ArrayList<Session> getAll() throws SQLException;
    ArrayList<Session> getActiveSession() throws SQLException;
    ObjectNode deleteSession(int sessionId) throws SQLException;
    boolean updateSessionStatus(int sessionId, String status) throws SQLException;
}
