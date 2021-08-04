import { Meta, Story } from '@storybook/react';
import SkeletonLoader from './SkeletonLoader';

export default {
  title: 'SkeletonLoader',
  component: SkeletonLoader,
} as Meta;

const Template: Story = () => <SkeletonLoader />;

export const Primary = Template.bind({});
