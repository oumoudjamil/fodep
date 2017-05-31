package services.impl;

import dao.impl.CategoryDAOImpl;
import dao.impl.RecetteDAOImpl;
import model.Category;
import model.Recette;
import services.DefaultService;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 31/05/2017.
 */
public class ServiceCategoryImpl implements DefaultService {

    @Override
    public ArrayList<Category> getAll() throws SQLException {
        CategoryDAOImpl categoryDAO = new CategoryDAOImpl();
        return categoryDAO.getAll();
    }
}
