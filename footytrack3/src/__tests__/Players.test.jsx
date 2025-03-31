import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Players from './Players';
import React from 'react';
// Mock player data using Gabriel Jesus, Kai Havertz, and Jurrien Timber
jest.mock('../data/players_with_photos.json', () => [
  {
    id: "2",
    name: "Gabriel Fernando de Jesus",
    team: "Arsenal",
    position: "FWD",
    photo_path: "player_headshots\\gabriel_fernando_de_jesus_205651.png",
    goals_scored: 3,
    assists: 2,
    saves: 0,
    total_points: 42,
    clean_sheets: 2
  },
  {
    id: "4",
    name: "Kai Havertz",
    team: "Arsenal",
    position: "FWD",
    photo_path: "player_headshots\\kai_havertz_219847.png",
    goals_scored: 9,
    assists: 3,
    saves: 0,
    total_points: 96,
    clean_sheets: 7
  },
  {
    id: "6",
    name: "Jurrien Timber",
    team: "Arsenal",
    position: "DEF",
    photo_path: "player_headshots\\jurri\u00ebn_timber_445122.png",
    goals_scored: 1,
    assists: 2,
    saves: 0,
    total_points: 92,
    clean_sheets: 9,
    goals_conceded: 18
  }
]);

describe('Players Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Players />
      </MemoryRouter>
    );
  });

  // Test 1: Renders basic elements
  it('renders the component title and search input', () => {
    expect(screen.getByText('Players')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search players...')).toBeInTheDocument();
  });

  // Test 2: Displays all players initially
  it('displays all players with photos', () => {
    expect(screen.getByText('Gabriel Fernando de Jesus')).toBeInTheDocument();
    expect(screen.getByText('Kai Havertz')).toBeInTheDocument();
    expect(screen.getByText('Jurrien Timber')).toBeInTheDocument();
  });

  // Test 3: Filters players by search
  it('filters players when searching for "Timber"', () => {
    const searchInput = screen.getByPlaceholderText('Search players...');
    fireEvent.change(searchInput, { target: { value: 'Timber' } });
    
    expect(screen.getByText('Jurrien Timber')).toBeInTheDocument();
    expect(screen.queryByText('Gabriel Fernando de Jesus')).not.toBeInTheDocument();
    expect(screen.queryByText('Kai Havertz')).not.toBeInTheDocument();
  });

  // Test 4: Sorts defenders by clean sheets
  it('sorts players by clean sheets (defender first)', () => {
    const sortSelect = screen.getByLabelText('Sort By:');
    fireEvent.change(sortSelect, { target: { value: 'clean_sheets' } });
    fireEvent.click(screen.getByText('Sort Descending'));

    const playerNames = screen.getAllByText(/Gabriel|Kai|Jurrien/);
    expect(playerNames[0]).toHaveTextContent('Jurrien Timber'); // 9 clean sheets
    expect(playerNames[1]).toHaveTextContent('Kai Havertz');    // 7 clean sheets
    expect(playerNames[2]).toHaveTextContent('Gabriel Fernando de Jesus'); // 2 clean sheets
  });

  // Test 5: Sorts by total points (FPL)
  it('sorts players by total Fantasy Premier League points', () => {
    const sortSelect = screen.getByLabelText('Sort By:');
    fireEvent.change(sortSelect, { target: { value: 'total_points' } });
    fireEvent.click(screen.getByText('Sort Descending'));

    const playerNames = screen.getAllByText(/Gabriel|Kai|Jurrien/);
    expect(playerNames[0]).toHaveTextContent('Kai Havertz');      // 96 points
    expect(playerNames[1]).toHaveTextContent('Jurrien Timber');   // 92 points
    expect(playerNames[2]).toHaveTextContent('Gabriel Fernando de Jesus'); // 42 points
  });

  // Test 6: Shows correct position-specific stats
  it('displays different stats based on player position', () => {
    const timberCard = screen.getByText('Jurrien Timber').closest('.player-card');
    expect(timberCard).toContainElement(screen.getByText('DEF'));
    
    const jesusCard = screen.getByText('Gabriel Fernando de Jesus').closest('.player-card');
    expect(jesusCard).toContainElement(screen.getByText('FWD'));
  });

  // Test 7: Handles special characters in names
  it('correctly displays player with special character in name (Jurriën)', () => {
    expect(screen.getByText('Jurrien Timber')).toBeInTheDocument();
    const timberImage = screen.getByAltText('Jurrien Timber');
    expect(timberImage).toHaveAttribute('src', expect.stringContaining('jurriën_timber'));
  });

  // Test 8: Sorts by defensive stats (goals conceded)
  it('sorts defenders by goals conceded when attribute selected', () => {
    const sortSelect = screen.getByLabelText('Sort By:');
    fireEvent.change(sortSelect, { target: { value: 'goals_conceded' } });
    fireEvent.click(screen.getByText('Sort Ascending'));

    // Only Timber has goals_conceded in our test data
    const playerNames = screen.getAllByText(/Gabriel|Kai|Jurrien/);
    expect(playerNames[0]).toHaveTextContent('Jurrien Timber'); // Only defender
  });

  // Test 9: Maintains sort when switching attributes
  it('maintains descending order when changing sort attribute', () => {
    // First sort by total_points descending
    const sortSelect = screen.getByLabelText('Sort By:');
    fireEvent.change(sortSelect, { target: { value: 'total_points' } });
    fireEvent.click(screen.getByText('Sort Descending'));

    // Then switch to clean sheets (should maintain descending)
    fireEvent.change(sortSelect, { target: { value: 'clean_sheets' } });
    
    const playerNames = screen.getAllByText(/Gabriel|Kai|Jurrien/);
    expect(playerNames[0]).toHaveTextContent('Jurrien Timber'); // 9 clean sheets
    expect(playerNames[1]).toHaveTextContent('Kai Havertz');    // 7 clean sheets
  });

  // Test 10: Shows correct player card information
  it('displays correct stats for each position in cards', () => {
    const timberCard = screen.getByText('Jurrien Timber').closest('.player-card');
    expect(timberCard).toContainElement(screen.getByText('DEF'));
    expect(timberCard).toContainElement(screen.getByText('9')); // Clean sheets
    
    const havertzCard = screen.getByText('Kai Havertz').closest('.player-card');
    expect(havertzCard).toContainElement(screen.getByText('FWD'));
    expect(havertzCard).toContainElement(screen.getByText('9')); // Goals
  });
});