package services;

import models.Resultat;

import java.sql.SQLException;
import java.util.ArrayList;

public interface ResultatsFodepService {
    String getExpositionNette(String poste) throws SQLException;
    String getResult(String codePoste, String codeEtat, String colone) throws SQLException;
    boolean chargeResultat(String codeEtat, String codePoste, String libellePoste , String colonne1, Double colonne2,Double colonne3, String session_id, Double mnt6, Double mnt7, Double mnt9) throws SQLException ;
    boolean chargeTotaux(String codeEtat, String codePoste, String libellePoste , String session_id) throws SQLException ;
    ArrayList<Resultat> getAll(String etat) throws SQLException;
}
