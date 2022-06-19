import com.basho.riak.client.api.RiakClient;
import com.basho.riak.client.api.commands.kv.DeleteValue;
import com.basho.riak.client.api.commands.kv.FetchValue;
import com.basho.riak.client.api.commands.kv.StoreValue;
import com.basho.riak.client.core.query.Location;
import com.basho.riak.client.core.query.Namespace;
import com.basho.riak.client.core.query.RiakObject;
import com.basho.riak.client.core.util.BinaryValue;
import org.apache.log4j.BasicConfigurator;

import java.io.PrintStream;
import java.util.concurrent.ExecutionException;

public class Main {
    private static PrintStream stream;

    public static void main(String[] args) throws Exception {
        // konfiguracja
        stream = new PrintStream("komunikaty.txt");
        BasicConfigurator.configure();
        RiakClient client = RiakClient.newClient("127.0.0.1");

        // dodawanie
        Namespace namespace = new Namespace("s25752");
        Location location = new Location(namespace, "rowerowy");
        RiakObject riakObject = new RiakObject()
                .setContentType("application/json")
                .setValue(BinaryValue.create("{\"name\":\"rowerowy\", \"location\":\"Lodz\", \"isClosed\":false, \"numberOfProducts\":15}"));

        StoreValue store = new StoreValue.Builder(riakObject).withLocation(location).build();
        StoreValue.Response response = client.execute(store);

        stream.println("Dodawanie Response: " + String.valueOf(response));
        readDatabase(client, location);

        // modyfikacja
        riakObject = new RiakObject()
                .setContentType("application/json")
                .setValue(BinaryValue.create("{\"name\":\"rowerowy_nowy\", \"location\":\"Warszawa\", \"isClosed\":true, \"numberOfProducts\":30}"));

        StoreValue update = new StoreValue.Builder(riakObject).withLocation(location).build();
        response = client.execute(update);

        stream.println("Modyfikacja Response: " + String.valueOf(response));
        readDatabase(client, location);

        // usuwanie
        DeleteValue delete = new DeleteValue.Builder(location).build();
        client.execute(delete);
        stream.println("Usuwanie");
        readDatabase(client, location);

        // zamykanie bazy i streamu
        stream.close();
        client.shutdown();
    }

    public static void readDatabase (RiakClient riakClient, Location locationKey) throws ExecutionException, InterruptedException {
        FetchValue fetchValue = new FetchValue.Builder(locationKey).build();
        FetchValue.Response res = riakClient.execute(fetchValue);

        if (res.isNotFound())
            stream.println("Nie znaleziono pliku");
        else {
            RiakObject riakObject = res.getValue(RiakObject.class);
            stream.println("Czytanie response: " + String.valueOf(riakObject.getValue()));
        }
    }
}
