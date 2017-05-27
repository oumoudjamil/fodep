package model;

/**
 * Created by djamil on 26/05/2017.
 */
public class Category {
    int id;
    String name;
    int photo;
    int icon;
    int recette;

    public Category(int id, String name, int photo, int icon, int recette) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.icon = icon;
        this.recette = recette;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getPhoto() {
        return photo;
    }

    public int getIcon() {
        return icon;
    }

    public int getrecette() {
        return recette;
    }
}
