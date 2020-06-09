package services;

import models.Client;

import java.sql.SQLException;
import java.util.ArrayList;

public interface ClientService {
    ArrayList<Client> getAll() throws SQLException;

}
