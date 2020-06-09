package dao;

import models.Client;

import java.sql.SQLException;
import java.util.ArrayList;

public interface ClientDAO {
    ArrayList<Client> getAll() throws SQLException;

}
