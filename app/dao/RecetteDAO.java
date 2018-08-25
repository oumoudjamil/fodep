package dao;

import com.fasterxml.jackson.databind.node.ObjectNode;
import model.Recette;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 27/05/2017.
 */
public interface RecetteDAO {
    ArrayList<Recette> getRecetteByCategorie(int id) throws SQLException;
    boolean addRecette(String name, String photo,
                           int duration, int category, String description,
                       String ingredien, String instruction) throws SQLException;
    ObjectNode delRecette(int id) throws SQLException;
    ArrayList<Recette> getRecettebyId(int id) throws SQLException;
}
