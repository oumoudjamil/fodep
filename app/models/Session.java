package models;

import java.util.Date;

public class Session {
    private int idSession;
    private String dateSession;
    private String statut;

    public int getIdSession() {
        return idSession;
    }

    public void setIdSession(int idSession) {
        this.idSession = idSession;
    }

    public String getDateSession() {
        return dateSession;
    }

    public void setDateSession(String dateSession) {
        this.dateSession = dateSession;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }
}
