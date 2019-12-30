package dao;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Role;
import models.Utilisateur;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 28/08/2018.
 */
public interface UtilisateurDAO {
    ArrayList<Utilisateur> connectUser(String login, String pwd) throws SQLException;
    ArrayList<Utilisateur> getAll(int page, int perPage, boolean all) throws SQLException;
    ObjectNode deleteUtlilisateur(int id) throws SQLException;
    ArrayList<Role> getAllRole() throws SQLException;
    boolean addUsers(String prenom, String nom, String login, String role) throws SQLException;
    ArrayList<Utilisateur> getUserById(int id) throws SQLException;
    boolean updateUser(int id,String prenom, String nom, String login, String role) throws SQLException;
    boolean updateStatut(int id,String statut) throws SQLException;
    ObjectNode deleteRole(int id) throws SQLException;
    boolean addRole(String role) throws SQLException;

}
