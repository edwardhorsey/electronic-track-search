import { Meta, Story } from '@storybook/react';
import { DiscogsResponse, DiscogsResultsReduced } from '../types/types';
import filterDiscogsResults from '../utils/filterDiscogsResults';

import { DiscogsResults, DiscogsResultsProps } from './DiscogsResults';

const mockData: DiscogsResponse = {
  country: 'Germany',
  year: '2014',
  format: ['Vinyl', '12"', 'Stereo'],
  label: ['Blue Hour'],
  type: 'master',
  genre: ['Electronic'],
  style: ['Techno'],
  id: 1107260,
  barcode: [],
  user_data: { in_wantlist: false, in_collection: false },
  master_id: 1107260,
  master_url: 'https://api.discogs.com/masters/1107260',
  uri: '/Blue-Hour-Common-Ground/master/1107260',
  catno: 'BLUEHOUR004',
  title: 'Blue Hour - Common Ground',
  thumb: 'https://img.discogs.com/H8t6v5oSVVBWcZc-RFUbUvakUN0=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-6105267-1411206959-8636.jpeg.jpg',
  cover_image: 'https://img.discogs.com/wTK2uc7BRplAFGD1urC5YqmV564=/fit-in/580x819/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6105267-1411206959-8636.jpeg.jpg',
  resource_url: 'https://api.discogs.com/masters/1107260',
  community: {
    want: 135,
    have: 222,
  },
};

const results: DiscogsResultsReduced = filterDiscogsResults(mockData);

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
