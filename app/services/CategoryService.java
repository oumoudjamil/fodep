package services;

import java.sql.SQLException;

/**
 * Created by djamil on 28/08/2018.
 */
public interface CategoryService {
    boolean addCategorie(String name, String photo) throws SQLException;
}
