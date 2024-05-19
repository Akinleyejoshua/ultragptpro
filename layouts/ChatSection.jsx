import { Space } from "@/components/Space";
import Typing from "@/components/Typing";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"

export const ChatSection = () => {
    const chats = useSelector(state => state.prompt.msg);
    const chatRef = useRef(0);

    useEffect(() => {

        const domNode = chatRef.current;
        if (domNode) {
            // console.log(domNode)

            domNode.scrollTop = domNode.scollHeight;
            domNode.addEventListener("DOMNodeInserted", event => {
                // event.target.scroll({
                //   top: event.target.scrollHeight, 
                //   behavior: "smooth"
                // });
                try{
                    event?.target?.scrollIntoView({ behavior: "smooth", block: "start" });

                } catch (err){

                }

            })
        }
    }, [])

    return <section className="chat-section" ref={chatRef}>
       
    </section>
}