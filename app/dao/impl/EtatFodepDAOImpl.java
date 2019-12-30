package dao.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.EtatFodepDAO;
import models.EtatFodep;
import play.Logger;
import play.api.db.Database;
import play.db.DB;
import play.libs.Json;
import tools.Log;

import javax.inject.Inject;
import java.sql.*;
import java.util.ArrayList;

public class EtatFodepDAOImpl implements EtatFodepDAO {

    @Override
    public boolean addEtatFodep(String codeEtat, String libelleEtat) throws SQLException {


        Connection connection = DB.getConnection();

       try {
           StringBuilder req =  new StringBuilder(
                   " INSERT INTO DISPRU.ETATSFODEP(codeetat,libelleetat) " +
                           " VALUES (?,?)");

           PreparedStatement preparedStatement = connection.prepareStatement(req.toString());
           preparedStatement.setString(1, codeEtat);
           preparedStatement.setString(2, libelleEtat);
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
    public ArrayList<EtatFodep> getAll() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<EtatFodep> recettes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.etatsfodep order by codeetat" );
        Logger.debug("request ",request.toString());
        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                EtatFodep r = new EtatFodep();
                r.setCodeEtat(resultSet.getString("codeetat"));
                r.setLibelleEtat(resultSet.getString("libelleetat"));


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
    public ArrayList<EtatFodep> getAll(int page, int perPage, boolean all) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<EtatFodep> recettes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.etatsfodep order by codeetat" );
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
        Logger.debug("request ",request.toString());
        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                EtatFodep r = new EtatFodep();
                r.setCodeEtat(resultSet.getString("codeetat"));
                r.setLibelleEtat(resultSet.getString("libelleetat"));


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
    public ObjectNode deleteEtat(String codeEtat) throws SQLException {
        Connection c = DB.getConnection();
        Statement stm = null;
        ObjectNode result = Json.newObject();

        stm = c.createStatement();
        String req = "Delete from dispru.etatsfodep where codeetat='" + codeEtat + "'";

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
    public ArrayList<EtatFodep> getEtatByCode(String codeEtat) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<EtatFodep> etats = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.etatsfodep where codeetat='" + codeEtat + "'");

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                EtatFodep r = new EtatFodep();

                r.setCodeEtat(resultSet.getString("codeetat"));
                r.setLibelleEtat(resultSet.getString("libelleetat"));

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
    public boolean updateEtat(String codeEtat, String libelleEtat) throws SQLException {
        Connection connection = DB.getConnection();
        Statement stm = null;
        stm = connection.createStatement();

        StringBuilder req =  new StringBuilder(
                "UPDATE DISPRU.ETATSFODEP SET CODEETAT=?,LIBELLEETAT=? WHERE CODEETAT='" + codeEtat + "'");

        PreparedStatement preparedStatement = connection.prepareStatement(req.toString());

        preparedStatement.setString(1, codeEtat);
        preparedStatement.setString(2, libelleEtat);

        preparedStatement .executeUpdate();

        Logger.debug("REQ " + req);

        stm.close();
        connection.close();


        return true;
    }

}
