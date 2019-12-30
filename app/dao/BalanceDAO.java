package dao;

import models.Balance;

import java.sql.SQLException;
import java.util.ArrayList;

public interface BalanceDAO {
    ArrayList<Balance> getAll(int page, int perPage, boolean all) throws SQLException;
}
