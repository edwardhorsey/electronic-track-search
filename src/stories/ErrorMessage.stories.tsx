import { Meta, Story } from '@storybook/react';

import { ErrorMessage, ErrorMessageProps } from './ErrorMessage';

export default {
    title: 'ErrorMessage',
    component: ErrorMessage,
} as Meta;

const Template: Story<ErrorMessageProps> = (args: ErrorMessageProps) => <ErrorMessage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    message: 'There has been an error retrieving your results - please try again later',
};
