import type { Meta, StoryFn } from "@storybook/react";

import { HelpIcon } from "../HelpIcon";

export default {
  title: "Icons/HelpIcon",
  component: HelpIcon,
  parameters: {
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#333333" },
      ],
    },
  },
} as Meta;

const Template: StoryFn<typeof HelpIcon> = (args) => <HelpIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "currentColor",
};
