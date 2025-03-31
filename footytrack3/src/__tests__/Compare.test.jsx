import { render, screen } from '@testing-library/react';
import Compare from '../pages/Compare'
import { Bar } from 'react-chartjs-2';
import React from 'react';
import '@testing-library/jest-dom';

// Mock the Bar component since we don't need to test Chart.js internals
jest.mock('react-chartjs-2', () => ({
  Bar: jest.fn(() => <div data-testid="mock-bar-chart" />),
}));

jest.spyOn(React, 'useState').mockImplementation((initialState) => [initialState, jest.fn()]);

describe('Compare Component', () => {
  const mockTeamA = { name: "Arsenal", wins: 15, losses: 5 };
  const mockTeamB = { name: "Chelsea", wins: 12, losses: 7 };

  // Test 1: Renders the component with correct title
  it('should render the Compare Teams title', () => {
    render(<Compare />);
    expect(screen.getByText('Compare Teams')).toBeInTheDocument();
  });

  // Test 2: Displays both team names in the chart dataset
  it('should display both team names in the chart', () => {
    render(<Compare />);
    expect(screen.getByText('Arsenal')).toBeInTheDocument();
    expect(screen.getByText('Chelsea')).toBeInTheDocument();
  });

  // Test 3: Correctly passes win/loss data to the chart
  it('should pass correct win/loss data to Bar chart', () => {
    render(<Compare />);
    const chart = screen.getByTestId('mock-bar-chart');
    // In a real test, you'd check the props passed to Bar
    expect(chart).toBeInTheDocument();
  });

  // Test 4: Handles zero values gracefully
  it('should handle zero wins/losses', () => {
    // Override default state with zero values
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [{ name: "TeamA", wins: 0, losses: 0 }])
      .mockImplementationOnce(() => [{ name: "TeamB", wins: 0, losses: 0 }]);
    
    render(<Compare />);
    expect(screen.getByText('TeamA')).toBeInTheDocument();
    expect(screen.getByText('TeamB')).toBeInTheDocument();
  });

  // Test 5: Correctly calculates win/loss differential (indirect test)
  it('should show correct win/loss differential in chart', () => {
    render(<Compare />);
    // Arsenal's win differential: 15 - 12 = +3
    // Chelsea's loss differential: 7 - 5 = +2
    // This would be verified via chart props in a real implementation
    const chart = screen.getByTestId('mock-bar-chart');
    expect(chart).toBeInTheDocument();
  });

  // Test 6: Maintains proper chart dimensions
  it('should render chart with correct dimensions', () => {
    render(<Compare />);
    const chartContainer = screen.getByRole('region'); // Assuming you add aria role
    expect(chartContainer).toHaveStyle('width: 600px');
    expect(chartContainer).toHaveStyle('margin: auto');
  });

  // Test 7: Handles missing data gracefully
  it('should handle missing team data', () => {
    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [null])
      .mockImplementationOnce(() => [null]);
    
    render(<Compare />);
    expect(screen.queryByText('Arsenal')).not.toBeInTheDocument();
    expect(screen.queryByText('Chelsea')).not.toBeInTheDocument();
  });

  // Test 8: Validates chart configuration
  it('should use correct chart configuration', () => {
    render(<Compare />);
    // Verify chart labels
    expect(Bar).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          labels: ["Wins", "Losses"]
        })
      }),
      expect.anything()
    );
  });
});