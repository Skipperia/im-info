import React, { useEffect, useState } from "react";



const PopupMessage = () => {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        // Receiving a message from the main process
        console.log(window);
        (window as any).electron.recieveEventMessage    ('message', (message: string) => {
            console.log(message);
            setMsg(message);
        });

        // Remember to remove listeners if necessary, especially when using class components
    }, []);




    return (<div>
        <p>{msg}</p>
    </div>)
}

export default PopupMessage;