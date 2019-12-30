package models;

public class Balance {
    private int idSession;
    private String agence;
    private String devise;
    private String compte;
    private float solde;
    private float soldeContreValeur;
    private int taux;
    private String chapitre;
    private int client;

    public int getIdSession() {
        return idSession;
    }

    public void setIdSession(int idSession) {
        this.idSession = idSession;
    }

    public String getAgence() {
        return agence;
    }

    public void setAgence(String agence) {
        this.agence = agence;
    }

    public String getDevise() {
        return devise;
    }

    public void setDevise(String devise) {
        this.devise = devise;
    }

    public String getCompte() {
        return compte;
    }

    public void setCompte(String compte) {
        this.compte = compte;
    }

    public float getSolde() {
        return solde;
    }

    public void setSolde(float solde) {
        this.solde = solde;
    }

    public float getSoldeContreValeur() {
        return soldeContreValeur;
    }

    public void setSoldeContreValeur(float soldeContreValeur) {
        this.soldeContreValeur = soldeContreValeur;
    }

    public int getTaux() {
        return taux;
    }

    public void setTaux(int taux) {
        this.taux = taux;
    }

    public String getChapitre() {
        return chapitre;
    }

    public void setChapitre(String chapitre) {
        this.chapitre = chapitre;
    }

    public int getClient() {
        return client;
    }

    public void setClient(int client) {
        this.client = client;
    }
}
