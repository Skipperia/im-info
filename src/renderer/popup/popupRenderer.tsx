import React from 'react';
import '@styles/app.scss';
import { createRoot } from 'react-dom/client';
import WindowFrame from '@renderer/window/WindowFrame';
import PopupMessage from './PopupMessage';

// Say something
console.log('[IMInfo] : Renderer execution started');

const app = (
    <WindowFrame title='IM-Info' useMenuBar={false} platform='windows' >
        <div>
            <PopupMessage />
        </div>
    </WindowFrame>
);

// Render application in DOM
createRoot(document.getElementById('popup')).render(app);
