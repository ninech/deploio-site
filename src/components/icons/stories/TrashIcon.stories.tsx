import type { Meta, StoryFn } from "@storybook/react";

import { TrashIcon } from "../TrashIcon";

export default {
  title: "Icons/TrashIcon",
  component: TrashIcon,
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

const Template: StoryFn<typeof TrashIcon> = () => <TrashIcon />;

export const Default = Template.bind({});
Default.args = {
  color: "currentColor",
};
