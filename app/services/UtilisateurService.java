package services;

import model.Utilisateur;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 30/08/2018.
 */
public interface UtilisateurService {

    ArrayList<Utilisateur> connectUser(String login, String pwd) throws SQLException;

}
