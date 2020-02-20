package dao.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.AttributDAO;
import models.AttributReporting;
import play.Logger;
import play.db.DB;
import play.libs.Json;

import java.sql.*;
import java.util.ArrayList;

public class AttributDAOImpl implements AttributDAO {

    @Override
    public boolean addAttribut(String codeAttribut, String libelleAttribut, String sourceValeur, String sourceDonnees,String sourceValeur2, String sourceDonnees2) throws SQLException {
        Connection connection = DB.getConnection();

        try {
        StringBuilder req =  new StringBuilder(
            " INSERT INTO DISPRU.ATTRIBUTS(codeattribut,libelleattribut,sourcevaleur,sourcedonnees,sourcevaleur2,sourcedonnees2) " +
                " VALUES (?,?,?,?,?,?)");

        PreparedStatement preparedStatement = connection.prepareStatement(req.toString());

        preparedStatement.setString(1, codeAttribut);
        preparedStatement.setString(2, libelleAttribut);
        preparedStatement.setString(3, sourceValeur);
        preparedStatement.setString(4, sourceDonnees);
        preparedStatement.setString(5, sourceValeur2);
        preparedStatement.setString(6, sourceDonnees2);

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
    public ArrayList<AttributReporting> getAll() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<AttributReporting> attributs = new ArrayList<>();
        StringBuilder request = new StringBuilder(
            "SELECT * from dispru.attributs " );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                AttributReporting r = new AttributReporting();
                r.setCodeAttribut(resultSet.getString("codeattribut"));
                r.setLibelleAttribut(resultSet.getString("libelleattribut"));
                r.setSourceValeur(resultSet.getString("sourcevaleur"));
                r.setSourceDonnees(resultSet.getString("sourcedonnees"));
                r.setSourceDonnees2(resultSet.getString("sourcedonnees2"));
                r.setSourceValeur2(resultSet.getString("sourcevaleur2"));

                attributs.add(r);
            }
            return attributs;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return attributs;
        }
        finally {
            c.close();
        }
    }

    @Override
    public ObjectNode deleteAttribut(String codeAttribut) throws SQLException {
        Connection c = DB.getConnection();
        Statement stm = null;
        ObjectNode result = Json.newObject();

        stm = c.createStatement();
        String req = "Delete from dispru.attributs where codeattribut='" + codeAttribut + "'";

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
    public ArrayList<AttributReporting> getAttributByCode(String codeAttribut) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<AttributReporting> attributs = new ArrayList<>();
        StringBuilder request = new StringBuilder(
            "SELECT * from dispru.attributs where codeattribut='" + codeAttribut + "'");

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                AttributReporting r = new AttributReporting();

                r.setCodeAttribut(resultSet.getString("codeattribut"));
                r.setLibelleAttribut(resultSet.getString("libelleattribut"));
                r.setSourceValeur(resultSet.getString("sourcevaleur"));
                r.setSourceDonnees(resultSet.getString("sourcedonnees"));
                r.setSourceDonnees2(resultSet.getString("sourcedonnees2"));
                r.setSourceValeur2(resultSet.getString("sourcevaleur2"));

                attributs.add(r);
            }
            return attributs;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return attributs;
        }
        finally {
            c.close();
        }
    }


    @Override
    public boolean updateAttribut(String codeAttribut, String libelleAttribut, String sourceValeur, String sourceDonnees) throws SQLException {
        Connection connection = DB.getConnection();
        Statement stm = null;
        stm = connection.createStatement();

        StringBuilder req =  new StringBuilder(
            "UPDATE DISPRU.ATTRIBUTS SET CODEATTRIBUT=?,LIBELLEATTRIBUT=?,SOURCEVALEUR=?,SOURCEDONNEES=? WHERE CODEATTRIBUT='" + codeAttribut + "'");

        PreparedStatement preparedStatement = connection.prepareStatement(req.toString());

        preparedStatement.setString(1, codeAttribut);
        preparedStatement.setString(2, libelleAttribut);
        preparedStatement.setString(3, sourceValeur);
        preparedStatement.setString(4, sourceDonnees);

        preparedStatement .executeUpdate();

        Logger.debug("REQ " + req);

        stm.close();
        connection.close();

        return true;
    }

    @Override
    public String getColumnsNames (String tablename) throws SQLException{
        Connection c = DB.getConnection();
        Statement statement;
        String columns = "";
        StringBuilder request = new StringBuilder(
                "SELECT COLUMN_NAME " +
                "FROM INFORMATION_SCHEMA.COLUMNS " +
                "WHERE TABLE_NAME = '"+tablename+"' " +
                "ORDER BY ORDINAL_POSITION" );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                AttributReporting r = new AttributReporting();
                String column = (resultSet.getString("column_name"));

                columns = columns+","+column;
            }
            return columns;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return columns;
        }
        finally {
            c.close();
        }
    }
}
