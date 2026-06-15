// main thing
// define the meta
// and that needs to satisfy Meta<typeof <component of the story>>
// then export the meta so storybook know.
// then define the type for Story with StoryObj<typeof meta>
// then annotate the story with Story

import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./Button";

const meta = {
  title: "LearnComponent/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
    size: "sm",
  },
};
