public class Ind_stat {
    private String id;
    private String name;
    private String country;

    public Ind_stat(String id, String name, String country) {
        this.id = id;
        this.name = name;
        this.country = country;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "ID: " + id + "\nPlayer Name: " + name + "\nCountry: " + country;
    }

    public static void main(String[] args) {
        Ind_stat player = new Ind_stat("101", "Mohammed Salah", "Egypt");

        System.out.println(player);

        player.setName("Ibrahima Konate");
        player.setCountry("France");

        System.out.println("\nAfter Update:");
        System.out.println(player);
    }
}
