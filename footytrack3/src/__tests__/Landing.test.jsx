import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Landing from '../pages/Landing';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
// Mock axios
jest.mock('axios');

describe('Landing Component', () => {
  const mockMatches = [
    {
      id: 1,
      homeTeam: { name: 'Arsenal' },
      awayTeam: { name: 'Chelsea' },
      score: { fullTime: { home: 2, away: 0 } }
    },
    {
      id: 2,
      homeTeam: { name: 'Liverpool' },
      awayTeam: { name: 'Manchester City' },
      score: { fullTime: { home: 1, away: 1 } }
    },
    // Add 3 more realistic PL matches
    {
      id: 3,
      homeTeam: { name: 'Tottenham' },
      awayTeam: { name: 'Newcastle' },
      score: { fullTime: { home: 3, away: 2 } }
    },
    {
      id: 4,
      homeTeam: { name: 'Aston Villa' },
      awayTeam: { name: 'Brighton' },
      score: { fullTime: { home: 0, away: 0 } }
    },
    {
      id: 5,
      homeTeam: { name: 'West Ham' },
      awayTeam: { name: 'Brentford' },
      score: { fullTime: { home: 1, away: 2 } }
    }
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Test 1: Renders the component with correct title and subtitle
  it('displays the correct title and subtitle', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    
    expect(screen.getByText('FootyTrack')).toBeInTheDocument();
    expect(screen.getByText('Track EPL matches and stats')).toBeInTheDocument();
  });

  // Test 2: Shows "View Teams" link that navigates correctly
  it('contains a working "View Teams" link', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    
    const link = screen.getByRole('link', { name: /view teams/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/teams');
  });

  // Test 3: Displays 5 match cards when API call succeeds
  it('displays 5 match cards when data is loaded', async () => {
    axios.get.mockResolvedValue({ data: { matches: mockMatches } });
    
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    
    // Wait for data to load
    await waitFor(() => {
      const matchCards = screen.getAllByRole('heading', { level: 3 });
      expect(matchCards).toHaveLength(5);
      expect(screen.getByText('Arsenal vs Chelsea')).toBeInTheDocument();
      expect(screen.getByText('Score: 2 - 0')).toBeInTheDocument();
      expect(screen.getByText('Liverpool vs Manchester City')).toBeInTheDocument();
    });
  });

  // Test 4: Handles empty matches array
  it('handles empty matches response gracefully', async () => {
    axios.get.mockResolvedValue({ data: { matches: [] } });
    
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.queryByText(/vs/i)).not.toBeInTheDocument();
    });
  });

  // Test 5: Handles API errors gracefully
  it('handles API errors without crashing', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.queryByText(/vs/i)).not.toBeInTheDocument();
    });
  });

  // Test 6: Displays correct styling
  it('applies correct background and text colors', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    
    const hero = screen.getByRole('main');
    expect(hero).toHaveClass('has-background-purple');
    expect(screen.getByText('FootyTrack')).toHaveClass('has-text-white');
  });

  // Test 7: Displays correct score formatting
  it('formats scores correctly', async () => {
    axios.get.mockResolvedValue({ data: { matches: mockMatches } });
    
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Score: 2 - 0')).toBeInTheDocument();
      expect(screen.getByText('Score: 1 - 1')).toBeInTheDocument();
      expect(screen.getByText('Score: 0 - 0')).toBeInTheDocument();
    });
  });
});