import { Meta, Story } from '@storybook/react';
import { SkeletonLoader, SkeletonLoaderProps } from './SkeletonLoader';

export default {
  title: 'SkeletonLoader',
  component: SkeletonLoader,
} as Meta;

const Template: Story<SkeletonLoaderProps> = ({ ...args }) => (
  <SkeletonLoader {...args} />
);

export const Discogs = Template.bind({});
Discogs.args = { type: 'Discogs' };
export const Youtube = Template.bind({});
Youtube.args = { type: 'Youtube' };
export const Default = Template.bind({});
