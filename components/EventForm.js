import React from 'react';

import EmptyPage from './EmptyPage';

export default function EventForm(props) {
  return (
    <EmptyPage {...props} nested cancel />
  );
};