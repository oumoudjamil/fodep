package dao.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.ReglePonderationDAO;
import models.PisteDaudit;
import models.ReglePonderation;
import play.Logger;
import play.db.DB;
import play.libs.Json;

import java.sql.*;
import java.util.ArrayList;

public class ReglePonderationDAOImpl implements ReglePonderationDAO {

    @Override
    public boolean addReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste, String valeur, String operateur,String condition) throws SQLException {

        Connection connection = DB.getConnection();

        try {
            StringBuilder req =  new StringBuilder(
                    " INSERT INTO DISPRU.details_regle_ponderation(coderegleponderation,codeattribut,codeposte,valeur,operateur,conditions) " +
                            " VALUES (?,?,?,?,?,?)");

            PreparedStatement preparedStatement = connection.prepareStatement(req.toString());
            preparedStatement.setInt(1, codeReglePonderation);
            preparedStatement.setString(2, codeAttribut);
            preparedStatement.setString(3, codePoste);
            preparedStatement.setString(4, valeur);
            preparedStatement.setString(5, operateur);
            preparedStatement.setString(6, condition);
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
    public ArrayList<ReglePonderation> getAll(int page, int perPage, boolean all) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<ReglePonderation> recettes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.details_regle_ponderation " );
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
                ReglePonderation r = new ReglePonderation();
                r.setCodeReglePonderation(resultSet.getInt("coderegleponderation"));
                r.setCodeAttribut(resultSet.getString("codeattribut"));
                r.setCodePoste(resultSet.getString("codeposte"));
                r.setCondition(resultSet.getString("conditions"));
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
    public ObjectNode deleteReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste) throws SQLException {
        Connection c = DB.getConnection();
        Statement stm = null;
        ObjectNode result = Json.newObject();

        stm = c.createStatement();
        String req = "Delete from dispru.details_regle_ponderation where coderegleponderation=" + codeReglePonderation + " " +
                     "AND codeattribut ='"+ codeAttribut+ "' AND codeposte ='"+codePoste+"'";

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
    public ArrayList<ReglePonderation> getReglePonderationByCode(int codeReglePonderation, String codeAttribut, String codePoste) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<ReglePonderation> etats = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.details_regle_ponderation where coderegleponderation=" + codeReglePonderation + " " +
                        "AND codeattribut ='"+ codeAttribut+ "' AND codeposte ='"+codePoste+"'");

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                ReglePonderation r = new ReglePonderation();

                r.setCodeReglePonderation(resultSet.getInt("coderegleponderation"));
                r.setCodeAttribut(resultSet.getString("codeattribut"));
                r.setCodePoste(resultSet.getString("codeposte"));
                r.setCondition(resultSet.getString("conditions"));

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
    public boolean updateReglePonderation(int codeReglePonderation, String codeAttribut, String codePoste, String condition) throws SQLException {
        Connection connection = DB.getConnection();
        Statement stm = null;
        stm = connection.createStatement();

        StringBuilder req =  new StringBuilder(
                "UPDATE DISPRU.details_regle_ponderation SET conditions=? where coderegleponderation=" + codeReglePonderation + " " +
                        "AND codeattribut ='"+ codeAttribut+ "' AND codeposte ='"+codePoste+"'");

        PreparedStatement preparedStatement = connection.prepareStatement(req.toString());

        preparedStatement.setString(1, condition);

        preparedStatement .executeUpdate();

        Logger.debug("REQ " + req);

        stm.close();
        connection.close();


        return true;
    }

    @Override
    public ArrayList<PisteDaudit> getAllPiste(int page, int perPage, boolean all) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<PisteDaudit> recettes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.postesfodep p, dispru.attributs a, dispru.details_regle_ponderation d " +
                        " WHERE p.codeposte=d.codeposte AND d.codeattribut=a.codeattribut" );
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
                PisteDaudit r = new PisteDaudit();
                r.setCodePoste(resultSet.getString("codeposte"));
                r.setLibellePoste(resultSet.getString("libelleposte"));
                r.setCodeEtat(resultSet.getString("codeetat"));
                r.setSourceDonnees(resultSet.getString("sourcedonnees"));
                r.setSourceValeur(resultSet.getString("sourcevaleur"));
                r.setValeur(resultSet.getString("valeur"));
                r.setCodeAttribut(resultSet.getString("codeattribut"));
                r.setLibelleAttribut(resultSet.getString("libelleattribut"));
                r.setSourceDonnees2(resultSet.getString("sourcedonnees2"));
                r.setSourceValeur2(resultSet.getString("sourcevaleur2"));
                r.setCondition(resultSet.getString("conditions"));
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
}
