package services.impl;

import dao.impl.BalanceDAOImpl;
import dao.impl.ClientDAOImpl;
import models.Balance;
import models.Client;
import services.ClientService;

import java.sql.SQLException;
import java.util.ArrayList;

public class ClientServiceImpl implements ClientService {

    @Override
    public ArrayList<Client> getAll() throws SQLException {
        ClientDAOImpl clientDAO = new ClientDAOImpl();
        return clientDAO.getAll();
    }
}
