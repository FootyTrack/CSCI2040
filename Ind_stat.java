public class Ind_stat {
    private String id;
    private String name;
    private String country;
    private int apperances;
    private int yellow_cards;
    private int red_cards;
    private int tackles;
    private int interceptions;
    private int passes;
    private int fouls;
    private int shots;



    public Ind_stat(String id, String name, String country, int apperances,
    int yellow_cards, int red_cards, int tackles, int interceptions, int passes,
    int fouls, int shots) 
    {
        this.id = id;
        this.name = name;
        this.country = country;
        this.apperances = apperances;
        this.yellow_cards = yellow_cards;
        this.red_cards = red_cards;
        this.tackles = tackles;
        this.interceptions = interceptions;
        this.passes = passes;
        this.fouls = fouls;
        this.shots = shots;
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

    public int getAppearances()
    {
        return apperances;
    }

    public int getYellowC()
    {
        return yellow_cards;
    }

    public int getRedC()
    {
        return red_cards;
    }

    public int getTackles()
    {
        return tackles;
    }

    public int getInterceptions()
    {
        return interceptions;
    }

    public int getPasses()
    {
        return passes;
    }

    public int getFouls()
    {
        return fouls;
    }

    public int getShots()
    {
        return shots;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "ID: " + id + "\nPlayer Name: " + name + "\nCountry: " + country
        + "\nAppearences: " + apperances + "\nYellow Cards:" + yellow_cards + 
        "\nRed Cards: " + red_cards + "\nTackles: " + tackles + "\nInterceptions: " 
        + interceptions + "\nPasses: " + passes + "\nFouls: " + fouls + "\nShots: " + shots;
    }

}
