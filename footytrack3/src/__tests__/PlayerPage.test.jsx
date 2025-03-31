import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PlayerDetail from './PlayerDetail';
import React from 'react';
// Mock player data
jest.mock('../data/players_with_photos.json', () => [
  {
    id: "2",
    name: "Gabriel Fernando de Jesus",
    team: "Arsenal",
    position: "FWD",
    birth_date: "1997-04-03",
    photo_path: "player_headshots\\gabriel_fernando_de_jesus_205651.png",
    starts: 6,
    minutes: 600,
    goals_scored: 3,
    assists: 2,
    yellow_cards: 4,
    red_cards: 0,
    goals_conceded: 5,
    clean_sheets: 2,
    saves_per_90: 0.0,
    penalties_saved: 0,
    news: "Knee injury - Unknown return date",
    expected_goals: 3.05,
    expected_assists: 0.52,
    expected_goal_involvements: 3.57,
    total_points: 42,
    bonus: 6,
    bps: 152,
    influence: 154.4,
    creativity: 119.5,
    threat: 255.0,
    ict_index: 52.6
  },
  {
    id: "4",
    name: "Kai Havertz",
    team: "Arsenal",
    position: "FWD",
    birth_date: "1999-06-11",
    photo_path: "player_headshots\\kai_havertz_219847.png",
    starts: 21,
    minutes: 1839,
    goals_scored: 9,
    assists: 3,
    yellow_cards: 4,
    red_cards: 0,
    goals_conceded: 20,
    clean_sheets: 7,
    saves_per_90: 0.0,
    penalties_saved: 0,
    news: "Hamstring injury - Expected back 01 Jun",
    expected_goals: 9.39,
    expected_assists: 1.63,
    expected_goal_involvements: 11.02,
    total_points: 96,
    bonus: 14,
    bps: 340,
    influence: 467.2,
    creativity: 257.0,
    threat: 701.0,
    ict_index: 142.6
  }
]);

describe('PlayerDetail Component', () => {
  // Test 1: Renders Gabriel Jesus details correctly
  it('displays Gabriel Jesus details for ID 2', async () => {
    render(
      <MemoryRouter initialEntries={['/players/2']}>
        <Routes>
          <Route path="/players/:id" element={<PlayerDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Gabriel Fernando de Jesus')).toBeInTheDocument();
      expect(screen.getByText('Arsenal')).toBeInTheDocument();
      expect(screen.getByText('Forward')).toBeInTheDocument();
      expect(screen.getByText('1997-04-03')).toBeInTheDocument();
    });

    // Verify stats
    expect(screen.getByText('3')).toBeInTheDocument(); // Goals
    expect(screen.getByText('2')).toBeInTheDocument(); // Assists
    expect(screen.getByText('4')).toBeInTheDocument(); // Yellow Cards
    expect(screen.getByText('3.05')).toBeInTheDocument(); // xG
    expect(screen.getByText('0.52')).toBeInTheDocument(); // xA

    // Verify news section
    expect(screen.getByText('Latest News')).toBeInTheDocument();
    expect(screen.getByText('Knee injury - Unknown return date')).toBeInTheDocument();
  });

  // Test 2: Renders Kai Havertz details correctly
  it('displays Kai Havertz details for ID 4', async () => {
    render(
      <MemoryRouter initialEntries={['/players/4']}>
        <Routes>
          <Route path="/players/:id" element={<PlayerDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Kai Havertz')).toBeInTheDocument();
      expect(screen.getByText('Arsenal')).toBeInTheDocument();
      expect(screen.getByText('Forward')).toBeInTheDocument();
      expect(screen.getByText('1999-06-11')).toBeInTheDocument();
    });

    // Verify stats
    expect(screen.getByText('9')).toBeInTheDocument(); // Goals
    expect(screen.getByText('3')).toBeInTheDocument(); // Assists
    expect(screen.getByText('9.39')).toBeInTheDocument(); // xG
    expect(screen.getByText('1.63')).toBeInTheDocument(); // xA

    // Verify news section
    expect(screen.getByText('Hamstring injury - Expected back 01 Jun')).toBeInTheDocument();
  });

  // Test 3: Displays correct Arsenal team color
  it('applies Arsenal red color styling', async () => {
    render(
      <MemoryRouter initialEntries={['/players/2']}>
        <Routes>
          <Route path="/players/:id" element={<PlayerDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const card = screen.getByTestId('player-card');
      expect(card).toHaveStyle('--team-color: #EF0107'); // Arsenal red
    });
  });

  // Test 4: Formats minutes with commas
  it('formats minutes with commas for Gabriel Jesus (600)', async () => {
    render(
      <MemoryRouter initialEntries={['/players/2']}>
        <Routes>
          <Route path="/players/:id" element={<PlayerDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('600')).toBeInTheDocument(); // No comma needed
    });
  });

  // Test 5: Formats minutes with commas for Kai Havertz (1839)
  it('formats minutes with commas for Kai Havertz (1,839)', async () => {
    render(
      <MemoryRouter initialEntries={['/players/4']}>
        <Routes>
          <Route path="/players/:id" element={<PlayerDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('1,839')).toBeInTheDocument();
    });
  });

  // Test 6: Displays advanced metrics
  it('shows advanced metrics like xG and xA', async () => {
    render(
      <MemoryRouter initialEntries={['/players/4']}>
        <Routes>
          <Route path="/players/:id" element={<PlayerDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Expected Goals (xG)')).toBeInTheDocument();
      expect(screen.getByText('Expected Assists (xA)')).toBeInTheDocument();
      expect(screen.getByText('ICT Index')).toBeInTheDocument();
      expect(screen.getByText('142.6')).toBeInTheDocument(); // Havertz ICT
    });
  });

  // Test 7: Handles injury news differently from other news
  it('formats injury news with special styling', async () => {
    render(
      <MemoryRouter initialEntries={['/players/2']}>
        <Routes>
          <Route path="/players/:id" element={<PlayerDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const newsElement = screen.getByText('Knee injury - Unknown return date');
      expect(newsElement).toHaveClass('injury-news'); // Assuming you add this class
    });
  });
});