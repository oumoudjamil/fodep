package services.impl;

import dao.impl.BalanceDAOImpl;
import models.Balance;
import models.ReglePonderation;
import services.BalanceService;

import java.sql.SQLException;
import java.util.ArrayList;

public class BalanceServiceImpl implements BalanceService {
    @Override
    public ArrayList<Balance> getAll(int page, int perPage, boolean all) throws SQLException {
        BalanceDAOImpl balanceDAO = new BalanceDAOImpl();
        return balanceDAO.getAll(page,perPage,all);
    }
}
