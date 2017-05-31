package dao.impl;

import dao.DefaultDAO;
import dao.RecetteDAO;
import model.Recette;
import play.Logger;
import play.db.DB;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
                "SELECT * from recette, category where recette.category=category.idC " );

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
}
