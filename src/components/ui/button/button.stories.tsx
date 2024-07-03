import type { Meta, Story } from "@storybook/react";

import { Button } from "./button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "default",
          "destructive",
          "outline",
          "secondary",
          "ghost",
          "link",
        ],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg", "icon"],
      },
    },
    fallbackText: {
      variant: "default",
    },
  },
} as Meta;

const Template: Story = (args) => (
  <div>
    <Button {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  children: "Default Button",
};

export const Destructive = Template.bind({});

Destructive.args = {
  variant: "destructive",
  children: "Destructive Button",
};
