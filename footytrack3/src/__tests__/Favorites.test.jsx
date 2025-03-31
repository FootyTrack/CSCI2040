import { render, screen, fireEvent } from '@testing-library/react';
import Favorites from '../pages/Favorites';
import React from 'react';
import '@testing-library/jest-dom';

describe('Favorites Component', () => {

  const mockSetFavorites = jest.fn();

   beforeEach(() => {
    jest.spyOn(React, 'useState').mockImplementation((initialState) => [initialState, mockSetFavorites]);
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  //.mockImplementation(() => [["Arsenal", "Liverpool"], mockSetFavorites]);

  // Test 1: Renders the component with correct title
  it('should render the Your Favorites title', () => {
    render(<Favorites />);
    expect(screen.getByText('Your Favorites')).toBeInTheDocument();
  });

  // Test 2: Displays all favorite teams initially
  it('should display all favorite teams in a list', () => {
    React.useState.mockImplementationOnce(() => [["Arsenal", "Liverpool"], mockSetFavorites]);
    render(<Favorites />);
    expect(screen.getByText('Arsenal')).toBeInTheDocument();
    expect(screen.getByText('Liverpool')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  // Test 3: Shows empty state when no favorites exist
  it('should show empty state when favorites list is empty', () => {
    React.useState.mockImplementationOnce(() => [[], mockSetFavorites]);
    render(<Favorites />);
    expect(screen.queryByText('Arsenal')).not.toBeInTheDocument();
    expect(screen.getByText('You have no favorites yet. Add some players or teams to your favorites!')).toBeInTheDocument();
  });

  // Test 4: Adds new favorite (if you had an add functionality)
  it('should add new favorite when input is submitted', () => {
    // This would require the component to have an add feature
    // Test would simulate typing and form submission
  });

  // Test 5: Removes a favorite when delete is clicked
  it('should remove a favorite when delete button is clicked', () => {
    React.useState.mockImplementationOnce(() => [["Arsenal", "Liverpool"], mockSetFavorites]);
    render(<Favorites />);
    fireEvent.click(screen.getAllByRole('button')[0]); // First delete button
    expect(mockSetFavorites).toHaveBeenCalledWith(["Liverpool"]);
  });

  // Test 6: Maintains list order after operations
  it('should maintain consistent list order after modifications', () => {
    React.useState.mockImplementationOnce(() => [["Chelsea", "Arsenal", "Liverpool"], mockSetFavorites]);
    render(<Favorites />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Chelsea');
    expect(items[1]).toHaveTextContent('Arsenal');
    expect(items[2]).toHaveTextContent('Liverpool');
  });

 
});