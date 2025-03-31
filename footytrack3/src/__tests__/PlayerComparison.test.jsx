import { render, screen, fireEvent } from '@testing-library/react';
import PlayerComparison from './PlayerComparison';
import React from 'react';
// Using the exact player data provided
const mockPlayers = [
  {
    id: "2",
    name: "Gabriel Fernando de Jesus",
    goals_scored: 3,
    assists: 2,
    starts: 6,
    minutes: 600,
    yellow_cards: 4,
    red_cards: 0,
    clean_sheets: 2,
    expected_goals: 3.05,
    expected_assists: 0.52,
    total_points: 42
  },
  {
    id: "4",
    name: "Kai Havertz",
    goals_scored: 9,
    assists: 3,
    starts: 21,
    minutes: 1839,
    yellow_cards: 4,
    red_cards: 0,
    clean_sheets: 7,
    expected_goals: 9.39,
    expected_assists: 1.63,
    total_points: 96
  }
];

// Mock the component's dummy data
jest.mock('./PlayerComparison', () => {
  const originalModule = jest.requireActual('./PlayerComparison');
  return {
    ...originalModule,
    dummyPlayers: mockPlayers
  };
});

describe('PlayerComparison Component', () => {
  beforeEach(() => {
    render(<PlayerComparison />);
  });

  // Test 1: Renders basic elements
  it('renders the component title and form elements', () => {
    expect(screen.getByText('Player Comparison')).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Compare' })).toBeInTheDocument();
  });

  // Test 2: Displays both players in dropdowns
  it('populates dropdowns with both Arsenal forwards', () => {
    const selectElements = screen.getAllByRole('combobox');
    
    mockPlayers.forEach(player => {
      expect(screen.getByRole('option', { name: player.name })).toBeInTheDocument();
    });
    expect(selectElements[0]).toHaveValue('');
    expect(selectElements[1]).toHaveValue('');
  });

  // Test 3: Compares Gabriel Jesus vs Kai Havertz
  it('compares Gabriel Jesus and Kai Havertz', () => {
    const [select1, select2] = screen.getAllByRole('combobox');
    const compareButton = screen.getByRole('button', { name: 'Compare' });

    // Select players
    fireEvent.change(select1, { target: { value: 'Gabriel Fernando de Jesus' } });
    fireEvent.change(select2, { target: { value: 'Kai Havertz' } });
    fireEvent.click(compareButton);

    // Verify comparison table
    expect(screen.getByText('Comparison Results')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    // Check table headers
    expect(screen.getByText('Gabriel Fernando de Jesus')).toBeInTheDocument();
    expect(screen.getByText('Kai Havertz')).toBeInTheDocument();
    
    // Check basic stats
    expect(screen.getByText('3')).toBeInTheDocument(); // Jesus goals
    expect(screen.getByText('9')).toBeInTheDocument(); // Havertz goals
    expect(screen.getByText('2')).toBeInTheDocument(); // Jesus assists
    expect(screen.getByText('3')).toBeInTheDocument(); // Havertz assists
    
    // Check advanced metrics
    expect(screen.getByText('3.05')).toBeInTheDocument(); // Jesus xG
    expect(screen.getByText('9.39')).toBeInTheDocument(); // Havertz xG
    expect(screen.getByText('0.52')).toBeInTheDocument(); // Jesus xA
    expect(screen.getByText('1.63')).toBeInTheDocument(); // Havertz xA
    
    // Check defensive stats (both forwards)
    expect(screen.getByText('2')).toBeInTheDocument(); // Jesus clean sheets
    expect(screen.getByText('7')).toBeInTheDocument(); // Havertz clean sheets
  });

  // Test 4: Shows error when no players selected
  it('shows alert when players are not selected', () => {
    window.alert = jest.fn();
    fireEvent.click(screen.getByRole('button', { name: 'Compare' }));
    expect(window.alert).toHaveBeenCalledWith('Please select valid players for both fields.');
  });

  // Test 5: Shows error when only one player selected
  it('shows alert when only Gabriel Jesus is selected', () => {
    window.alert = jest.fn();
    const [select1] = screen.getAllByRole('combobox');
    
    fireEvent.change(select1, { target: { value: 'Gabriel Fernando de Jesus' } });
    fireEvent.click(screen.getByRole('button', { name: 'Compare' }));
    
    expect(window.alert).toHaveBeenCalledWith('Please select valid players for both fields.');
  });

  // Test 6: Handles player selection changes
  it('updates selected players when dropdown changes', () => {
    const [select1, select2] = screen.getAllByRole('combobox');
    
    fireEvent.change(select1, { target: { value: 'Gabriel Fernando de Jesus' } });
    fireEvent.change(select2, { target: { value: 'Kai Havertz' } });
    
    expect(select1).toHaveValue('Gabriel Fernando de Jesus');
    expect(select2).toHaveValue('Kai Havertz');
  });

  // Test 7: Formats minutes correctly
  it('formats minutes with commas for Havertz (1,839)', () => {
    const [select1, select2] = screen.getAllByRole('combobox');
    fireEvent.change(select1, { target: { value: 'Gabriel Fernando de Jesus' } });
    fireEvent.change(select2, { target: { value: 'Kai Havertz' } });
    fireEvent.click(screen.getByRole('button', { name: 'Compare' }));

    expect(screen.getByText('600')).toBeInTheDocument(); // Jesus minutes
    expect(screen.getByText('1,839')).toBeInTheDocument(); // Havertz minutes
  });

  // Test 8: Displays correct point totals
  it('shows FPL point totals correctly', () => {
    const [select1, select2] = screen.getAllByRole('combobox');
    fireEvent.change(select1, { target: { value: 'Gabriel Fernando de Jesus' } });
    fireEvent.change(select2, { target: { value: 'Kai Havertz' } });
    fireEvent.click(screen.getByRole('button', { name: 'Compare' }));

    expect(screen.getByText('42')).toBeInTheDocument(); // Jesus points
    expect(screen.getByText('96')).toBeInTheDocument(); // Havertz points
  });
});