package dao.impl;

import dao.CategoryDAO;
import dao.DefaultDAO;
import model.Category;
import model.Recette;
import play.Logger;
import play.db.DB;

import java.sql.*;
import java.util.ArrayList;

/**
 * Created by djamil on 31/05/2017.
 */
public class CategoryDAOImpl implements CategoryDAO, DefaultDAO {
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

    @Override
    public boolean addCategorie(String name, String photo) throws SQLException {
        Connection connection = DB.getConnection();
        Statement stm = null;

        int idRecette = 0;

        stm = connection.createStatement();
        String request = "SELECT MAX(id) FROM category";
        ResultSet resultSet = stm.executeQuery(request);
        if (resultSet.next()) {
            idRecette=resultSet.getInt(1);
            idRecette = idRecette+1;
        }

         StringBuilder req =  new StringBuilder(
                " INSERT INTO CATEGORY(IDC,NAMEC,PHOTOC) " +
                        " VALUES (?,?,?)");

        PreparedStatement preparedStatement = connection.prepareStatement(req.toString());

        preparedStatement.setInt(1, idRecette);
        preparedStatement.setString(2, name);
        preparedStatement.setString(3, photo);

        preparedStatement .executeUpdate();

        Logger.debug("REQ " + req);

        stm.close();
        connection.close();


        return true;
    }
}
