package services;

import java.sql.SQLException;

public interface CasParticulierService {
    boolean getClientele(String client_id) throws SQLException;
}
