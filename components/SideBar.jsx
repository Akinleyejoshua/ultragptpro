"use client"
import { Space } from "./Space"
import { useDispatch, useSelector } from "react-redux";
import { deleteHistory, clearHistory, setAllHistory, setLoader, toggleSideBar } from "@/redux/features/prompt";
import { useRouter } from "next/navigation";
import { AiOutlineClear, AiOutlineDelete, AiOutlineHome } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Confirm } from "./Confirm";
import Logo from "@/src/img/logo.jpg"
import Image from "next/image";
import { delHistory, getHistory as getHistoryAPI } from "@/services/history";


export const SideBar = () => {
    const [modal, setModal] = useState(false);
    const [confirm, setConfirm] = useState({
        id: null,
        msg: "",
        open: false,
        action: ""
    });

    const router = useRouter();

    const dispatch = useDispatch();
    const prompt = useSelector(state => state.prompt);

    const history = useSelector(state => state.prompt.history);


    useEffect(() => {
        dispatch(setLoader(true))
        getHistoryAPI({
            all: true
        }).then(res => {
            dispatch(setAllHistory(res.data));
            dispatch(setLoader(false))
        })
    }, []);


    const confirmAction = async () => {
        const id = confirm.id;

        if (confirm.action === "del") {
            delHistory({ id }).then(() => {
                dispatch(deleteHistory(id))
            })

        };
        setConfirm({ open: false });
    }


    return <section className={`${prompt?.components?.sidebar ? "sidebar open" : "sidebar"}`}>
        {confirm.open === true && <Confirm msg={confirm.msg} onNo={() => setConfirm({ open: false })}
            onYes={confirmAction}
        />}
        <div className="top">
            <div className="top-2">

                <Image src={Logo} className="logo" alt="" height={100} width={100} />
                <h1>
                    <a href="/">Ultra GPT</a>
                    <button onClick={() => dispatch(toggleSideBar(false))} className="close-btn">&times;</button>
                </h1>
            </div>
            <Space p=".3rem" />
            <small>Chat History</small>
            <Space p=".3rem" />

            <div className="actions">
                <Space p=".0rem" />
                {
                    prompt.loading ?
                        <div className="spin"></div>
                        :
                        history?.length === 0 ? <p className="red">No History</p> : history?.map((item, i) => {
                            return <div title={item?.evaluation} className="item" key={i} id={item?._id}>

                                <h3>{i + 1}</h3>
                                <Space p={".3rem"} />
                                <div className="data">
                                    <p onClick={() => {
                                        dispatch(toggleSideBar(false));
                                        router.push(`${item?.path}/chat/${item?._id}`);
                                    }} className="dim">{item?.title}</p>
                                    <Space p={".3rem"} />
                                    <AiOutlineDelete className="icon red" onClick={() => setConfirm({
                                        ...confirm,
                                        open: true,
                                        id: item?._id,
                                        msg: "Delete the chat?",
                                        action: "del"
                                    })} />
                                </div>


                            </div>
                        })
                }


            </div>

        </div>

        <div className="bottom">
            <div className="row" onClick={() => dispatch(toggleSideBar(false))}>
                <AiOutlineClear className="icon blue" onClick={() => {
                    delHistory({ all: true }).then(() => {
                        dispatch(clearHistory())
                    })
                }} />
                <Space p=".3rem" />
                <AiOutlineHome className="icon" onClick={() => router.push("/")} />
            </div>
            <Space p=".3rem" />

            <small>Joshua Akinleye (Gemini Pro Vision)</small>
        </div>
    </section>
}
