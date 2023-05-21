import { render, screen, waitFor } from '@testing-library/react';
import Home from '../src/pages/index';
import * as autocomplete from '../src/lib/autocomplete';

jest.mock('next/router', () => require('next-router-mock'));

const mockAutocompleteResponse = [
    { bandName: 'Selección Natural', name: 'Random Mutations' },
    { bandName: 'Selección Natural', name: 'Biological Fitness' },
    { bandName: 'Selección Natural', name: 'Hox Genes' },
    { bandName: 'Seleccion Natural', name: 'Necton' },
    { bandName: 'Selección Natural', name: 'Geometric Animal' },
    { bandName: 'Exium', name: 'Seleccion Natural Part 2' },
    { bandName: 'Exium', name: 'Seleccion Natural Part 2 (Oscar Mulero remix)' },
];

beforeEach(() => {
    jest.spyOn(autocomplete, 'fetchSuggestions').mockImplementation(() => Promise.resolve(mockAutocompleteResponse));
});

describe('Home', () => {
    it('renders without crashing', async () => {
        render(<Home />);

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: 'Electronic Track Search' })).toBeInTheDocument();
        });

        expect(screen.getByRole('heading', { name: 'a track and DJ mix search engine' })).toBeInTheDocument();
        expect(screen.getByText(/Search for a track/)).toBeInTheDocument();
        expect(screen.getByText(/Receive release information/)).toBeInTheDocument();
        expect(screen.getByText(/Receive mixes featuring the track/)).toBeInTheDocument();

        const inputTrack = screen.getByLabelText('Track');
        const searchButton = screen.getByText('Search');
        expect(inputTrack).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });
});
