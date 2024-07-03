import type { Meta, StoryFn } from "@storybook/react";

import { ChevronTopSmallIcon } from "../ChevronTopSmallIcon";

export default {
  title: "Icons/ChevronTopSmallIcon",
  component: ChevronTopSmallIcon,
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

const Template: StoryFn<typeof ChevronTopSmallIcon> = () => (
  <ChevronTopSmallIcon />
);

export const Default = Template.bind({});
Default.args = {
  color: "currentColor",
  size: 21,
};
