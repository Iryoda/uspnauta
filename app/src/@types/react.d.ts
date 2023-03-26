import * as React from '@types/react';

declare module 'react' {
  interface FCWC<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}
