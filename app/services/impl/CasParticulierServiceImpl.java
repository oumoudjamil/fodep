package services.impl;

import dao.CasParticulierDAO;
import dao.impl.CasParticulierDAOImpl;
import services.CasParticulierService;

import java.sql.SQLException;

public class CasParticulierServiceImpl implements CasParticulierService {
    @Override
    public boolean getClientele(String client_id) throws SQLException {
        CasParticulierDAOImpl casParticulierDAO = new CasParticulierDAOImpl();
        return casParticulierDAO.getClientele(client_id);
    }
}
