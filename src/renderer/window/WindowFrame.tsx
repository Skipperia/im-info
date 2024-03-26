import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Titlebar from './Titlebar';
import logo from '@assets/images/im-info-icon.png';
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
  useMenuBar?: boolean;
  borderColor?: string;
  platform: 'windows' | 'mac';
  children: React.ReactNode;
  reducedTitle?: boolean;
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
    (window as any).main_window.setAdvancedView('setAdvancedView', () => {
      setIsAdvancedView(!isAdvancedView);
    });
  });

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
          <div className='start-electron-window' ref={itsRef}></div>
          {props.useMenuBar ? <Titlebar
            title={props.title}
            mode='centered-title'
            icon={logo}
            reducedTitle={props.reducedTitle}
          /> : <div></div>}

          {/* Window Content (Application to render) */}
          <div className='window-content'>{props.children}</div>
        </AdvancedViewContext.Provider>
      </ThemeProvider>
    </WindowContext.Provider >
  );
};

export default WindowFrame;
