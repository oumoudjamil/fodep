package services.impl;

import dao.impl.RecetteDAOImpl;
import dao.impl.UtilisateurDaoImpl;
import model.Utilisateur;
import services.UtilisateurService;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 30/08/2018.
 */
public class ServiceUtilisateurImpl implements UtilisateurService {

    @Override
    public ArrayList<Utilisateur> connectUser(String login, String pwd) throws SQLException {
        UtilisateurDaoImpl utilisateurDAO = new UtilisateurDaoImpl();
        return utilisateurDAO.connectUser(login,pwd);
    }
}
