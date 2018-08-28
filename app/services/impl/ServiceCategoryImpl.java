package services.impl;

import dao.impl.CategoryDAOImpl;
import dao.impl.RecetteDAOImpl;
import model.Category;
import model.Recette;
import services.CategoryService;
import services.DefaultService;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 31/05/2017.
 */
public class ServiceCategoryImpl implements CategoryService, DefaultService {

    @Override
    public ArrayList<Category> getAll() throws SQLException {
        CategoryDAOImpl categoryDAO = new CategoryDAOImpl();
        return categoryDAO.getAll();
    }

    @Override
    public boolean addCategorie(String name, String photo) throws SQLException {
        CategoryDAOImpl categoryDAO = new CategoryDAOImpl();
        return categoryDAO.addCategorie(name,photo);
    }
}
