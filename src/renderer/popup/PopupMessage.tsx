import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './popup.css';


const PopupMessage = () => {
    const [msg, setMsg] = useState("title");
    const [body, setBody] = useState("body");
    localStorage.setItem('dark-mode', '1');
    document.body.classList.add('dark-mode');

    useEffect(() => {
        // Receiving a message from the main process
        (window as any).electron.recieveEventMessage('message', (message: string, body: string) => {
            setMsg(message);
            setBody(body);
        });

        // Remember to remove listeners if necessary, especially when using class components
    }, []);




    return (<div>
        <Card id="eventCard">
            {/* <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            /> */}
            <CardContent>
                <Typography id="eventTitle" gutterBottom variant="h5" component="div">
                    {msg}
                </Typography>
                <Typography id="eventBody" variant="body2" color="text.secondary">
                    {body}

                </Typography>
            </CardContent>
        </Card>
    </div>)
}

export default PopupMessage;