import { Meta, Story } from '@storybook/react';
import { rest } from 'msw';
import { mockData } from '../mocks/data';
import { DiscogsResults, DiscogsResultsProps } from './DiscogsResults';

export default {
  title: 'DiscogsResults',
  component: DiscogsResults,
} as Meta;

const Template: Story<DiscogsResultsProps> = (
  args: DiscogsResultsProps,
) => <DiscogsResults {...args} />;

export const Success = Template.bind({});
Success.args = { artist: 'Oscar Mulero', track: 'Generator' };
Success.parameters = {
  msw: [
    rest.get('/api/discogsSearch/', (req, res, ctx) => (
      res(ctx.json({ discogsResults: mockData.discogsResults }))
    )),
  ],
};

export const Loading = Template.bind({});
Loading.args = { artist: 'Oscar Mulero', track: 'Generator' };
Loading.parameters = {
  msw: [
    rest.get('/api/discogsSearch/', (req, res, ctx) => (
      res(
        ctx.delay('infinite'),
        // ctx.json({ message: 'Custom error message here' }),
      )
    )),
  ],
};

export const Failure = Template.bind({});
Failure.args = { artist: 'Oscar Mulero', track: 'Generator' };
Failure.parameters = {
  msw: [
    rest.get('/api/discogsSearch/', (req, res, ctx) => (
      res(
        ctx.status(500),
        ctx.json({ message: 'Custom error message here' }),
      )
    )),
  ],
};
