package dao.impl;

import dao.DefaultDAO;
import model.Category;
import model.Recette;
import play.Logger;
import play.db.DB;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 * Created by djamil on 31/05/2017.
 */
public class CategoryDAOImpl implements DefaultDAO {
    @Override
    public ArrayList<Category> getAll() throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Category> categories = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from category ORDER BY idc DESC" );

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                Category r = new Category();
                r.setCategoryID(resultSet.getInt("idC"));
                r.setCategoryName(resultSet.getString("nameC"));
                r.setCategoryPhoto(resultSet.getString("photoC"));

                categories.add(r);
            }
            return categories;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return categories;
        }
        finally {
            c.close();
        }
    }
}
