package main.components;
//import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class SearchFilter {
    /* public static void main(String[] args) {
        List<String> individualStats = new ArrayList<>();
        individualStats.add("Assists");
        individualStats.add("Yellow Cards");
        individualStats.add("Red Cards");
        individualStats.add("Tackles");
        individualStats.add("Interceptions");
        individualStats.add("Appearances");
        individualStats.add("Goals");
        individualStats.add("Passes");
        individualStats.add("Fouls");
        individualStats.add("Shots");

        List<String> teamStats = new ArrayList<>();
        teamStats.add("Matches Played");
        teamStats.add("Wins");
        teamStats.add("Losses");
        teamStats.add("Goals Scored");
        teamStats.add("Goals Conceded");
        teamStats.add("Clean Sheets");
        teamStats.add("Pass Accuracy");
        teamStats.add("Crosses");
        teamStats.add("Passes Per Match");
        teamStats.add("Offsides");

        String query = "Goals"; // Example search query
        List<String> filteredIndividualStats = filterItems(individualStats, query);
        List<String> filteredTeamStats = filterItems(teamStats, query);

        System.out.println("Filtered Individual Stats: " + filteredIndividualStats);
        System.out.println("Filtered Team Stats: " + filteredTeamStats);
    } */

    public static List<String> filterItems(List<String> items, String query) {
        return items.stream()
                .filter(item -> item.toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }
}
