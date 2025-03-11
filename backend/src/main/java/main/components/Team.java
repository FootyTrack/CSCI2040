package main.components;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Team {

    private String teamName;
    private int matchesPlayed;
    private int points;
    private int wins;
    private int draws;
    private int losses;
    private int goalsScored;
    private int goalsConceded;
    private int cleanSheets;
    private double possession;
    private int passesPerMatch;
    private int penaltiesAwarded;
    private int shots;
    private int shotsOnTarget;
    private int corners;
    private int fouls;

    public Team(String teamName, int matchesPlayed, int points, int wins, int draws, int losses, int goalsScored, int goalsConceded, int cleanSheets, double possession, int passesPerMatch, int penaltiesAwarded, int shots, int shotsOnTarget, int corners, int fouls){
        this.teamName = teamName;
        this.matchesPlayed = matchesPlayed;
        this.points = points;
        this.wins = wins;
        this.draws = draws;
        this.losses = losses;
        this.goalsScored = goalsScored;
        this.goalsConceded = goalsConceded;
        this.cleanSheets = cleanSheets;
        this.possession = possession;
        this.passesPerMatch = passesPerMatch;
        this.penaltiesAwarded = penaltiesAwarded;
        this.shots = shots;
        this.shotsOnTarget = shotsOnTarget;
        this.corners = corners;
        this.fouls = fouls;
    }

    public Team(String teamName) {
        this.teamName = teamName;
        this.matchesPlayed = 0;
        this.points = 0;
        this.wins = 0;
        this.draws = 0;
        this.losses = 0;
        this.goalsScored = 0;
        this.goalsConceded = 0;
        this.cleanSheets = 0;
        this.possession = 0.0;
        this.passesPerMatch = 0;
        this.penaltiesAwarded = 0;
        this.shots = 0;
        this.shotsOnTarget = 0;
        this.corners = 0;
        this.fouls = 0;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public int getMatchesPlayed() {
        return matchesPlayed;
    }

    public void setMatchesPlayed(int matchesPlayed) {
        this.matchesPlayed = matchesPlayed;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getDraws() {
        return draws;
    }

    public void setDraws(int draws) {
        this.draws = draws;
    }

    public int getLosses() {
        return losses;
    }

    public void setLosses(int losses) {
        this.losses = losses;
    }

    public int getGoalsScored() {
        return goalsScored;
    }

    public void setGoalsScored(int goalsScored) {
        this.goalsScored = goalsScored;
    }

    public int getGoalsConceded() {
        return goalsConceded;
    }

    public void setGoalsConceded(int goalsConceded) {
        this.goalsConceded = goalsConceded;
    }

    public int getCleanSheets() {
        return cleanSheets;
    }

    public void setCleanSheets(int cleanSheets) {
        this.cleanSheets = cleanSheets;
    }

    public double getPossession() {
        return possession;
    }

    public void setPossession(double possession) {
        this.possession = possession;
    }

    public int getPassesPerMatch() {
        return passesPerMatch;
    }

    public void setPassesPerMatch(int passesPerMatch) {
        this.passesPerMatch = passesPerMatch;
    }

    public int getPenaltiesAwarded() {
        return penaltiesAwarded;
    }

    public void setPenaltiesAwarded(int penaltiesAwarded) {
        this.penaltiesAwarded = penaltiesAwarded;
    }

    public int getShots() {
        return shots;
    }

    public void setShots(int shots) {
        this.shots = shots;
    }

    public int getShotsOnTarget() {
        return shotsOnTarget;
    }

    public void setShotsOnTarget(int shotsOnTarget) {
        this.shotsOnTarget = shotsOnTarget;
    }

    public int getCorners() {
        return corners;
    }

    public void setCorners(int corners) {
        this.corners = corners;
    }

    public int getFouls() {
        return fouls;
    }

    public void setFouls(int fouls) {
        this.fouls = fouls;
    }

    public static List<Team> readTeamsFromCSV(String filePath) {
        List<Team> teams = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            reader.readNext();
            List<String[]> records = reader.readAll();
            for (String[] record : records) {
                String teamName = record[0];
                int matchesPlayed = Integer.parseInt(record[1]);
                int points = Integer.parseInt(record[2]);
                int wins = Integer.parseInt(record[3]);
                int draws = Integer.parseInt(record[4]);
                int losses = Integer.parseInt(record[5]);
                int goalsScored = Integer.parseInt(record[6]);
                int goalsConceded = Integer.parseInt(record[7]);
                int cleanSheets = Integer.parseInt(record[8]);
                double possession = Double.parseDouble(record[9]);
                int passesPerMatch = Integer.parseInt(record[10]);
                int penaltiesAwarded = Integer.parseInt(record[11]);
                int shots = Integer.parseInt(record[12]);
                int shotsOnTarget = Integer.parseInt(record[13]);
                int corners = Integer.parseInt(record[14]);
                int fouls = Integer.parseInt(record[15]);

                Team team = new Team(teamName, matchesPlayed, points, wins, draws, losses, goalsScored, goalsConceded, cleanSheets, possession, passesPerMatch, penaltiesAwarded, shots, shotsOnTarget, corners, fouls);
                teams.add(team);
            }
        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }
        return teams;
    }


    public void addMatchStats(int goalsScored, int goalsConceded, boolean isWin, boolean isDraw, boolean isLoss,
                              boolean cleanSheet, double possession, int passesPerMatch, int penaltiesAwarded,
                              int shots, int shotsOnTarget, int corners, int fouls) {
        this.matchesPlayed++;
        this.goalsScored += goalsScored;
        this.goalsConceded += goalsConceded;

        if (isWin) {
            this.wins++;
            this.points += 3;
        } else if (isDraw) {
            this.draws++;
            this.points += 1;
        } else if (isLoss) {
            this.losses++;
        }

        if (cleanSheet) {
            this.cleanSheets++;
        }

        this.possession = possession;
        this.passesPerMatch = passesPerMatch;

        this.penaltiesAwarded += penaltiesAwarded;
        this.shots += shots;
        this.shotsOnTarget += shotsOnTarget;
        this.corners += corners;
        this.fouls += fouls;
    }

    public String toFormattedString() {
        return String.format(
                        "Team Stats for %s%n" +
                        "--------------------------------%n" +
                        "Matches Played:            %d%n" +
                        "Points:                    %d%n" +
                        "Record (W-D-L):            %d-%d-%d%n" +
                        "Goals Scored:              %d%n" +
                        "Goals Conceded:            %d%n" +
                        "Clean Sheets:              %d%n" +
                        "Possession:                %.1f%%%n" +
                        "Passes per Match:          %d%n" +
                        "Penalties Awarded:         %d%n" +
                        "Shots:                     %d%n" +
                        "Shots on Target:           %d%n" +
                        "Corners:                   %d%n" +
                        "Fouls:                     %d%n",
                        teamName,
                        matchesPlayed,
                        points,
                        wins, draws, losses,
                        goalsScored,goalsConceded, cleanSheets,
                        possession, passesPerMatch,
                        penaltiesAwarded, shots, shotsOnTarget,
                        corners, fouls
        );
    }

    public static void main(String[] args) {// Create a dummy team stats object for a current season
        Team team = new Team("Liverpool");

        team.addMatchStats(2, 1, true, false, false, false, 55.0, 400, 1, 10, 5, 6, 12);
        team.addMatchStats(1, 1, false, true, false, false, 52.0, 380, 0, 8, 4, 5, 14);
        team.addMatchStats(0, 3, false, false, true, true, 48.0, 651, 0, 6, 2, 4, 9);

        System.out.println(team.toFormattedString());
    }
}
