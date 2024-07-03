import type { Meta, Story } from "@storybook/react";

import { Badge } from "./badge";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["default", "secondary", "destructive", "outline"],
      },
    },
  },
} as Meta;

const Template: Story = (args) => (
  <div>
    <Badge {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  children: "Default Badge",
};

export const Secondary = Template.bind({});

Secondary.args = {
  variant: "secondary",
  children: "Secondary Badge",
};

export const Destructive = Template.bind({});

Destructive.args = {
  variant: "destructive",
  children: "Destructive Badge",
};

export const Outline = Template.bind({});

Outline.args = {
  variant: "outline",
  children: "Outline Badge",
};
