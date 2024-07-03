import type { Meta, StoryFn } from "@storybook/react";

import { PlusIcon } from "../PlusIcon";

export default {
  title: "Icons/PlusIcon",
  component: PlusIcon,
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

const Template: StoryFn<typeof PlusIcon> = () => <PlusIcon />;

export const Default = Template.bind({});
Default.args = {
  color: "currentColor",
};
