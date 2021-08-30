// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../src/stories/SearchForm';

describe('Home', () => {
  it('Form should throw validation error', async () => {
    render(<SearchForm />);
    const form = screen.getByRole('form');
    const inputArtist = screen.getByLabelText('Artist');
    const inputTrack = screen.getByLabelText('Track');
    const searchButton = screen.getByText('Search');

    expect(form).toBeInTheDocument();
    expect(inputArtist).toBeInTheDocument();
    expect(inputTrack).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    fireEvent.input(inputArtist, { target: { value: 'Oscar Mulero' } });
    fireEvent.submit(searchButton);
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
});
