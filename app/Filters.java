import play.http.HttpFilters;
import play.mvc.EssentialFilter;

/**
 * Created by djamil on 26/05/2017.
 */
public class Filters implements HttpFilters {


    @Override
    public EssentialFilter[] filters() {
        return new EssentialFilter[0];
    }


}
