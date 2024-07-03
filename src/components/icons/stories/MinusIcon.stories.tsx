import type { Meta, StoryFn } from "@storybook/react";

import { MinusIcon } from "../MinusIcon";

export default {
  title: "Icons/MinusIcon",
  component: MinusIcon,
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

const Template: StoryFn<typeof MinusIcon> = () => <MinusIcon />;

export const Default = Template.bind({});
Default.args = {
  color: "currentColor",
};
