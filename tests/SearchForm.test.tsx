import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import SearchForm from '../src/components/SearchForm';

import * as autocomplete from '../src/lib/autocomplete';
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
    // jest.spyOn('../lib/autocomplete', 'fetchSuggestions').mockImplementation();
});

describe('Home', () => {
    it('Form should throw validation error if one input empty', async () => {
        const onSubmit = jest.fn();
        render(<SearchForm onSubmit={onSubmit} />);

        expect(screen.getByRole('form')).toBeInTheDocument();
        expect(screen.getByLabelText('Track')).toBeInTheDocument();

        const searchButton = screen.getByText('Search');
        expect(searchButton).toBeInTheDocument();

        act(() => fireEvent.submit(searchButton));

        expect(await screen.findAllByRole('alert')).toHaveLength(1);

        act(() => {
            fireEvent.input(screen.getByLabelText('Track'), { target: { value: 'Oscar Mulero Generator' } });
            fireEvent.submit(searchButton);
        });

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });
    });

    it('Form should call submit function', async () => {
        const onSubmit = jest.fn();
        render(<SearchForm onSubmit={onSubmit} />);

        const form = screen.getByRole('form');
        const inputTrack = screen.getByLabelText('Track');
        const searchButton = screen.getByText('Search');

        expect(form).toBeInTheDocument();
        expect(inputTrack).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();

        fireEvent.input(inputTrack, { target: { value: 'Oscar Mulero Generator' } });
        fireEvent.submit(searchButton);
        expect(screen.queryAllByRole('alert')).toHaveLength(0);

        await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    });
});
