'use client';

import React from 'react';

// This component will only be shown on mobile when no specific chat is selected
// On desktop, the layout.tsx handles everything and this component is not visible

const ChatIndexPage: React.FC = () => {
  // This page is handled entirely by the layout
  // The layout shows the sidebar on mobile for /chat route
  // and shows the empty state on desktop
  return null;
};

export default ChatIndexPage;
