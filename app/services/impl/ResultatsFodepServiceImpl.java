package services.impl;

import dao.impl.ResultatsFodepDAOImpl;
import models.Resultat;
import services.ResultatsFodepService;

import java.sql.SQLException;
import java.util.ArrayList;

public class ResultatsFodepServiceImpl implements ResultatsFodepService {
    @Override
    public String getExpositionNette(String poste) throws SQLException {
        ResultatsFodepDAOImpl getExpNette = new ResultatsFodepDAOImpl();
        return getExpNette.getExpositionNette(poste);
    }
    @Override
    public String getResult(String codePoste, String codeEtat, String colone) throws SQLException {
        ResultatsFodepDAOImpl getResult = new ResultatsFodepDAOImpl();
        return getResult.getResult(codePoste,codeEtat,colone);
    }
    @Override
    public boolean chargeResultat(String codeEtat, String codePoste, String libellePoste , String colonne1, Double colonne2, Double colonne3, String session_id, int mnt6, int mnt7) throws SQLException {
        ResultatsFodepDAOImpl resultatsFodepDAO = new ResultatsFodepDAOImpl();
        return resultatsFodepDAO.chargeResultat(codeEtat,codePoste,libellePoste,colonne1,colonne2, colonne3,session_id,mnt6,mnt7);
    }
    @Override
    public boolean chargeTotaux(String codeEtat, String codePoste, String libellePoste , String session_id) throws SQLException {
        ResultatsFodepDAOImpl resultatsFodepDAO = new ResultatsFodepDAOImpl();
        return resultatsFodepDAO.chargeTotaux(codeEtat,codePoste,libellePoste,session_id);
    }
    @Override
    public ArrayList<Resultat> getAll(String etat) throws SQLException {
        ResultatsFodepDAOImpl getResult = new ResultatsFodepDAOImpl();
        return getResult.getAll(etat);
    }
}
