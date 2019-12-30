package services.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.impl.AttributDAOImpl;
import dao.impl.UtilisateurDaoImpl;
import models.Role;
import models.Utilisateur;
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
    @Override
    public ArrayList<Utilisateur> getAll(int page, int perPage, boolean all) throws SQLException {
        UtilisateurDaoImpl utilisateurDao = new UtilisateurDaoImpl();
        return utilisateurDao.getAll(page,perPage,all);
    }
    @Override
    public ObjectNode deleteUtilisateur(int id) throws SQLException {
        UtilisateurDaoImpl utilisateurDao = new UtilisateurDaoImpl();
        return utilisateurDao.deleteUtlilisateur(id);
    }
    @Override
    public ArrayList<Role> getAllRole() throws SQLException {
        UtilisateurDaoImpl utilisateurDao = new UtilisateurDaoImpl();
        return utilisateurDao.getAllRole();
    }
    @Override
    public boolean addUsers(String prenom, String nom, String login, String role) throws SQLException {
        UtilisateurDaoImpl utilisateurDao = new UtilisateurDaoImpl();
        return utilisateurDao.addUsers(prenom, nom, login, role);
    }
    @Override
    public ArrayList<Utilisateur> getUserById(int id) throws SQLException {
        UtilisateurDaoImpl utilisateurDao = new UtilisateurDaoImpl();
        return utilisateurDao.getUserById(id);
    }
    @Override
    public boolean updateUser(int id,String prenom, String nom, String login, String role) throws SQLException {
        UtilisateurDaoImpl utilisateurDao = new UtilisateurDaoImpl();
        return utilisateurDao.updateUser(id,prenom,nom,login,role);
    }

    @Override
    public boolean updateStatut(int id, String statut) throws SQLException {
        UtilisateurDaoImpl utilisateurDao = new UtilisateurDaoImpl();
        return utilisateurDao.updateStatut(id,statut);
    }

    @Override
    public ObjectNode deleteRole(int id) throws SQLException {
        UtilisateurDaoImpl utilisateurDao = new UtilisateurDaoImpl();
        return utilisateurDao.deleteRole(id);
    }

    @Override
    public boolean addRole(String role) throws SQLException {
        UtilisateurDaoImpl utilisateurDao = new UtilisateurDaoImpl();
        return utilisateurDao.addRole(role);
    }
}
