import { Meta, Story } from '@storybook/react';

import { YoutubeResult, YoutubeResultProps } from './YoutubeResult';

export default {
  title: 'YoutubeResult',
  component: YoutubeResult,
} as Meta;

const Template: Story<YoutubeResultProps> = (
  args: YoutubeResultProps,
) => <YoutubeResult {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  embedId: 'XRotY7PuWMc',
};
