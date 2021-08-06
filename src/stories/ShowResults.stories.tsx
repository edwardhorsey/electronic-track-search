import { Meta, Story } from '@storybook/react';
import { rest } from 'msw';
import { ShowResults, ShowResultsProps } from './ShowResults';
import { mockData } from '../mocks/data';

export default {
  title: 'ShowResults',
  component: ShowResults,
} as Meta;

const Template: Story<ShowResultsProps> = ({ ...args }) => (
  <ShowResults {...args} />
);

export const Success = Template.bind({});
Success.args = { artist: 'Oscar Mulero', track: 'Generator' };
Success.parameters = {
  msw: [
    rest.get('/api/trackSearch/', (req, res, ctx) => (
      res(ctx.json({ ...mockData }))
    )),
  ],
};

export const Loading = Template.bind({});
Loading.args = { artist: 'Oscar Mulero', track: 'Generator' };
Loading.parameters = {
  msw: [
    rest.get('/api/trackSearch/', (req, res, ctx) => (
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
    rest.get('/api/trackSearch/', (req, res, ctx) => (
      res(
        ctx.status(500),
        ctx.json({ message: 'Custom error message here' }),
      )
    )),
  ],
};
