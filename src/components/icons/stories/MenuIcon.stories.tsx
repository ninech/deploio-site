import type { Meta, StoryFn } from "@storybook/react";

import { MenuIcon } from "../MenuIcon";

export default {
  title: "Icons/MenuIcon",
  component: MenuIcon,
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

const Template: StoryFn<typeof MenuIcon> = (args) => <MenuIcon {...args} />;

export const Default = Template.bind({});

Default.args = {};
