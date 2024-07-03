import type { Meta, StoryFn } from "@storybook/react";

import { ChevronBottomIcon } from "../ChevronBottomIcon";

export default {
  title: "Icons/ChevronBottomIcon",
  component: ChevronBottomIcon,
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

const Template: StoryFn<typeof ChevronBottomIcon> = (args) => (
  <ChevronBottomIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  color: "currentColor",
  size: 21,
};

export const RedColor = Template.bind({});
RedColor.args = {
  color: "red",
  size: 21,
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  color: "currentColor",
  size: 42,
};

export const WithTailwind = Template.bind({});
WithTailwind.args = {
  className: "text-blue-500",
  size: 21,
};
