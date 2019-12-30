package services;

import models.Balance;

import java.sql.SQLException;
import java.util.ArrayList;

public interface BalanceService {
    ArrayList<Balance> getAll(int page, int perPage, boolean all) throws SQLException;
}
