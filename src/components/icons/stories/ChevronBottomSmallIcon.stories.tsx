import type { Meta, StoryFn } from "@storybook/react";

import { ChevronBottomSmallIcon } from "../ChevronBottomSmallIcon";

export default {
  title: "Icons/ChevronBottomSmallIcon",
  component: ChevronBottomSmallIcon,
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

const Template: StoryFn<typeof ChevronBottomSmallIcon> = (args) => (
  <ChevronBottomSmallIcon {...args} />
);

export const Default = Template.bind({});

Default.args = {};
