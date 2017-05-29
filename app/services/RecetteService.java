package services;

import model.Recette;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 26/05/2017.
 */
public interface RecetteService {
    ArrayList<Recette> getRecetteByCategorie(int id) throws SQLException;


}
