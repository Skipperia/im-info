import React, { useEffect, useState, useContext } from 'react';
import '@styles/app.scss';
import { AdvancedViewContext } from '@renderer/window/WindowFrame';
import { Button, ToggleButton } from '@mui/material';
import popUpContext from '@main/mainwindow/popUpContextApi';



const Application: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  const { isAdvancedView, setIsAdvancedView } = useContext(AdvancedViewContext);


  const toggleAdvancedView = () => {
    console.log("happend!" + isAdvancedView)
    setIsAdvancedView(!isAdvancedView)
  }
  /**
   * On component mount
   */
  useEffect(() => {
    const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
    if (isNaN(useDarkTheme)) {
      setDarkTheme(true);
    } else if (useDarkTheme == 1) {
      setDarkTheme(true);
    } else if (useDarkTheme == 0) {
      setDarkTheme(false);
    }

    // Apply verisons
    const app = document.getElementById('app');
  }, []);

  /**
   * On Dark theme change
   */
  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem('dark-mode', '1');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('dark-mode', '0');
      document.body.classList.remove('dark-mode');
    }
  }, [darkTheme]);

  /**
   * Toggle Theme
   */
  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }

  const showPopUp = () => {
    console.log("dsadas");
    console.log(popUpContext);
    popUpContext.showPopUp({ message: "event title", body: "event body" });
  }

  return (
    <div id='erwt'>
      <ToggleButton
        value="check"
        selected={isAdvancedView}
        onChange={() => {
          toggleAdvancedView();
        }}
      >
      </ToggleButton>
      <Button variant="outlined" onClick={showPopUp} >Text</Button>
    </div >
  );
};

export default Application;
