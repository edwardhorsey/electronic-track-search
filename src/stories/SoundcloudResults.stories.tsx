import { Meta, Story } from '@storybook/react';
import { rest } from 'msw';
import { mockSoundcloudLinks } from '../mocks/data';
import { SoundcloudResults, SoundcloudResultsProps } from './SoundcloudResults';

export default {
    title: 'SoundcloudResults',
    component: SoundcloudResults,
} as Meta;

const Template: Story<SoundcloudResultsProps> = (args: SoundcloudResultsProps) => <SoundcloudResults {...args} />;

export const Success = Template.bind({});
Success.args = { artist: 'Oscar Mulero', track: 'Generator' };
Success.parameters = {
    msw: [
        rest.get('/api/mixesSearch/', (req, res, ctx) =>
            res(
                ctx.json({
                    name: 'Soundcloud mixes search',
                    mixesResults: mockSoundcloudLinks,
                }),
            ),
        ),
    ],
};

export const Loading = Template.bind({});
Loading.args = { artist: 'Oscar Mulero', track: 'Generator' };
Loading.parameters = {
    msw: [
        rest.get('/api/mixesSearch/', (req, res, ctx) =>
            res(
                ctx.delay('infinite'),
                // ctx.json({ message: 'Custom error message here' }),
            ),
        ),
    ],
};

export const Failure = Template.bind({});
Failure.args = { artist: 'Oscar Mulero', track: 'Generator' };
Failure.parameters = {
    msw: [
        rest.get('/api/mixesSearch/', (req, res, ctx) =>
            res(ctx.status(500), ctx.json({ message: 'Custom error message here' })),
        ),
    ],
};
