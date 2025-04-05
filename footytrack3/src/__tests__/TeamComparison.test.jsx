import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import TeamComparison from '../pages/TeamComparison';

// Mock the same team data used in TeamPage tests
jest.mock('../data/teams', () => [
  {
    id: 1,
    name: "Manchester City",
    logo: "https://upload.wikimedia.org/wikipedia/sco/e/eb/Manchester_City_FC_badge.svg"
  },
  {
    id: 2,
    name: "Arsenal",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"
  },
  {
    id: 12,
    name: "Chelsea",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg"
  }
]);

// Mock react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('TeamComparison Component', () => {
  let mockNavigate;

  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Renders basic elements
  it('renders the comparison form with all controls', () => {
    render(
      <MemoryRouter>
        <TeamComparison />
      </MemoryRouter>
    );

    expect(screen.getByText('Compare Teams')).toBeInTheDocument();
    expect(screen.getAllByRole('combobox')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Compare' })).toBeInTheDocument();
  });

  // Test 2: Populates dropdowns with team names
  it('populates select dropdowns with all teams', () => {
    render(
      <MemoryRouter>
        <TeamComparison />
      </MemoryRouter>
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4); // 3 teams + default option per select
    expect(screen.getByText('Manchester City')).toBeInTheDocument();
    expect(screen.getByText('Arsenal')).toBeInTheDocument();
    expect(screen.getByText('Chelsea')).toBeInTheDocument();
  });

  // Test 3: Navigates correctly when two teams selected
  it('navigates to comparison route with selected teams', () => {
    render(
      <MemoryRouter>
        <TeamComparison />
      </MemoryRouter>
    );

    const [select1, select2] = screen.getAllByRole('combobox');
    fireEvent.change(select1, { target: { value: 'Arsenal' } });
    fireEvent.change(select2, { target: { value: 'Manchester City' } });
    fireEvent.click(screen.getByText('Compare'));

    expect(mockNavigate).toHaveBeenCalledWith('/compare/Arsenal/vs/Manchester City');
  });

  // Test 4: Shows alert when teams not selected
  it('shows alert when teams are not selected', () => {
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <TeamComparison />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Compare'));
    expect(window.alert).toHaveBeenCalledWith('Please select two teams to compare.');
  });

  // Test 5: Shows alert when only one team selected
  it('shows alert when only one team is selected', () => {
    window.alert = jest.fn();
    render(
      <MemoryRouter>
        <TeamComparison />
      </MemoryRouter>
    );

    const [select1] = screen.getAllByRole('combobox');
    fireEvent.change(select1, { target: { value: 'Chelsea' } });
    fireEvent.click(screen.getByText('Compare'));

    expect(window.alert).toHaveBeenCalledWith('Please select two teams to compare.');
  });

  // Test 6: Handles team selection changes
  it('updates selected teams when dropdowns change', () => {
    render(
      <MemoryRouter>
        <TeamComparison />
      </MemoryRouter>
    );

    const [select1, select2] = screen.getAllByRole('combobox');
    fireEvent.change(select1, { target: { value: 'Manchester City' } });
    fireEvent.change(select2, { target: { value: 'Arsenal' } });

    expect(select1).toHaveValue('Manchester City');
    expect(select2).toHaveValue('Arsenal');
  });

  // Test 7: Disables compare button when no teams selected
  it('disables compare button initially', () => {
    render(
      <MemoryRouter>
        <TeamComparison />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Compare' })).toBeDisabled();
  });

  // Test 8: Enables compare button when two teams selected
  it('enables compare button when two teams are selected', () => {
    render(
      <MemoryRouter>
        <TeamComparison />
      </MemoryRouter>
    );

    const [select1, select2] = screen.getAllByRole('combobox');
    fireEvent.change(select1, { target: { value: 'Arsenal' } });
    fireEvent.change(select2, { target: { value: 'Chelsea' } });

    expect(screen.getByRole('button', { name: 'Compare' })).not.toBeDisabled();
  });

  // Test 9: Handles same team selection
  it('allows selecting the same team for comparison', () => {
    render(
      <MemoryRouter>
        <TeamComparison />
      </MemoryRouter>
    );

    const [select1, select2] = screen.getAllByRole('combobox');
    fireEvent.change(select1, { target: { value: 'Manchester City' } });
    fireEvent.change(select2, { target: { value: 'Manchester City' } });
    fireEvent.click(screen.getByText('Compare'));

    expect(mockNavigate).toHaveBeenCalledWith('/compare/Manchester City/vs/Manchester City');
  });
});

// Integration test with actual routing
describe('TeamComparison Navigation', () => {
  it('navigates to correct comparison URL', async () => {
    render(
      <MemoryRouter initialEntries={['/compare-teams']}>
        <Routes>
          <Route path="/compare-teams" element={<TeamComparison />} />
          <Route path="/compare/:team1/vs/:team2" element={<div>Comparison Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const [select1, select2] = screen.getAllByRole('combobox');
    fireEvent.change(select1, { target: { value: 'Arsenal' } });
    fireEvent.change(select2, { target: { value: 'Chelsea' } });
    fireEvent.click(screen.getByText('Compare'));

    expect(screen.getByText('Comparison Page')).toBeInTheDocument();
  });
});

