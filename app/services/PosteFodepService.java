package services;

import com.fasterxml.jackson.databind.node.ObjectNode;
import models.PosteFodep;

import java.sql.SQLException;
import java.util.ArrayList;

public interface PosteFodepService {
    boolean addPosteFodep(String codePoste, String libellePoste, String codeEtat) throws SQLException;
    ArrayList<PosteFodep> getAll(int page, int perPage, boolean all) throws SQLException;
    ArrayList<PosteFodep> getAllPoste() throws SQLException;
    ObjectNode deletePoste(String codePoste) throws SQLException;
    ArrayList<PosteFodep> getPosteByCode(String codePoste) throws SQLException;
    boolean updatePoste(String codePoste, String libellePoste, String codeEtat) throws SQLException;
    public ArrayList<PosteFodep> getAllPosteEtat(String codeEtat) throws SQLException;
}
