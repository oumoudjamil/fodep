package services;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by djamil on 26/05/2017.
 */
public interface DefaultService<T>{
    ArrayList<T> getAll() throws SQLException;

}
