import React from 'react';
import './global.scss';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
};
