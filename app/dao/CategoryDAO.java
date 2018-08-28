package dao;

import java.sql.SQLException;

/**
 * Created by djamil on 28/08/2018.
 */
public interface CategoryDAO {
    boolean addCategorie(String name, String photo) throws SQLException;

}
