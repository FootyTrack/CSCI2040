import javax.swing.*;
import java.awt.*;

public class LandingPage {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(LandingPage::createAndShowGUI);
    }

    private static void createAndShowGUI() {
        JFrame frame = new JFrame("Premier League Stat Tracker");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(700, 700);
        frame.setLayout(new BorderLayout());

        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS));
        mainPanel.setBackground(new Color(30, 30, 30)); // Dark background

        JLabel titleLabel = new JLabel("Premier League Stat Tracker", SwingConstants.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        titleLabel.setForeground(Color.WHITE);
        mainPanel.add(titleLabel);

        mainPanel.add(createSection("Recent Matches", new String[]{
                "Arsenal vs Chelsea - 2-1 (Feb 24, 2025)",
                "Manchester City vs Liverpool - 1-1 (Feb 23, 2025)",
                "Tottenham vs Manchester United - 0-3 (Feb 22, 2025)"
        }));

        mainPanel.add(createSection("Top Player Stats", new String[]{
                "Erling Haaland (Manchester City) - Goals: 18 | Assists: 5",
                "Mohamed Salah (Liverpool) - Goals: 15 | Assists: 7",
                "Bukayo Saka (Arsenal) - Goals: 10 | Assists: 9"
        }));

        mainPanel.add(createSection("Player Contracts", new String[]{
                "Kevin De Bruyne (Manchester City) - Contract Until: 2026 | Salary: $20M",
                "Marcus Rashford (Manchester United) - Contract Until: 2028 | Salary: $15M",
                "Declan Rice (Arsenal) - Contract Until: 2027 | Salary: $18M"
        }));

        JScrollPane scrollPane = new JScrollPane(mainPanel);
        frame.add(scrollPane, BorderLayout.CENTER);

        frame.setVisible(true);
    }

    private static JPanel createSection(String title, String[] items) {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBorder(BorderFactory.createTitledBorder(BorderFactory.createLineBorder(Color.WHITE), title));
        panel.setBackground(new Color(50, 50, 50)); // Darker background for sections

        for (String item : items) {
            JLabel label = new JLabel(item);
            label.setForeground(Color.WHITE);
            panel.add(label);
        }

        return panel;
    }
}
