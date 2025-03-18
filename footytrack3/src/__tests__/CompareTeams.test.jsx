import React from 'react';
import {useParams, MemoryRouter} from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import CompareTeams from '../pages/CompareTeams';
import teams from '../data/teams';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../data/teams', () => [
    { name: 'team1', logo: 'team1-logo.png' },
    { name: 'team2', logo: 'team2-logo.png' },
  ]);

describe('CompareTeams Component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ team1: 'team1', team2: 'team2' });
  });

  test('renders CompareTeams component', async () => {
    render(
      <MemoryRouter>
        <CompareTeams />
      </MemoryRouter>
    );
    
    // Wait for the component to finish loading
    await waitFor(() => {
        const team1Logos = screen.getAllByAltText('team1');
        const team2Logos = screen.getAllByAltText('team2');
        expect(team1Logos.length).toBeGreaterThan(0);
        expect(team2Logos.length).toBeGreaterThan(0);
      });
  
      // Check for the presence of team names
      const team1Names = screen.getAllByText(/team1/i);
      const team2Names = screen.getAllByText(/team2/i);
      expect(team1Names.length).toBeGreaterThan(0);
      expect(team2Names.length).toBeGreaterThan(0);
  });
});