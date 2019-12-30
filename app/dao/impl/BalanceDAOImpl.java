package dao.impl;

import dao.BalanceDAO;
import models.Balance;
import play.Logger;
import play.db.DB;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class BalanceDAOImpl implements BalanceDAO {
    @Override
    public ArrayList<Balance> getAll(int page, int perPage, boolean all) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Balance> balances = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.balance " );
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
                Balance r = new Balance();
                r.setIdSession(resultSet.getInt("session_id"));
                r.setAgence(resultSet.getString("agence"));
                r.setDevise(resultSet.getString("devise"));
                r.setCompte(resultSet.getString("compte"));
                r.setSolde(resultSet.getFloat("solde"));
                r.setSoldeContreValeur(resultSet.getFloat("solde_contre_valeur"));
                r.setTaux(resultSet.getInt("taux_dev"));
                r.setChapitre(resultSet.getString("chapitre"));
                r.setClient(resultSet.getInt("client_id"));

                balances.add(r);
            }
            return balances;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return balances;
        }
        finally {
            c.close();
        }
    }
}
