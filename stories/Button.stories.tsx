import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Components/Input',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (
  args: ButtonProps,
) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { text: 'let\'s go!', submit: true };
