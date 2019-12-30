package dao.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.PosteFodepDAO;
import models.PosteFodep;
import play.Logger;
import play.db.DB;
import play.libs.Json;

import java.sql.*;
import java.util.ArrayList;

public class PosteFodepDAOImpl implements PosteFodepDAO {

    @Override
    public boolean addPosteFodep(String codePoste, String libellePoste, String codeEtat) throws SQLException {


        Connection connection = DB.getConnection();

        try {
            Statement stm = null;
            int position = 0;

            stm = connection.createStatement();
            String request = "SELECT MAX(position) FROM DISPRU.POSTESFODEP";
            ResultSet resultSet = stm.executeQuery(request);
            if (resultSet.next()) {
                position=resultSet.getInt(1);
                position = position+1;
            }

            StringBuilder req =  new StringBuilder(
                " INSERT INTO DISPRU.POSTESFODEP(codeposte,libelleposte,codeetat,position) " +
                    " VALUES (?,?,?,?)");

            PreparedStatement preparedStatement = connection.prepareStatement(req.toString());
            preparedStatement.setString(1, codePoste);
            preparedStatement.setString(2, libellePoste);
            preparedStatement.setString(3, codeEtat);
            preparedStatement.setInt(4, position);
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
    public ArrayList<PosteFodep> getAll(int page, int perPage, boolean all) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<PosteFodep> postes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
            "SELECT * from dispru.postesfodep order by position" );
        if (!all) {
            if (page == 1) {
                request.append(" LIMIT ").append(perPage);
            } else if (page > -1) {
                request.append(" LIMIT ").append(perPage).append("OFFSET ")
                        .append((page - 1) * perPage);
            } else {
                request.append(" LIMIT ").append(perPage);
            }
        }
        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                PosteFodep r = new PosteFodep();
                r.setCodePoste(resultSet.getString("codeposte"));
                r.setLibellePoste(resultSet.getString("libelleposte"));
                r.setCodeEtat(resultSet.getString("codeetat"));

                postes.add(r);
            }
            return postes;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return postes;
        }
        finally {
            c.close();
        }
    }

    @Override
    public ArrayList<PosteFodep> getAllPoste() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<PosteFodep> postes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.postesfodep " );
        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                PosteFodep r = new PosteFodep();
                r.setCodePoste(resultSet.getString("codeposte"));
                r.setLibellePoste(resultSet.getString("libelleposte"));
                r.setCodeEtat(resultSet.getString("codeetat"));

                postes.add(r);
            }
            return postes;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return postes;
        }
        finally {
            c.close();
        }
    }

    @Override
    public ArrayList<PosteFodep> getAllPosteEtat(String codeEtat) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<PosteFodep> postes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.postesfodep where codeetat='"+codeEtat+"'" );
        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                PosteFodep r = new PosteFodep();
                r.setCodePoste(resultSet.getString("codeposte"));
                r.setLibellePoste(resultSet.getString("libelleposte"));
                r.setCodeEtat(resultSet.getString("codeetat"));

                postes.add(r);
            }
            return postes;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return postes;
        }
        finally {
            c.close();
        }
    }

    @Override
    public ObjectNode deletePoste(String codePoste) throws SQLException {
        Connection c = DB.getConnection();
        Statement stm = null;
        ObjectNode result = Json.newObject();

        stm = c.createStatement();
        String req = "Delete from dispru.postesfodep where codeposte='" + codePoste + "'";

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
    public ArrayList<PosteFodep> getPosteByCode(String codePoste) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<PosteFodep> etats = new ArrayList<>();
        StringBuilder request = new StringBuilder(
            "SELECT * from dispru.postesfodep where codeposte='" + codePoste + "'");

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                PosteFodep r = new PosteFodep();

                r.setCodePoste(resultSet.getString("codeposte"));
                r.setLibellePoste(resultSet.getString("libelleposte"));
                r.setCodeEtat(resultSet.getString("codeetat"));

                etats.add(r);
            }
            return etats;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return etats;
        }
        finally {
            c.close();
        }
    }


    @Override
    public boolean updatePoste(String codePoste, String libellePoste, String codeEtat) throws SQLException {
        Connection connection = DB.getConnection();
        Statement stm = null;
        stm = connection.createStatement();

        StringBuilder req =  new StringBuilder(
            "UPDATE DISPRU.POSTESFODEP SET CODEPOSTE=?,LIBELLEPOSTE=?,CODEETAT=? WHERE CODEPOSTE='" + codePoste + "'");

        PreparedStatement preparedStatement = connection.prepareStatement(req.toString());

        preparedStatement.setString(1, codePoste);
        preparedStatement.setString(2, libellePoste);
        preparedStatement.setString(3, codeEtat);

        preparedStatement .executeUpdate();

        Logger.debug("REQ " + req);

        stm.close();
        connection.close();


        return true;
    }

}
