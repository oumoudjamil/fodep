package dao.impl;

import dao.UtilisateurDAO;
import model.Utilisateur;
import play.Logger;
import play.db.DB;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 * Created by djamil on 28/08/2018.
 */
public class UtilisateurDaoImpl implements UtilisateurDAO {

    public static String iduser = "idutilisateur";

    public static String nom = "nom";

    public static String prenom = "prenom";

    public static String login = "login";

    @Override
    public ArrayList<Utilisateur> connectUser(String login, String pwd) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        StringBuilder request = new StringBuilder("SELECT * FROM users WHERE login='"+login+"' and motdepasse='"+pwd+"'");

        statement = c.createStatement();

        ResultSet resultSet = statement.executeQuery(request.toString());
        ArrayList<Utilisateur> users = new ArrayList<>();
        try {
            statement = c.createStatement();
            resultSet = statement.executeQuery(request.toString());
            if (!resultSet.next()) {
                statement.close();
                resultSet.close();
                c.close();
                return users;
            }
            Utilisateur u = new Utilisateur();
            u.setIduser(resultSet.getString("idutilisateur"));
            u.setPrenom(resultSet.getString("prenom"));
            u.setNom(resultSet.getString("nom"));
            u.setLogin(resultSet.getString("login"));
            u.setPassword(resultSet.getString("motdepasse"));

            UtilisateurDaoImpl.login= u.getLogin();
            UtilisateurDaoImpl.iduser= u.getIduser();
            UtilisateurDaoImpl.nom=u.getNom();
            UtilisateurDaoImpl.prenom=u.getPrenom();
            users.add(u);
            statement.close();
            resultSet.close();

            Logger.info("user ",users.toString());

            return users;

        } catch (SQLException e) {
            Logger.error("error", e.getMessage());
            statement.close();
            resultSet.close();
            return users;
        } finally {
            c.close();
        }
    }
}
