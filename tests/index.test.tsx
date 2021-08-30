// eslint-disable-next-line import/no-extraneous-dependencies
import {
  render, screen,
} from '@testing-library/react';
import Home from '../src/pages/index';

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: 'Electronic Track Search' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'a track and DJ mix search engine' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Search for a track/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Receive release information/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Receive mixes featuring the track/),
    ).toBeInTheDocument();

    const inputArtist = screen.getByLabelText('Artist');
    const inputTrack = screen.getByLabelText('Track');
    const searchButton = screen.getByText('Search');
    expect(inputArtist).toBeInTheDocument();
    expect(inputTrack).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
