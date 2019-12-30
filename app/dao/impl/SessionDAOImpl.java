package dao.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.SessionDAO;
import models.EtatFodep;
import models.Session;
import play.Logger;
import play.db.DB;
import play.libs.Json;

import java.sql.*;
import java.util.ArrayList;
import java.sql.Date;

public class SessionDAOImpl implements SessionDAO {

    @Override
    public boolean addSessionFodep(int sessionId, String dateSession , String statusSession) throws SQLException {


        Connection connection = DB.getConnection();

        try {
            StringBuilder req =  new StringBuilder(
                    " INSERT INTO DISPRU.session_fodep(session_id,date_session,status) " +
                            " VALUES (?,?,?)");

            PreparedStatement preparedStatement = connection.prepareStatement(req.toString());
            preparedStatement.setInt(1, sessionId);
            preparedStatement.setDate(2, Date.valueOf(dateSession));
            preparedStatement.setString(3, statusSession);
            preparedStatement .executeUpdate();
            Logger.debug("REQ " + req);

            connection.close();

            return true;
        }catch (Exception e){
            Logger.info("Message Error " + e.getMessage());
            return false;
        }

    }

    @Override
    public ArrayList<Session> getAll() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Session> sessions = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.session_fodep s " +
                        "order by s.date_session desc" );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                Session r = new Session();
                r.setIdSession(resultSet.getInt("session_id"));
                r.setDateSession(resultSet.getString("date_session"));
                r.setStatut(resultSet.getString("status"));

                sessions.add(r);
            }
            return sessions;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return sessions;
        }
        finally {
            c.close();
        }
    }

    @Override
    public ArrayList<Session> getActiveSession() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Session> sessions = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.session_fodep s " +
                        "where s.status='ac'" );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                Session r = new Session();
                r.setIdSession(resultSet.getInt("session_id"));
                r.setDateSession(resultSet.getString("date_session"));
                r.setStatut(resultSet.getString("status"));

                sessions.add(r);
            }
            return sessions;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return sessions;
        }
        finally {
            c.close();
        }
    }

    @Override
    public ObjectNode deleteSession(int idSession) throws SQLException {
        Connection c = DB.getConnection();
        Statement stm = null;
        ObjectNode result = Json.newObject();

        stm = c.createStatement();
        String req = "Delete from dispru.session_fodep where session_id=" + idSession + "";

        Logger.debug("REQ " + req);

        try {
            int i = stm.executeUpdate(req);

            Logger.debug("i " + i);
            if ( i>0) {
                result.put("result", "ok");
                result.put("message", "Suppression effectuee avec succees");
            }
        } catch (SQLException e) {
            Logger.error("del SQLException " + e.getMessage());
            stm.close();
            c.close();
            result.put("nok", "Une erreur s'est produite");

        } finally {
            c.close();
        }

        return result;
    }


    @Override
    public boolean updateSessionStatus(int idSession,String status) throws SQLException {
        Connection connection = DB.getConnection();
        Statement stm = null;
        stm = connection.createStatement();

        StringBuilder req =  new StringBuilder(
                "UPDATE DISPRU.session_fodep SET status=? WHERE session_id=" + idSession + "");

        PreparedStatement preparedStatement = connection.prepareStatement(req.toString());

        preparedStatement.setString(1, status);

        preparedStatement .executeUpdate();

        Logger.debug("REQ " + req);

        stm.close();
        connection.close();

        return true;
    }

}
