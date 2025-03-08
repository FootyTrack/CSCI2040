package main.components;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Arrays;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PlayerController {

    @GetMapping("/api/players")
    public List<Ind_stat> getPlayers() {
        return Arrays.asList(

            new Ind_stat("101", "Mohammed Salah", "Egypt", 30, 2, 0, 50, 20, 500, 10, 60),
            new Ind_stat("102", "Ibrahima Konate", "France", 25, 1, 0, 40, 15, 400, 8, 50)
        ); 
        
    }
}