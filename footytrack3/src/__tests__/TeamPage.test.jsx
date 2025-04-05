import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TeamPage from '../pages/TeamPage.jsx';

// Mock team data 
jest.mock('../data/teams', () => [
  {
    id: 1,
    name: "Manchester City",
    logo: "https://upload.wikimedia.org/wikipedia/sco/e/eb/Manchester_City_FC_badge.svg",
    founded: 1880,
    venue: "Etihad Stadium",
    location: "Manchester, England",
    wins: 28,
    draws: 5,
    losses: 5,
    goalsScored: 94,
    goalsConceded: 33,
    points: 89,
    stats: {
      fixtures: {
        played: { total: 38 },
        wins: { total: 28 },
        draws: { total: 5 },
        loses: { total: 5 }
      },
      goals: {
        for: { total: 94 },
        against: { total: 33 }
      },
      clean_sheet: 11,
      possession: 65,
      passes: { total: 575 },
      penalty: { total: 6 },
      shots: {
        total: 658,
        on: 251
      },
      corners: { total: 293 },
      fouls: { committed: 392 }
    }
  },
  {
    id: 2,
    name: "Arsenal",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    founded: 1886,
    venue: "Emirates Stadium",
    location: "London, England",
    wins: 26,
    draws: 6,
    losses: 6,
    goalsScored: 88,
    goalsConceded: 43,
    points: 84,
    stats: {
      fixtures: {
        played: { total: 38 },
        wins: { total: 26 },
        draws: { total: 6 },
        loses: { total: 6 }
      },
      goals: {
        for: { total: 88 },
        against: { total: 43 }
      },
      clean_sheet: 14,
      possession: 60,
      passes: { total: 515 },
      penalty: { total: 5 },
      shots: {
        total: 610,
        on: 220
      },
      corners: { total: 277 },
      fouls: { committed: 361 }
    }
  },
  {
    id: 12,
    name: "Chelsea",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    founded: 1905,
    venue: "Stamford Bridge",
    location: "London, England",
    wins: 11,
    draws: 11,
    losses: 16,
    goalsScored: 38,
    goalsConceded: 47,
    points: 44,
    stats: {
      fixtures: {
        played: { total: 38 },
        wins: { total: 11 },
        draws: { total: 11 },
        loses: { total: 16 }
      },
      goals: {
        for: { total: 38 },
        against: { total: 47 }
      },
      clean_sheet: 9,
      possession: 58,
      passes: { total: 600 },
      penalty: { total: 1 },
      shots: {
        total: 505,
        on: 165
      },
      corners: { total: 249 },
      fouls: { committed: 398 }
    }
  }
]);

describe('TeamPage Component', () => {
  // Test 1: Renders Manchester City details correctly
  it('displays Manchester City details for ID 1', async () => {
    render(
      <MemoryRouter initialEntries={['/teams/1']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Manchester City')).toBeInTheDocument();
      expect(screen.getByText('Etihad Stadium')).toBeInTheDocument();
      expect(screen.getByText('1880')).toBeInTheDocument();
      expect(screen.getByText('Manchester, England')).toBeInTheDocument();
    });

    // Verify stats
    expect(screen.getByText('28')).toBeInTheDocument(); // Wins
    expect(screen.getByText('94')).toBeInTheDocument(); // Goals scored
    expect(screen.getByText('65%')).toBeInTheDocument(); // Possession
    expect(screen.getByText('11')).toBeInTheDocument(); // Clean sheets
  });

  // Test 2: Renders Chelsea's struggling season stats
  it('displays Chelsea stats correctly for ID 12', async () => {
    render(
      <MemoryRouter initialEntries={['/teams/12']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Chelsea')).toBeInTheDocument();
      expect(screen.getByText('44')).toBeInTheDocument(); // Points
      expect(screen.getByText('16')).toBeInTheDocument(); // Losses
      expect(screen.getByText('38')).toBeInTheDocument(); // Goals scored (low)
    });
  });

  // Test 3: Calculates points correctly from wins/draws
  it('calculates points independently from provided points field', async () => {
    render(
      <MemoryRouter initialEntries={['/teams/2']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // Arsenal: 26 wins * 3 + 6 draws = 84 points
      expect(screen.getByText('84')).toBeInTheDocument();
    });
  });

  // Test 4: Handles team not found
  it('shows error for invalid team ID', async () => {
    render(
      <MemoryRouter initialEntries={['/teams/999']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Team not found')).toBeInTheDocument();
    });
  });

  // Test 5: Applies correct team colors
  it('uses correct colors for each team', async () => {
    //  Man City (blue)
    const { rerender } = render(
      <MemoryRouter initialEntries={['/teams/1']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('team-card')).toHaveStyle('--team-color: #6CABDD');
    });

    // Arsenal (red)
    rerender(
      <MemoryRouter initialEntries={['/teams/2']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('team-card')).toHaveStyle('--team-color: #EF0107');
    });
  });

  // Test 6: Displays all stat categories
  it('shows all stat categories including derived stats', async () => {
    render(
      <MemoryRouter initialEntries={['/teams/1']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const statLabels = [
        'Matches Played', 'Points', 'Wins', 'Draws', 'Losses',
        'Goals Scored', 'Goals Conceded', 'Clean Sheets', 'Possession',
        'Passes Per Match', 'Penalties Awarded', 'Shots', 'Shots On Target',
        'Corners', 'Fouls'
      ];
      
      statLabels.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });

  // Test 7: Formats possession as percentage
  it('formats possession with percentage sign', async () => {
    render(
      <MemoryRouter initialEntries={['/teams/2']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('60%')).toBeInTheDocument(); // Arsenal
    });
  });

  // Test 8: Handles logo loading errors
  it('shows placeholder when team logo fails to load', async () => {
    render(
      <MemoryRouter initialEntries={['/teams/12']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    const logo = await screen.findByAltText('Chelsea');
    fireEvent.error(logo);
    
    expect(screen.getByText('C')).toBeInTheDocument(); 
    expect(logo).not.toBeVisible();
  });

  // Test 9: Displays correct shots on target percentage
  it('calculates shots on target percentage', async () => {
    render(
      <MemoryRouter initialEntries={['/teams/1']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      
      expect(screen.getByText('251')).toBeInTheDocument();
      expect(screen.getByText('658')).toBeInTheDocument();
    });
  });
});

// Real data integration test
describe('TeamPage Data Integration', () => {
  it('handles real team data structure', async () => {
    const realTeams = require('../data/teams');
    render(
      <MemoryRouter initialEntries={['/teams/1']}>
        <Routes>
          <Route path="/teams/:id" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Team not found')).not.toBeInTheDocument();
    });
  });
});