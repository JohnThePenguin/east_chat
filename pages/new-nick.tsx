import axios from "axios";
import { useRef } from "react";
import { setToken } from "../utils/user/token";

export default () => {

    const nickInput = useRef<HTMLInputElement>(null);

    const sendNewNick = async () => {
        const nick = nickInput.current.value;
        console.log(nick);

        try{
            const result = await axios.post('/api/user/new-nick', {
                body: JSON.stringify({nick}),
            })
            await setToken(result.data.token);
            console.log(result);
        }
        catch(e){
            console.log(e);
        };
    };

    return (
        <div>
            <h3>new-nick</h3>
            <input type="text" ref={nickInput}/>
            <button onClick={sendNewNick}>Send</button>
        </div>
    );
}