package services.impl;

import dao.RecetteDAO;
import dao.impl.RecetteDAOImpl;
import model.Recette;
import services.DefaultService;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 26/05/2017.
 */
public class ServiceRecetteImpl implements DefaultService<Recette> , RecetteDAO{

    @Override
    public ArrayList<Recette> getAll() throws SQLException {
        RecetteDAOImpl recetteDAO = new RecetteDAOImpl();
        return recetteDAO.getAll();
    }

    @Override
    public ArrayList<Recette> getRecetteByCategorie(int id) throws SQLException {
        RecetteDAOImpl recetteDAO = new RecetteDAOImpl();
        return recetteDAO.getRecetteByCategorie(id);
    }

    @Override
    public boolean addRecette(String name, String photo, int duration, String category, String description, String ingredien, String instruction) throws SQLException {
        RecetteDAOImpl recetteDAO = new RecetteDAOImpl();
        return recetteDAO.addRecette(name,photo, duration,category,description,ingredien,instruction);
    }
}
