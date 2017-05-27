package model;

/**
 * Created by djamil on 26/05/2017.
 */
public class Recette {
    int id;
    String name;
    String photo;
    String duration;
    Category category;

    public Recette() {
    }

    public Recette(int id, String name, String photo, String duration, Category category) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.duration = duration;
        this.category = category;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhoto() {
        return photo;
    }

    public String getDuration() {
        return duration;
    }

    public Category getCategory() {
        return category;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
