package dao.impl;

import com.fasterxml.jackson.databind.node.ObjectNode;
import dao.UtilisateurDAO;
import models.Role;
import models.Utilisateur;
import play.Logger;
import play.db.DB;
import play.libs.Json;

import java.sql.*;
import java.util.ArrayList;

/**
 * Created by djamil on 28/08/2018.
 */
public class UtilisateurDaoImpl implements UtilisateurDAO {

    public static String nom = "nom";

    public static String prenom = "prenom";

    public static String login = "login";

    public static String role = "role";

    @Override
    public ArrayList<Utilisateur> connectUser(String login, String pwd) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        StringBuilder request = new StringBuilder("SELECT * FROM dispru.utilisateurs WHERE statut=1 AND login='"+login+"' and password='"+pwd+"'");

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
            u.setId(resultSet.getInt("id"));
            u.setPrenom(resultSet.getString("prenom"));
            u.setNom(resultSet.getString("nom"));
            u.setLogin(resultSet.getString("login"));
            u.setPassword(resultSet.getString("password"));
            u.setRole(resultSet.getString("role"));

            UtilisateurDaoImpl.login= u.getLogin();
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

    @Override
    public ArrayList<Utilisateur> getAll(int page, int perPage, boolean all) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Utilisateur> users = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.utilisateurs u, dispru.role r where u.role=r.idrole " );
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
                Utilisateur u = new Utilisateur();
                u.setId(resultSet.getInt("id"));
                u.setPrenom(resultSet.getString("prenom"));
                u.setNom(resultSet.getString("nom"));
                u.setLogin(resultSet.getString("login"));
                u.setPassword(resultSet.getString("password"));
                u.setRole(resultSet.getString("libellerole"));
                u.setStatut(resultSet.getInt("statut"));

                users.add(u);
            }
            return users;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return users;
        }
        finally {
            c.close();
        }
    }

    @Override
    public ObjectNode deleteUtlilisateur(int id) throws SQLException {
        Connection c = DB.getConnection();
        Statement stm = null;
        ObjectNode result = Json.newObject();

        stm = c.createStatement();
        String req = "Delete from dispru.utilisateurs where id=" + id + "";

        Logger.debug("REQ " + req);

        try {
            int i = stm.executeUpdate(req);

            Logger.debug("i " + i);
            if ( i>0) {
                result.put("result", "ok");
                result.put("message", "Suppression effectuee avec succees");
            }
        } catch (SQLException e) {
            Logger.error("del SQLException " + e.getMessage());
            stm.close();
            c.close();
            result.put("nok", "Une erreur s'est produite");

        } finally {
            c.close();
        }

        return result;
    }

    @Override
    public ArrayList<Role> getAllRole() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Role> roles = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.role " );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                Role r = new Role();
                r.setIdRole(resultSet.getInt("idrole"));
                r.setLibelleRole(resultSet.getString("libellerole"));

                roles.add(r);
            }
            return roles;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return roles;
        }
        finally {
            c.close();
        }
    }

    @Override
    public boolean addUsers(String prenom, String nom, String login, String role) throws SQLException {
        Connection connection = DB.getConnection();

        try {
            Statement stm = null;

            int idUser = 0;

            stm = connection.createStatement();
            String request = "SELECT MAX(id) FROM DISPRU.UTILISATEURS";
            ResultSet resultSet = stm.executeQuery(request);
            if (resultSet.next()) {
                idUser=resultSet.getInt(1);
                idUser = idUser+1;
            }

            StringBuilder req =  new StringBuilder(
                    " INSERT INTO DISPRU.UTILISATEURS(id,prenom,nom,login,password,role) " +
                            " VALUES (?,?,?,?,?,?)");

            PreparedStatement preparedStatement = connection.prepareStatement(req.toString());
            preparedStatement.setInt(1, idUser);
            preparedStatement.setString(2, prenom);
            preparedStatement.setString(3, nom);
            preparedStatement.setString(4, login);
            preparedStatement.setString(5, "passer");
            preparedStatement.setInt(6, Integer.parseInt(role));

            preparedStatement .executeUpdate();
            Logger.debug("REQ " + req);

            connection.close();

            return true;
        }catch (Exception e){
            Logger.info("Message Error " + e.getMessage());
            return false;
        }

    }

    @Override
    public ArrayList<Utilisateur> getUserById(int id) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Utilisateur> users = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from DISPRU.UTILISATEURS where id=" + id + "");

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                Utilisateur u = new Utilisateur();

                u.setPrenom(resultSet.getString("prenom"));
                u.setNom(resultSet.getString("nom"));
                u.setLogin(resultSet.getString("login"));
                u.setRole(resultSet.getString("role"));

                users.add(u);
            }
            return users;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return users;
        }
        finally {
            c.close();
        }
    }

    @Override
    public boolean updateUser(int id,String prenom, String nom, String login, String role) throws SQLException {
        Connection connection = DB.getConnection();
        Statement stm = null;
        stm = connection.createStatement();

        StringBuilder req =  new StringBuilder(
                "UPDATE DISPRU.UTILISATEURS SET PRENOM=?,NOM=?,LOGIN=?,ROLE=? WHERE ID=" + id + "");

        PreparedStatement preparedStatement = connection.prepareStatement(req.toString());

        preparedStatement.setString(1, prenom);
        preparedStatement.setString(2, nom);
        preparedStatement.setString(3, login);
        preparedStatement.setInt(4, Integer.parseInt(role));

        preparedStatement .executeUpdate();

        Logger.debug("REQ " + req);

        stm.close();
        connection.close();


        return true;
    }

    @Override
    public boolean updateStatut(int id,String statut) throws SQLException {
        Connection connection = DB.getConnection();
        Statement stm = null;
        stm = connection.createStatement();

        StringBuilder req =  new StringBuilder(
                "UPDATE DISPRU.UTILISATEURS SET STATUT=? WHERE ID=" + id + "");

        PreparedStatement preparedStatement = connection.prepareStatement(req.toString());

        preparedStatement.setInt(1, Integer.parseInt(statut));

        preparedStatement .executeUpdate();

        Logger.debug("REQ " + req);

        stm.close();
        connection.close();


        return true;
    }
    @Override
    public ObjectNode deleteRole(int id) throws SQLException {
        Connection c = DB.getConnection();
        Statement stm = null;
        ObjectNode result = Json.newObject();

        stm = c.createStatement();
        String req = "Delete from dispru.role where idrole=" + id + "";

        Logger.debug("REQ " + req);

        try {
            int i = stm.executeUpdate(req);

            Logger.debug("i " + i);
            if ( i>0) {
                result.put("result", "ok");
                result.put("message", "Suppression effectuee avec succees");
            }
        } catch (SQLException e) {
            Logger.error("del SQLException " + e.getMessage());
            stm.close();
            c.close();
            result.put("nok", "Une erreur s'est produite");

        } finally {
            c.close();
        }

        return result;
    }

    @Override
    public boolean addRole(String role) throws SQLException {
        Connection connection = DB.getConnection();

        try {
            Statement stm = null;

            int id = 0;

            stm = connection.createStatement();
            String request = "SELECT MAX(idrole) FROM DISPRU.ROLE";
            ResultSet resultSet = stm.executeQuery(request);
            if (resultSet.next()) {
                id=resultSet.getInt(1);
                id = id+1;
            }

            StringBuilder req =  new StringBuilder(
                    " INSERT INTO DISPRU.ROLE(idrole,libellerole) " +
                            " VALUES (?,?)");

            PreparedStatement preparedStatement = connection.prepareStatement(req.toString());
            preparedStatement.setInt(1, id);
            preparedStatement.setString(2, role);

            preparedStatement .executeUpdate();
            Logger.debug("REQ " + req);

            connection.close();

            return true;
        }catch (Exception e){
            Logger.info("Message Error " + e.getMessage());
            return false;
        }

    }

}
