package dao.impl;

import dao.ClientDAO;
import models.Balance;
import models.Client;
import play.Logger;
import play.db.DB;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class ClientDAOImpl implements ClientDAO {

    @Override
    public ArrayList<Client> getAll() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Client> clients = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.client" );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                Client client = new Client();
                client.setClient_id(resultSet.getString("client_id").replaceAll("\\s", ""));
                client.setNom_client(resultSet.getString("nom_client"));
                client.setAttribut1(resultSet.getString("attribut1"));
                client.setCodeAgent(resultSet.getString("attribut2"));
                client.setSecteurAct(resultSet.getString("attribut3"));
                client.setAttribut4(resultSet.getString("attribut4"));


                clients.add(client);
            }
            return clients;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return clients;
        }
        finally {
            c.close();
        }
    }
}
