import React from 'react';

import EmptyPage from './EmptyPage';

export default function MediaContentForm(props) {
  return (
    <EmptyPage {...props} nested cancel />
  );
};