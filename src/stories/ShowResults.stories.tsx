import { Meta, Story } from '@storybook/react';
import { rest } from 'msw';
import { ShowResults, ShowResultsProps } from './ShowResults';
import { mockData, mockSoundcloudLinks } from '../mocks/data';

export default {
    title: 'ShowResults',
    component: ShowResults,
} as Meta;

const Template: Story<ShowResultsProps> = ({ ...args }) => <ShowResults {...args} />;

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
        rest.get('/api/discogsSearch/', (req, res, ctx) => res(ctx.json({ discogsResults: mockData.discogsResults }))),
        rest.get('/api/youtubeSearch/', (req, res, ctx) => res(ctx.json({ youtubeResult: mockData.youtubeResult }))),
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
        rest.get('/api/discogsSearch/', (req, res, ctx) =>
            res(
                ctx.delay('infinite'),
                // ctx.json({ message: 'Custom error message here' }),
            ),
        ),
        rest.get('/api/youtubeSearch/', (req, res, ctx) =>
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
        rest.get('/api/discogsSearch/', (req, res, ctx) =>
            res(ctx.status(500), ctx.json({ message: 'Custom error message here' })),
        ),
        rest.get('/api/youtubeSearch/', (req, res, ctx) =>
            res(ctx.status(500), ctx.json({ message: 'Custom error message here' })),
        ),
    ],
};
