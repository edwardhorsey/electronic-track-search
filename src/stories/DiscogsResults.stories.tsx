import { Meta, Story } from '@storybook/react';
import { DiscogsResultsReduced } from '../types/types';
import filterDiscogsResults from '../utils/filterDiscogsResults';

import { DiscogsResults, DiscogsResultsProps } from './DiscogsResults';
import { discogsData } from '../mocks/data';

const results: DiscogsResultsReduced = filterDiscogsResults(discogsData);

export default {
  title: 'DiscogsResults',
  component: DiscogsResults,
} as Meta;

const Template: Story<DiscogsResultsProps> = (
  args: DiscogsResultsProps,
) => <DiscogsResults {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  results,
};
