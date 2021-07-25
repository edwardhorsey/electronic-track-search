import React from 'react';
import { Meta, Story } from '@storybook/react';

import { InputText, InputTextProps } from './InputText';

export default {
  title: 'Components/Input',
  component: InputText,
} as Meta;

const Template: Story<InputTextProps> = (
  args: InputTextProps,
) => <InputText {...args} />;

export const Primary = Template.bind({});
Primary.args = { id: 'myId', placeholder: 'Seleccion Natural' };
