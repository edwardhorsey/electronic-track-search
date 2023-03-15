import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchForm from '../src/stories/SearchForm';

describe('Home', () => {
    it('Form should throw validation error if one input empty', async () => {
        const onSubmit = jest.fn();
        render(<SearchForm onSubmit={onSubmit} />);

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

    it('Form should call submit function', async () => {
        const onSubmit = jest.fn();
        render(<SearchForm onSubmit={onSubmit} />);

        const form = screen.getByRole('form');
        const inputArtist = screen.getByLabelText('Artist');
        const inputTrack = screen.getByLabelText('Track');
        const searchButton = screen.getByText('Search');

        expect(form).toBeInTheDocument();
        expect(inputArtist).toBeInTheDocument();
        expect(inputTrack).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();

        fireEvent.input(inputArtist, { target: { value: 'Oscar Mulero' } });
        fireEvent.input(inputTrack, { target: { value: 'Generator' } });
        fireEvent.submit(searchButton);
        expect(await screen.queryAllByRole('alert')).toHaveLength(0);

        await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    });
});
