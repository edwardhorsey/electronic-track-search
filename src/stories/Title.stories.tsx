import { Meta, Story } from '@storybook/react';
import Title from './Title';

export default {
  title: 'Title',
  component: Title,
} as Meta;

const Template: Story = () => <Title />;

export const Primary = Template.bind({});
