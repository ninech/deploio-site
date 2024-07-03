import type { Meta, StoryFn } from "@storybook/react";

import { StackIcon } from "../StackIcon";

export default {
  title: "Icons/StackIcon",
  component: StackIcon,
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

const Template: StoryFn<typeof StackIcon> = () => <StackIcon />;

export const Default = Template.bind({});
Default.args = {
  color: "currentColor",
};
