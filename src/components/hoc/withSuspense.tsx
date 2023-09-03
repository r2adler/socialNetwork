import {Preloader} from 'components/common/Preloader/Preloader';
import React from 'react';

export const withSuspense = (Component: React.FC<any>) => {
  return (
      <React.Suspense fallback={<Preloader/>}>
          <Component />
      </React.Suspense>
  );
};
