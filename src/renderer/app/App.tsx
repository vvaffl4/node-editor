import { createMuiTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import * as React from 'react';
import Workspace from './workspace/Workspace';

const app: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <div className=' bg-white w-screen h-screen'>
        <div className='relative w-full h-full'>
          <div className='absolute inset-x-0 top-0 h-6'>
            This is the top bar  
          </div> 
          <div className='absolute inset-x-0 inset-y-6'>
            <div className='absolute inset-0 bg-red-500'>
              <Workspace/>
            </div>
            <div className='absolute inset-y-0 left-0 w-60 bg-blue-500 opacity-40'>
              {/* <Tools/> */}
            </div>
            <div className='absolute inset-y-0 right-0 w-60 bg-blue-500 opacity-40'>
              {/* <Properties/> */}
            </div>
          </div>
          <div className='absolute inset-x-0 bottom-0 h-6'>
            This is the bottom bar  
          </div> 
        </div>
      </div>
    </ThemeProvider>
  )
}

export default app;