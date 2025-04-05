import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Teams from '../pages/Teams';

// Mock team data using the same structure as TeamPage tests
jest.mock('../data/teams', () => [
  {
    id: 1,
    name: "Manchester City",
    logo: "https://upload.wikimedia.org/wikipedia/sco/e/eb/Manchester_City_FC_badge.svg",
    founded: 1880,
    venue: "Etihad Stadium",
    wins: 28,
    draws: 5,
    losses: 5,
    points: 89
  },
  {
    id: 2,
    name: "Arsenal",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    founded: 1886,
    venue: "Emirates Stadium",
    wins: 26,
    draws: 6,
    losses: 6,
    points: 84
  },
  {
    id: 12,
    name: "Chelsea",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
    founded: 1905,
    venue: "Stamford Bridge",
    wins: 11,
    draws: 11,
    losses: 16,
    points: 44
  }
]);

describe('Teams Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Teams />
      </MemoryRouter>
    );
  });

  // Test 1: Renders basic elements
  it('renders the component title and search input', () => {
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search teams...')).toBeInTheDocument();
  });

  // Test 2: Displays all teams initially
  it('displays all teams with logos', () => {
    expect(screen.getByText('Manchester City')).toBeInTheDocument();
    expect(screen.getByText('Arsenal')).toBeInTheDocument();
    expect(screen.getByText('Chelsea')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(3);
  });

  // Test 3: Filters teams by search
  it('filters teams when searching for "Arsenal"', () => {
    const searchInput = screen.getByPlaceholderText('Search teams...');
    fireEvent.change(searchInput, { target: { value: 'Arsenal' } });
    
    expect(screen.getByText('Arsenal')).toBeInTheDocument();
    expect(screen.queryByText('Manchester City')).not.toBeInTheDocument();
    expect(screen.queryByText('Chelsea')).not.toBeInTheDocument();
  });

  // Test 4: Sorts teams by points descending
  it('sorts teams by points descending', () => {
    const sortSelect = screen.getByLabelText('Sort By:');
    fireEvent.change(sortSelect, { target: { value: 'points' } });
    fireEvent.click(screen.getByText('Sort Descending'));

    const teamNames = screen.getAllByText(/Manchester City|Arsenal|Chelsea/);
    expect(teamNames[0]).toHaveTextContent('Manchester City'); // 89 pts
    expect(teamNames[1]).toHaveTextContent('Arsenal');         // 84 pts
    expect(teamNames[2]).toHaveTextContent('Chelsea');         // 44 pts
  });

  // Test 5: Sorts teams by name ascending
  it('sorts teams by name ascending', () => {
    const sortSelect = screen.getByLabelText('Sort By:');
    fireEvent.change(sortSelect, { target: { value: 'name' } });
    fireEvent.click(screen.getByText('Sort Ascending'));

    const teamNames = screen.getAllByText(/Manchester City|Arsenal|Chelsea/);
    expect(teamNames[0]).toHaveTextContent('Arsenal');
    expect(teamNames[1]).toHaveTextContent('Chelsea');
    expect(teamNames[2]).toHaveTextContent('Manchester City');
  });

  // Test 6: Sorts teams by wins descending
  it('sorts teams by wins descending', () => {
    const sortSelect = screen.getByLabelText('Sort By:');
    fireEvent.change(sortSelect, { target: { value: 'wins' } });
    fireEvent.click(screen.getByText('Sort Descending'));

    const teamNames = screen.getAllByText(/Manchester City|Arsenal|Chelsea/);
    expect(teamNames[0]).toHaveTextContent('Manchester City'); // 28 wins
    expect(teamNames[1]).toHaveTextContent('Arsenal');         // 26 wins
    expect(teamNames[2]).toHaveTextContent('Chelsea');         // 11 wins
  });

  // Test 7: Disables sort buttons when no attribute selected
  it('disables sort buttons when no attribute selected', () => {
    expect(screen.getByText('Sort Ascending')).toBeDisabled();
    expect(screen.getByText('Sort Descending')).toBeDisabled();
    
    const sortSelect = screen.getByLabelText('Sort By:');
    fireEvent.change(sortSelect, { target: { value: 'name' } });
    
    expect(screen.getByText('Sort Ascending')).not.toBeDisabled();
    expect(screen.getByText('Sort Descending')).not.toBeDisabled();
  });

  // Test 8: Shows correct team information in cards
  it('displays correct team information in cards', () => {
    const cityCard = screen.getByText('Manchester City').closest('.team-card');
    expect(cityCard).toContainElement(screen.getByAltText('Manchester City'));
    expect(cityCard).toHaveAttribute('href', '/teams/1');
  });

  // Test 9: Handles image loading errors
  it('shows placeholder when team logo fails to load', () => {
    // Mock image onerror event
    const mockImage = screen.getByAltText('Chelsea');
    fireEvent.error(mockImage);
    
    expect(screen.getByText('C')).toBeInTheDocument(); // Initial placeholder
    expect(mockImage).not.toBeVisible();
  });

  // Test 10: Maintains sort after search
  it('maintains sort order when searching', () => {
    // First sort by points descending
    const sortSelect = screen.getByLabelText('Sort By:');
    fireEvent.change(sortSelect, { target: { value: 'points' } });
    fireEvent.click(screen.getByText('Sort Descending'));

    // Then search for London teams
    const searchInput = screen.getByPlaceholderText('Search teams...');
    fireEvent.change(searchInput, { target: { value: 'London' } });

    // Should still be sorted by points (Arsenal > Chelsea)
    const teamNames = screen.getAllByText(/Arsenal|Chelsea/);
    expect(teamNames[0]).toHaveTextContent('Arsenal');  // 84 pts
    expect(teamNames[1]).toHaveTextContent('Chelsea');  // 44 pts
  });

  // Test 11: Sorts by stadium name
  it('sorts teams by venue name', () => {
    const sortSelect = screen.getByLabelText('Sort By:');
    fireEvent.change(sortSelect, { target: { value: 'venue' } });
    fireEvent.click(screen.getByText('Sort Ascending'));

    const teamNames = screen.getAllByText(/Manchester City|Arsenal|Chelsea/);
    expect(teamNames[0]).toHaveTextContent('Arsenal');       // Emirates Stadium
    expect(teamNames[1]).toHaveTextContent('Manchester City'); // Etihad Stadium
    expect(teamNames[2]).toHaveTextContent('Chelsea');       // Stamford Bridge
  });
});

// Integration test with actual team data
describe('Teams Data Integration', () => {
  it('handles real team data structure', async () => {
    const realTeams = require('../data/teams');
    render(
      <MemoryRouter>
        <Teams />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
    });
  });
});