import { Meta, Story } from '@storybook/react';
import SearchForm from './SearchForm';

export default {
  title: 'SearchForm',
  component: SearchForm,
} as Meta;

const Template: Story = () => <SearchForm />;

export const Primary = Template.bind({});
