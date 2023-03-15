import { Meta, Story } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { InputText, InputTextProps } from './InputText';

export default {
    title: 'Input',
    component: InputText,
} as Meta;

const Template: Story<InputTextProps> = (args: InputTextProps) => {
    const {
        register,
        /* handleSubmit, */ formState: { errors },
    } = useForm();
    return <InputText {...args} register={register} errors={errors} />;
};

export const Primary = Template.bind({});
Primary.args = {
    id: 'myId',
    placeholder: 'Seleccion Natural',
    name: 'artist',
    label: 'Artist',
    errorMessage: 'Custom error message',
    required: true,
};
