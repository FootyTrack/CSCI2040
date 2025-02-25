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
