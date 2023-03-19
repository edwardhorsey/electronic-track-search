import { Meta, Story } from '@storybook/react';
import { FieldValues } from 'react-hook-form';
import SearchForm from './SearchForm';

export default {
    title: 'SearchForm',
    component: SearchForm,
} as Meta;

const onSubmit = (data: FieldValues): Promise<boolean> => {
    alert(`Form submitted: ${JSON.stringify(data)})`);

    return new Promise((res) => res(true));
};

const Template: Story = () => <SearchForm onSubmit={onSubmit} />;

export const Primary = Template.bind({});
