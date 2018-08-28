package dao;

import model.Utilisateur;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 28/08/2018.
 */
public interface UtilisateurDAO {
    ArrayList<Utilisateur> connectUser(String login, String pwd) throws SQLException;

}
