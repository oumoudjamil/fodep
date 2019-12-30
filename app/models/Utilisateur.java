package models;

public class Utilisateur {
    private int id;
    private String prenom;
    private String nom;
    private String login;
    private String password;
    private String  role;
    private int statut;

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getStatut() {
        return statut;
    }

    public void setStatut(int statut) {
        this.statut = statut;
    }

    public Utilisateur(){

    }
    public Utilisateur(String prenom, String nom, String login, String role, int statut) {
        this.prenom = prenom;
        this.nom = nom;
        this.login = login;
        this.role = role;
        this.statut = statut;
    }
}
