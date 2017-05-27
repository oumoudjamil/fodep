package dao.impl;

import dao.DefaultDAO;
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
public class RecetteDAOImpl implements DefaultDAO {
    @Override
    public ArrayList getAllRecette() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Recette> recettes = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from recette " );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                Recette r = new Recette();
                r.setId(resultSet.getInt("id"));
                r.setName(resultSet.getString("name"));
                r.setPhoto(resultSet.getString("name"));
                r.setDuration(resultSet.getString("duration"));
                //r.setDuration(resultSet.getString("duration"));

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
