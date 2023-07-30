import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { getToken } from "../utils/user/token";

export default () => {

    const [data, setData] = useState(null);

    useEffect(() => { fetchMe() }, []);

    const fetchMe = async () => {
        console.log(await getToken());

        const result = await axios.get('/api/user/me', {
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        });

        console.log(result);

        setData(JSON.stringify(result.data));
    };

    return (
        <div>
           {data && <div>{data}</div>}
        </div>
    );
}