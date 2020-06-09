package models;

public class Client {

    private String client_id;
    private String nom_client;
    private String attribut1;
    private String codeAgent;
    private String secteurAct;
    private String attribut4;

    public String getClient_id() {
        return client_id;
    }

    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }

    public String getNom_client() {
        return nom_client;
    }

    public void setNom_client(String nom_client) {
        this.nom_client = nom_client;
    }

    public String getAttribut1() {
        return attribut1;
    }

    public void setAttribut1(String attribut1) {
        this.attribut1 = attribut1;
    }

    public String getCodeAgent() {
        return codeAgent;
    }

    public void setCodeAgent(String codeAgent) {
        this.codeAgent = codeAgent;
    }

    public String getSecteurAct() {
        return secteurAct;
    }

    public void setSecteurAct(String secteurAct) {
        this.secteurAct = secteurAct;
    }

    public String getAttribut4() {
        return attribut4;
    }

    public void setAttribut4(String attribut4) {
        this.attribut4 = attribut4;
    }
}
