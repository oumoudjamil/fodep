package dao.impl;

import dao.DefaultDAO;
import dao.RecetteDAO;
import model.Recette;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import play.Logger;
import play.db.DB;

import java.sql.*;
import java.util.ArrayList;

/**
 * Created by djamil on 27/05/2017.
 */
public class RecetteDAOImpl implements DefaultDAO, RecetteDAO {
    @Override
    public ArrayList<Recette> getAll() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Recette> recettes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from recette, category where recette.category=category.idC ORDER BY id DESC" );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                Recette r = new Recette();
                r.setId(resultSet.getInt("id"));
                r.setName(resultSet.getString("name"));
                r.setPhoto(resultSet.getString("photo"));
                r.setDuration(resultSet.getString("duration"));
                r.setDescription(resultSet.getString("description"));
                r.setIngredien(resultSet.getString("ingredien"));
                r.setInstruction(resultSet.getString("instruction"));
                r.setVideo(resultSet.getString("video"));
                r.setIdRecette(resultSet.getString("idRecette"));
                r.setCategoryID(resultSet.getInt("idC"));
                r.setCategoryName(resultSet.getString("nameC"));
                r.setCategoryPhoto(resultSet.getString("photoC"));

                recettes.add(r);
            }
            return recettes;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return recettes;
        }
        finally {
            c.close();
        }
    }

    @Override
    public ArrayList<Recette> getRecetteByCategorie(int id) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Recette> recettes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from recette, category WHERE recette.category=category.idC AND recette.category="+id );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                Recette r = new Recette();
                r.setId(resultSet.getInt("id"));
                r.setName(resultSet.getString("name"));
                r.setPhoto(resultSet.getString("photo"));
                r.setDuration(resultSet.getString("duration"));
                r.setDescription(resultSet.getString("description"));
                r.setIngredien(resultSet.getString("ingredien"));
                r.setInstruction(resultSet.getString("instruction"));
                r.setVideo(resultSet.getString("video"));
                r.setIdRecette(resultSet.getString("idRecette"));
                r.setCategoryID(resultSet.getInt("idC"));
                r.setCategoryName(resultSet.getString("nameC"));
                r.setCategoryPhoto(resultSet.getString("photoC"));

                recettes.add(r);
            }
            return recettes;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return recettes;
        }
        finally {
            c.close();
        }
    }

    @Override
    public boolean addRecette(String name, String photo, String duration, String category, String description,
                              String ingredien, String instruction) throws SQLException {
        Connection connection = DB.getConnection();
        Statement stm = null;

        int idRecette = 0;

        String req;

        stm = connection.createStatement();
        String request = "SELECT MAX(id) FROM recette";
        ResultSet resultSet = stm.executeQuery(request);
        if (resultSet.next()) {
            idRecette=resultSet.getInt(1);
            idRecette = idRecette+1;
        }

        req = "INSERT INTO RECETTE(ID,NAME,PHOTO,DURATION,CATEGORY,DESCRIPTION,INGREDIEN,INSTRUCTION)" +
                " VALUES ('"+ idRecette + "','" + name + "' ,'" + photo +"' ,' " + duration +
                "' ,'" + category +"' ,'" + description+"' ,'" + ingredien +"' ,'" + instruction +"')";

        /**req =   " INSERT INTO RECETTE(ID,NAME,PHOTO,DURATION,CATEGORY,INGREDIEN,INSTRUCTION) " +
                " VALUES (?,?,?,?,?,?,?,?)";

        preparedStatement = connection.prepareStatement(req);
        preparedStatement.setInt(1, idRecette);
        preparedStatement.setString(2, name);
        preparedStatement.setString(3, photo);
        preparedStatement.setInt(4, duration);
        preparedStatement.setString(5, category);
        preparedStatement.setString(6, ingredien);
        preparedStatement.setString(7, instruction);

        preparedStatement .executeUpdate();*/

        Logger.debug("REQ " + req);
        try {
            int retour = stm.executeUpdate(req);
            if (retour == 0) {
                Logger.info("RETOUR ==> " + retour);
                return false;
            }
            Logger.info("RETOUR STATEMENT ==> " + retour);
            Logger.info("req ==> " + req);

        } catch (SQLException e) {
            Logger.error("newUser SQLException " + e.getMessage());
            return false;
        } finally {
            try {
                stm.close();
                connection.close();

            } catch (SQLException e) {
                Logger.error("SQLExeption " + e.getMessage());
            }
        }
        return true;
    }



}
