package models;

public class ResultatModel {
    private String codeEtat;
    private String codePoste;
    private String codeAttribut;
    private String Colonne;
    private String regles;

    public String getCodeEtat() {
        return codeEtat;
    }

    public void setCodeEtat(String codeEtat) {
        this.codeEtat = codeEtat;
    }

    public String getCodePoste() {
        return codePoste;
    }

    public void setCodePoste(String codePoste) {
        this.codePoste = codePoste;
    }

    public String getCodeAttribut() {
        return codeAttribut;
    }

    public void setCodeAttribut(String codeAttribut) {
        this.codeAttribut = codeAttribut;
    }

    public String getColonne() {
        return Colonne;
    }

    public void setColonne(String colonne) {
        Colonne = colonne;
    }

    public String getRegles() {
        return regles;
    }

    public void setRegles(String regles) {
        this.regles = regles;
    }
}
