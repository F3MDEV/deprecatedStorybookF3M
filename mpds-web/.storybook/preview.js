import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StoryContext, StoryGetter, StoryWrapper } from '@storybook/addons';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'centered',
  backgrounds: {
    default: 'MpDS Background',
    values: [
        { 
            name: 'MpDS Background', 
            value: '#f2f2f2'
        },
        { 
            name: 'Twitter', 
            value: '#00aced'
        },
        { 
            name: 'Facebook', 
            value: '#3b5998' 
        },
      ],
    }
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
    },
  },
};

/* const withThemeProvider=(Story,context)=>{
  const theme = getTheme(context.globals.theme);
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  )
}

export const decorators = [withThemeProvider]; */

