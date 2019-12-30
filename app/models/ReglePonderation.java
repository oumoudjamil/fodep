package models;

public class ReglePonderation {
    private int codeReglePonderation;
    private String codeAttribut;
    private String codePoste;
    private String condition;

    public int getCodeReglePonderation() {
        return codeReglePonderation;
    }

    public void setCodeReglePonderation(int codeReglePonderation) {
        this.codeReglePonderation = codeReglePonderation;
    }

    public String getCodeAttribut() {
        return codeAttribut;
    }

    public void setCodeAttribut(String codeAttribut) {
        this.codeAttribut = codeAttribut;
    }

    public String getCodePoste() {
        return codePoste;
    }

    public void setCodePoste(String codePoste) {
        this.codePoste = codePoste;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }
}
