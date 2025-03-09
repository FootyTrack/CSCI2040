package main.components;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

    public static List<Ind_stat> readIndStatsFromCSV(String filePath) {
        List<Ind_stat> indStats = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            reader.readNext();
            List<String[]> records = reader.readAll();
            for (String[] record : records) {
                String id = record[0];
                String name = record[1];
                String country = record[2];
                int appearances = Integer.parseInt(record[3]);
                int yellow_cards = Integer.parseInt(record[4]);
                int red_cards = Integer.parseInt(record[5]);
                int tackles = Integer.parseInt(record[6]);
                int interceptions = Integer.parseInt(record[7]);
                int passes = Integer.parseInt(record[8]);
                int fouls = Integer.parseInt(record[9]);
                int shots = Integer.parseInt(record[10]);

                Ind_stat indStat = new Ind_stat(id, name, country, appearances, yellow_cards, red_cards, tackles, interceptions, passes, fouls, shots);
                indStats.add(indStat);
            }
        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }
        return indStats;
    }

    @Override
    public String toString() {
        return "ID: " + id + "\nPlayer Name: " + name + "\nCountry: " + country
        + "\nAppearences: " + apperances + "\nYellow Cards:" + yellow_cards + 
        "\nRed Cards: " + red_cards + "\nTackles: " + tackles + "\nInterceptions: " 
        + interceptions + "\nPasses: " + passes + "\nFouls: " + fouls + "\nShots: " + shots;
    }
}
