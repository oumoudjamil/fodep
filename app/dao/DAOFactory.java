package dao;

import dao.impl.UtilisateurDaoImpl;

/**
 * Created by djamil on 28/08/2018.
 */
public class DAOFactory {

    private static UtilisateurDAO utilisateurDAO = null;

    public static UtilisateurDAO getUtilisateurDAO() {
        if (utilisateurDAO != null) {
            return utilisateurDAO;
        }

        utilisateurDAO = new UtilisateurDaoImpl();
        return utilisateurDAO;
    }
}
