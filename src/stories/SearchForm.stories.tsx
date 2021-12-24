import { Meta, Story } from '@storybook/react';
import { SearchQuery } from '../types';
import SearchForm from './SearchForm';

export default {
  title: 'SearchForm',
  component: SearchForm,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSubmit = (data: SearchQuery): any => {
  // eslint-disable-next-line no-alert
  alert(`Form submitted: ${JSON.stringify(data)})`);
};

const Template: Story = () => <SearchForm onSubmit={onSubmit} />;

export const Primary = Template.bind({});
