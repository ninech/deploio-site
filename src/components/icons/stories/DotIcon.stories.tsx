import type { Meta, StoryFn } from "@storybook/react";

import { DotIcon } from "../DotIcon";

export default {
  title: "Icons/DotIcon",
  component: DotIcon,
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

const Template: StoryFn<typeof DotIcon> = (args) => <DotIcon {...args} />;

export const Default = Template.bind({});

Default.args = {};
