package dao.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.PonderationDAO;
import models.DefaultPonderation;
import play.Logger;
import play.db.DB;
import play.libs.Json;

import java.sql.*;
import java.util.ArrayList;

public class PonderationDAOImpl implements PonderationDAO {
    @Override
    public boolean addPonderation(int coderegleponderation, int ponderation_defaut) throws SQLException {


        Connection connection = DB.getConnection();

        try {
            StringBuilder req =  new StringBuilder(
                    " INSERT INTO DISPRU.reglesponderation(coderegleponderation,ponderation_defaut) " +
                            " VALUES (?,?)");

            PreparedStatement preparedStatement = connection.prepareStatement(req.toString());
            preparedStatement.setInt(1, coderegleponderation);
            preparedStatement.setInt(2, ponderation_defaut);
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
    public ArrayList<DefaultPonderation> getAll() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<DefaultPonderation> recettes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.reglesponderation " );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                DefaultPonderation r = new DefaultPonderation();
                r.setCodeReglePonderation(resultSet.getInt("coderegleponderation"));
                r.setPonderationDefaut(resultSet.getInt("ponderation_defaut"));
                recettes.add(r);
            }
            return recettes;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return recettes;
        }
        finally {
            c.close();
        }
    }

    @Override
    public ObjectNode deletePonderation(int coderegleponderation) throws SQLException {
        Connection c = DB.getConnection();
        Statement stm = null;
        ObjectNode result = Json.newObject();

        stm = c.createStatement();
        String req = "Delete from dispru.reglesponderation where coderegleponderation=" + coderegleponderation + "";

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
    public ArrayList<DefaultPonderation> getPonderationByCode(int coderegleponderation) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<DefaultPonderation> etats = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.reglesponderation where coderegleponderation=" + coderegleponderation + "");

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                DefaultPonderation r = new DefaultPonderation();

                r.setCodeReglePonderation(resultSet.getInt("coderegleponderation"));
                r.setPonderationDefaut(resultSet.getInt("ponderation_defaut"));

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
    public boolean updatePonderation(int coderegleponderation, int ponderation_defaut) throws SQLException {
        Connection connection = DB.getConnection();
        Statement stm = null;
        stm = connection.createStatement();

        StringBuilder req =  new StringBuilder(
                "UPDATE DISPRU.reglesponderation SET coderegleponderation=?,ponderation_defaut=? WHERE coderegleponderation=" + coderegleponderation + "");

        PreparedStatement preparedStatement = connection.prepareStatement(req.toString());

        preparedStatement.setInt(1, coderegleponderation);
        preparedStatement.setInt(2, ponderation_defaut);

        preparedStatement .executeUpdate();

        Logger.debug("REQ " + req);

        stm.close();
        connection.close();


        return true;
    }

}
