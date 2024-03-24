/**
 * Copyright (c) 2021, Guasam
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : guasam
 * @project : Electron Window
 * @package : Window Frame (Component)
 */

import React, { useEffect, useRef, createContext, useState, SetStateAction } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Titlebar from './Titlebar';
import logo from '@assets/images/im-info-logo.png';
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';


// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: blue.A400,
    },
  },
});

type Props = {
  title?: string;
  borderColor?: string;
  platform: 'windows' | 'mac';
  children: React.ReactNode;
};

type Context = {
  platform: 'windows' | 'mac';
};

interface AdvancedViewState {
  isAdvancedView: boolean;
  setIsAdvancedView: (isAdvancedView: boolean) => void;
}

export const WindowContext = React.createContext<Context>({
  platform: 'windows',
});

export const AdvancedViewContext = React.createContext<AdvancedViewState>({
  isAdvancedView: true, setIsAdvancedView: () => { },
});


const WindowFrame: React.FC<Props> = (props) => {
  const itsRef = useRef<HTMLDivElement>(null);
  const [isAdvancedView, setIsAdvancedView] = useState<boolean>(true);

  useEffect(() => {
    const { parentElement } = itsRef.current;
    parentElement.classList.add('has-electron-window');
    parentElement.classList.add('has-border');

    // Apply border color if prop given
    if (props.borderColor) {
      parentElement.style.borderColor = props.borderColor;
    }
  }, []);

  return (
    <WindowContext.Provider value={{ platform: props.platform }}>
      <ThemeProvider theme={theme}>
        <AdvancedViewContext.Provider value={{ isAdvancedView: isAdvancedView, setIsAdvancedView: setIsAdvancedView }}>
          {/* Reference creator */}
          <div className='start-electron-window' ref={itsRef}></div>
          {/* Window Titlebar */}
          <Titlebar
            title={props.title ?? 'Electron Window'}
            mode='centered-title'
            icon={logo}
          />
          {/* Window Content (Application to render) */}
          <div className='window-content'>{props.children}</div>
        </AdvancedViewContext.Provider>
      </ThemeProvider>
    </WindowContext.Provider >
  );
};

export default WindowFrame;
