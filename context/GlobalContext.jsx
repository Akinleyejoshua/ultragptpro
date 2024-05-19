"use client"

import { createContext, useState } from "react";

const globalstate = {
    handlePrompt: (val) => {},
    prompt: "",
    handleMsg: (val) => {},
    msg: "",

}

export const GlobalContext = createContext(globalstate);

const GlobalProvider = ({Children}) => {

    const [prompt, setPrompt] = useState("");

    const handlePrompt = (val) => setPrompt(val);

    const [msg, setMsg] = useState([]);

    const handleMsg = (val) => setMsg(prev => ([...prev, val]));



    return <GlobalContext.Provider value={globalstate}>
        {Children}
    </GlobalContext.Provider>
}

export default GlobalProvider;