package dao.impl;

import dao.ResultatsFodepDAO;
import models.Resultat;
import play.Logger;
import play.db.DB;
import java.sql.*;
import java.util.ArrayList;

public class ResultatsFodepDAOImpl implements ResultatsFodepDAO {

    @Override
    public String getExpositionNette(String codePoste) throws SQLException {

        Connection c = DB.getConnection();
        Statement statement;
        String result = "";
        StringBuilder request = new StringBuilder(
                "select coderegleponderation from dispru.details_regle_ponderation d " +
                        "where d.codeposte='" + codePoste + "'");
        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                result = resultSet.getString("coderegleponderation");
            }
            return result;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return result;
        } finally {
            c.close();
        }

    }

    @Override
    public String getResult(String codePoste, String codeEtat, String colone) throws SQLException {

        Connection c = DB.getConnection();
        Statement statement ;
        String result = "";

        StringBuilder request = new StringBuilder(
                "select * from dispru.reglesponderation a, dispru.details_regle_ponderation b, dispru.attributs c " +
                        "where a.coderegleponderation=b.coderegleponderation " +
                        "and b.codeattribut = c.codeattribut " +
                        "and b.estTotal = '0'" +
                        "and b.codeposte='" + codePoste + "'");
        //statement = c.createStatement();
        ResultSet resultSet = c.createStatement().executeQuery(request.toString());
        try {

            if (resultSet == null) {
                c.close();
                //statement.close();
                resultSet.close();

                return result;
            }
            while (resultSet.next()) {

                String sourceDonnees = resultSet.getString("sourcedonnees");
                String sourceDonnees2 = resultSet.getString("sourcedonnees2");
                String codeAttribut = resultSet.getString("codeattribut");
                String conditions = resultSet.getString("conditions");
                StringBuilder getAttribut;

                if (sourceDonnees2 == null || sourceDonnees2.equals("") || sourceDonnees2.isEmpty()) {

                    getAttribut = new StringBuilder("select regles " +
                            "from dispru.regle_calcul_fodep r, dispru.attributs a " +
                            "where r.codeattribut=a.codeattribut " +
                           // "and r.codeetat ='" + codeEtat + "' " +
                            "and a.sourcedonnees ='" + sourceDonnees + "' " +
                            "and a.codeattribut ='"+codeAttribut+"' "+
                            "and colonne = '" + colone + "'");

                    ResultSet resultSet3 = c.createStatement().executeQuery(getAttribut.toString());
                    while (resultSet3.next()) {
                        String regle = resultSet3.getString("regles");
                        StringBuilder request2 = new StringBuilder("select " + regle + " result " +
                                "from dispru." + sourceDonnees + " where " + conditions);



                        ResultSet resultSet2 = c.createStatement().executeQuery(request2.toString());
                        while (resultSet2.next()) {
                            result = resultSet2.getString("result");
                        }
                    }

                } else {
                    getAttribut = new StringBuilder("select regles " +
                            "from dispru.regle_calcul_fodep r, dispru.attributs a " +
                            "where r.codeattribut=a.codeattribut " +
                            //"and r.codeetat ='" + codeEtat + "' " +
                            "and a.sourcedonnees ='" + sourceDonnees + "' " +
                            "and a.sourcedonnees2 ='" + sourceDonnees2 + "' " +
                            "and a.codeattribut ='"+codeAttribut+"' "+
                            "and colonne = '" + colone + "'");

                    ResultSet resultSet3 = c.createStatement().executeQuery(getAttribut.toString());
                    if (resultSet3 != null) {
                        while (resultSet3.next()) {
                            String regle = resultSet3.getString("regles");
                            StringBuilder request2 = new StringBuilder("select " + regle + " result " +
                                    "from dispru." + sourceDonnees + ", dispru." + sourceDonnees2 +
                                    " where balance.client_id = client.client_id and " + conditions);

                            ResultSet resultSet2 = c.createStatement().executeQuery(request2.toString());
                            while (resultSet2.next()) {
                                result = resultSet2.getString("result");
                            }
                        }
                    }
                }

            }

            c.close();
            resultSet.close();
            return result;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            c.close();
            //statement.close();
            resultSet.close();
            return result;
        }
    }

    @Override
    public boolean chargeResultat(String codeEtat, String codePoste, String libellePoste, String colonne1, Double colonne2,
                                  Double colonne3, String session_id, int mnt6, Double mnt7, Double mnt9) throws SQLException {

        Connection connection = DB.getConnection();

        Statement stm = null;
        stm = connection.createStatement();
        String req1 = "delete from dispru.resultat where codeetat='" + codeEtat + "' AND codedispru='" + codePoste + "' AND session_id=" + session_id + "";
        try {
            stm.executeUpdate(req1);

            StringBuilder req = new StringBuilder(
                    "INSERT INTO DISPRU.resultat(codeetat,codedispru,poste,coeffponderation,mnt4,mnt5,session_id,mnt6,mnt7,mnt9,reference) " +
                            " VALUES (?,?,?,?,?,?,?,?,?,?,?)"
            );

            PreparedStatement preparedStatement = connection.prepareStatement(req.toString());
            preparedStatement.setString(1, codeEtat);
            preparedStatement.setString(2, codePoste);
            preparedStatement.setString(3, libellePoste);
            preparedStatement.setString(4, colonne1);
            preparedStatement.setDouble(5, colonne2);
            preparedStatement.setDouble(6, colonne3);
            preparedStatement.setInt(7, Integer.parseInt(session_id));
            preparedStatement.setInt(8, mnt6);
            preparedStatement.setDouble(9, mnt7);
            preparedStatement.setDouble(10, mnt9);
            preparedStatement.setString(11, "");
            preparedStatement.executeUpdate();

            if(codeEtat.equals("EP10"))
            Logger.debug("REQ " + req);

            return true;
        } catch (Exception e) {
            Logger.info("Message Error " + e.getMessage());
            return false;
        } finally {
            connection.close();
        }
    }

    @Override
    public boolean chargeTotaux(String codeEtat, String codePoste, String libellePoste, String session_id) throws SQLException {

        Connection connection = DB.getConnection();
        Statement statement;
        String colonne1 = "";
        Double colonne2 = 0.0;
        Statement stm = null;
        stm = connection.createStatement();
        String req1 = "delete from dispru.resultat where codeetat='" + codeEtat + "' AND codedispru='" + codePoste + "' AND session_id=" + session_id + "";
        try {
            stm.executeUpdate(req1);
            StringBuilder reqSomme1 = new StringBuilder(
                    "select sum(mnt4) sum1 from DISPRU.resultat"
            );
            StringBuilder reqSomme2 = new StringBuilder(
                    "select sum(mnt5) sum2 from DISPRU.resultat"
            );
            statement = connection.createStatement();
            ResultSet resultSet1 = statement.executeQuery(reqSomme1.toString());
            while (resultSet1.next()) {
                colonne1 = resultSet1.getString("sum1");
            }
            ResultSet resultSet2 = statement.executeQuery(reqSomme2.toString());
            while (resultSet2.next()) {
                colonne2 = resultSet2.getDouble("sum2");
            }

            StringBuilder req = new StringBuilder(
                    "INSERT INTO DISPRU.resultat(codeetat,codedispru,poste,mnt4,mnt5,session_id) " +
                            " VALUES (?,?,?,?,?,?)"
            );

            PreparedStatement preparedStatement = connection.prepareStatement(req.toString());
            preparedStatement.setString(1, codeEtat);
            preparedStatement.setString(2, codePoste);
            preparedStatement.setString(3, libellePoste);
            preparedStatement.setInt(4, Integer.parseInt(colonne1));
            preparedStatement.setDouble(5, colonne2);
            preparedStatement.setInt(6, Integer.parseInt(session_id));
            preparedStatement.executeUpdate();
            Logger.debug("REQ " + req);

            return true;
        } catch (Exception e) {
            Logger.info("Message Error " + e.getMessage());
            return false;
        } finally {
            connection.close();
        }
    }

    @Override
    public ArrayList<Resultat> getAll(String etat) throws SQLException {
        Connection c = DB.getConnection();
        Statement statement;
        ArrayList<Resultat> attributs = new ArrayList<>();
        StringBuilder request = new StringBuilder(
                "SELECT * from dispru.resultat where codeetat='" + etat + "'");

        try {
            statement = c.createStatement();
            ResultSet resultSet = statement.executeQuery(request.toString());
            while (resultSet.next()) {
                Resultat r = new Resultat();
                r.setCodeEtat(resultSet.getString("codeetat"));
                r.setCodePoste(resultSet.getString("codedispru"));
                r.setLibellePoste(resultSet.getString("poste"));
                r.setColonne2(resultSet.getString("coeffponderation"));
                r.setColonne1(resultSet.getString("mnt4"));
                r.setColonne3(resultSet.getString("mnt5"));
                r.setColonne3(resultSet.getString("session_id"));
                attributs.add(r);
            }
            return attributs;
        } catch (Exception e) {
            Logger.info("mess " + e.getMessage());
            e.printStackTrace();
            return attributs;
        } finally {
            c.close();
        }
    }
}
