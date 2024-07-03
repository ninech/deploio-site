import type { Meta, StoryFn } from "@storybook/react";

import { ChevronTopIcon } from "../ChevronTopIcon";

export default {
  title: "Icons/ChevronTopIcon",
  component: ChevronTopIcon,
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

const Template: StoryFn<typeof ChevronTopIcon> = () => <ChevronTopIcon />;

export const Default = Template.bind({});
Default.args = {
  color: "currentColor",
  size: 21,
};
