import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";



const PopupMessage = () => {
    const [msg, setMsg] = useState("title");
    const [body, setBody] = useState("body");

    useEffect(() => {
        // Receiving a message from the main process
        console.log(window);
        (window as any).electron.recieveEventMessage('message', (message: string, body: string) => {
            console.log(message);
            setMsg(message);
            setBody(body);
        });

        // Remember to remove listeners if necessary, especially when using class components
    }, []);




    return (<div>
        <Card sx={{ maxWidth: 500 }}>
            {/* <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            /> */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {msg}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {body}
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
        </Card>
    </div>)
}

export default PopupMessage;