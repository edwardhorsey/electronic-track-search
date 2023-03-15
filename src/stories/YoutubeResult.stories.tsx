import { Meta, Story } from '@storybook/react';
import { rest } from 'msw';
import { mockData } from '../mocks/data';

import { YoutubeResult, YoutubeResultProps } from './YoutubeResult';

export default {
    title: 'YoutubeResult',
    component: YoutubeResult,
} as Meta;

const Template: Story<YoutubeResultProps> = (args: YoutubeResultProps) => <YoutubeResult {...args} />;

export const Success = Template.bind({});
Success.args = { artist: 'Oscar Mulero', track: 'Generator' };
Success.parameters = {
    msw: [rest.get('/api/youtubeSearch/', (req, res, ctx) => res(ctx.json({ youtubeResult: mockData.youtubeResult })))],
};

export const Loading = Template.bind({});
Loading.args = { artist: 'Oscar Mulero', track: 'Generator' };
Loading.parameters = {
    msw: [
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
        rest.get('/api/youtubeSearch/', (req, res, ctx) =>
            res(ctx.status(500), ctx.json({ message: 'Custom error message here' })),
        ),
    ],
};
