package main.components;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Arrays;
//import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {

    @GetMapping("/api/teams")
    public List<Team> getTeams() {
        return Arrays.asList(
            new Team("LiverPool", 10, 55, 2, 1, 0, 55, 20, 5, 60.0, 500, 3, 200, 100, 50, 30),
            new Team("Manchester", 10, 52, 1, 1, 0, 52, 18, 4, 58.0, 480, 2, 190, 95, 48, 28),
            new Team("Arsenal",10, 48, 0, 3, 0, 48, 22, 6, 55.0, 470, 1, 180, 90, 45, 25)
        );
    }
}