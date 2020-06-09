package dao.impl;

import dao.CasParticulierDAO;
import play.Logger;
import play.db.DB;
import java.sql.*;

public class CasParticulierDAOImpl implements CasParticulierDAO {

    @Override
    public boolean getClientele(String client_id) throws SQLException {

        Connection c = DB.getConnection();
        Statement statement;
        StringBuilder request = new StringBuilder(
             "select c.client_id, c.nom_client, " +
             "(select sum(solde_contre_valeur) from dispru.balance where balance.client_id='"+client_id+"' and chapitre like '2511%') as Mnt2511, " +
             "(select sum(solde_contre_valeur) from dispru.balance where balance.client_id='"+client_id+"' and chapitre like '20%') as Mnt20, " +
             "(select sum(solde_contre_valeur) from dispru.balance where balance.client_id='"+client_id+"' and chapitre like '291%') as Mnt291, " +
             "(select sum(solde_contre_valeur) from dispru.balance where balance.client_id='"+client_id+"' and chapitre like '292%') as Mnt292, " +
             "(select sum(solde_contre_valeur) from dispru.balance where balance.client_id='"+client_id+"' and chapitre like '13%') as Mnt13, " +
             "(select sum(solde_contre_valeur) from dispru.balance where balance.client_id='"+client_id+"' and chapitre like '191%') as Mnt191, " +
             "(select sum(solde_contre_valeur) from dispru.balance where balance.client_id='"+client_id+"' and chapitre like '192%') as Mnt192 " +
             "from dispru.client c where c.client_id='"+client_id+"'");
        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {

                String nom_client = resultSet.getString("nom_client");
                String mnt2511 = resultSet.getString("Mnt2511");
                String mnt20 = resultSet.getString("Mnt20");
                String mnt291 = resultSet.getString("Mnt291");
                String mnt292 = resultSet.getString("Mnt292");
                String mnt13 = resultSet.getString("Mnt13");
                String mnt191 = resultSet.getString("Mnt191");
                String mnt192 = resultSet.getString("Mnt192");
                StringBuilder req = new StringBuilder(
                        "INSERT INTO DISPRU.clientele_detail(client_id,nom_client,mnt2511,mnt20,mnt291,mnt292,mnt13,mnt191,mnt192,plafond1,plafond2,totalengagement) " +
                                " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
                );

                PreparedStatement preparedStatement = c.prepareStatement(req.toString());
                preparedStatement.setString (1, client_id);
                preparedStatement.setString(2, nom_client);
                preparedStatement.setString(3, mnt2511);
                preparedStatement.setString(4, mnt20);
                preparedStatement.setString(5, mnt291);
                preparedStatement.setString(6, mnt292);
                preparedStatement.setString(7, mnt13);
                preparedStatement.setString(8, mnt191);
                preparedStatement.setString(9, mnt192);
                preparedStatement.setString(10, "-150000000");
                preparedStatement.setString(11, "-51801626");
                preparedStatement.setString(12, mnt20);

                Logger.debug("REQ " + req);

                preparedStatement.executeUpdate();




            }
            return true;
        } catch (Exception e) {
            Logger.info("messss " + e.getMessage());
            e.printStackTrace();
            return false;
        } finally {
            c.close();
        }

    }

    @Override
    public boolean addClienteleDetail(String client_id, String nom_client, String mnt2511) throws SQLException {

        Connection connection = DB.getConnection();
        Statement stm = null;
        stm = connection.createStatement();
        String req1 = "delete from dispru.clientele_detail where client_id='" + client_id + "'";
        try {
            stm.executeUpdate(req1);

            StringBuilder req = new StringBuilder(
                    "INSERT INTO DISPRU.clientele_detail(client_id,nom_client,mnt-2511) " +
                            " VALUES (?,?,?)"
            );

            PreparedStatement preparedStatement = connection.prepareStatement(req.toString());
            preparedStatement.setString (1, client_id);
            preparedStatement.setString(2, nom_client);
            preparedStatement.setString(3, mnt2511);
            preparedStatement.executeUpdate();

            return true;
        } catch (Exception e) {
            Logger.info("Message Error " + e.getMessage());
            return false;
        } finally {
            connection.close();
        }
    }


}
