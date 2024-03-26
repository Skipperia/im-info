import React, { useEffect, useState, useContext } from 'react';
import '@styles/app.scss';
import { AdvancedViewContext } from '@renderer/window/WindowFrame';
import { Button, ToggleButton } from '@mui/material';
import popUpContext from '@main/mainwindow/popUpContextApi';



const Application: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  const { isAdvancedView, setIsAdvancedView } = useContext(AdvancedViewContext);


  const toggleAdvancedView = () => {
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
    popUpContext.showPopUp({ message: "event title", body: "event body" });
  }

  return (
    <div id='erwt'>
      <Button variant="outlined" onClick={showPopUp} >open popup</Button>
    </div >
  );
};

export default Application;
