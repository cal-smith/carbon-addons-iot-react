import React from 'react';
import { action } from '@storybook/addon-actions';

import AddCard from './AddCard';

const AddCardProps = {
  onClick: action('clicked'),
  title: 'Click me',
};

export default {
  title: 'Watson IoT/AddCard',

  parameters: {
    component: AddCard,
  },
};

export const HandlesClick = () => <AddCard {...AddCardProps} />;

HandlesClick.story = {
  name: 'handles click',
};
