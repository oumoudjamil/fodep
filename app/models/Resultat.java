package models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Resultat {

    private String codePoste;
    private String libellePoste;
    private String codeEtat;
    private String colonne1;
    private String colonne2;
    private String colonne3;

    public String getCodePoste() {
        return codePoste;
    }

    public void setCodePoste(String codePoste) {
        this.codePoste = codePoste;
    }

    public String getLibellePoste() {
        return libellePoste;
    }

    public void setLibellePoste(String libellePoste) {
        this.libellePoste = libellePoste;
    }

    public String getCodeEtat() {
        return codeEtat;
    }

    public void setCodeEtat(String codeEtat) {
        this.codeEtat = codeEtat;
    }

    public String getColonne1() {
        return colonne1;
    }

    public void setColonne1(String colonne1) {
        this.colonne1 = colonne1;
    }

    public String getColonne2() {
        return colonne2;
    }

    public void setColonne2(String colonne2) {
        this.colonne2 = colonne2;
    }

    public String getColonne3() {
        return colonne3;
    }

    public void setColonne3(String colonne3) {
        this.colonne3 = colonne3;
    }
}
