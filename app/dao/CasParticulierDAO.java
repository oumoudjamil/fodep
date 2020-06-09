package dao;

import models.ClienteleDetail;

import java.sql.SQLException;
import java.util.ArrayList;

public interface CasParticulierDAO {
    boolean addClienteleDetail(String client_id, String nom_client, String mnt2511) throws SQLException;
    boolean getClientele(String client_id) throws SQLException;
}
