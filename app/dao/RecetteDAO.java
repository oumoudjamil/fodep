package dao;

import model.Recette;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 27/05/2017.
 */
public interface RecetteDAO {
    ArrayList<Recette> getRecetteByCategorie(int id) throws SQLException;

}