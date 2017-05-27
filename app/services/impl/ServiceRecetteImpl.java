package services.impl;

import dao.impl.RecetteDAOImpl;
import model.Recette;
import services.DefaultService;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 26/05/2017.
 */
public class ServiceRecetteImpl implements DefaultService<Recette> {

    @Override
    public ArrayList<Recette> getAllRecette() throws SQLException {
        RecetteDAOImpl recetteDAO = new RecetteDAOImpl();
        return recetteDAO.getAllRecette();
    }
}
