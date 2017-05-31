package dao;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 27/05/2017.
 */
public interface DefaultDAO<T> {
    ArrayList<T> getAll() throws SQLException;

}
