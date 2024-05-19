"use client"

import { AiOutlineArrowLeft, AiOutlineLinkedin, AiOutlineMenu, AiOutlineTwitter } from "react-icons/ai";
import { Space } from "./Space";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "@/redux/features/prompt";

export const Header = ({section}) => {
    const [path, setPath] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setPath(window?.location.pathname)
    }, []);


    return <header>
        <nav className="row space-between">
            <div className="path">
                <AiOutlineArrowLeft className="icon" onClick={() => router.back()}/>
                <Space p={".3rem"}/>
                {section}
            </div>
            <div className="navlinks row">
                <a className="fill" target="blank" href="https://twitter.com/Joshuaakinleye4"><AiOutlineTwitter className="icon"/></a>
                <a className="fill" target="blank" href="https://www.linkedin.com/in/joshua-akinleye-9895b61ab/"><AiOutlineLinkedin className="icon"/></a>
                <AiOutlineMenu className="icon menu-btn" onClick={() => dispatch(toggleSideBar(true))}/>
            </div>
        </nav>


    </header>
}