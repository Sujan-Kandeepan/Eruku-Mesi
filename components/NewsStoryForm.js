import React from 'react';

import EmptyPage from './EmptyPage';

export default function NewsStoryForm(props) {
  return (
    <EmptyPage {...props} nested cancel />
  );
};