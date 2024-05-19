"use client";

import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import Image from "next/image";
import Logo from "@/src/img/avater-1.jpg";
import Logo2 from "@/src/img/avater-2.jpg";
import { Space } from "@/components/Space";
import { useRouter, useParams } from "next/navigation";
import { AiOutlineArrowRight, AiOutlineComment, AiOutlinePlayCircle, AiOutlineUser } from "react-icons/ai";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { speak } from "@/utils/speech";
import { speechToText } from "@/utils/speech-to-text";
import { prompt as gptPrompt } from "@/utils/gemini";
import { setChats, toggleChatBar } from "@/redux/features/prompt";
import { getChats as getChatsAPI, saveChats as saveChatsAPI } from "@/services/chats";

export default function InterviewChat() {
  const router = useRouter();
  const { id } = useParams();
  const prompt = useSelector(state => state.prompt);
  const history = useSelector((state) => state.prompt.history);
  const interviewer = useSelector((state) => state.prompt.interviewer);
  const cameraRef = useRef(0);
  const dispatch = useDispatch();
  const [next, setNext] = useState(0);
  const [chat, setChat] = useState([]);

  const recognition = speechToText();

  useEffect(() => {
    const cam = cameraRef.current;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        cam.srcObject = stream;
        cam?.play();
        return stream;
      });
  }, []);

  const [state, setState] = useState({
    started: false,
    listening: false,
    done: false,
    msg: "",
    completed: false,
    speaking: false,
    loading: false,
  });

  const handleState = (name, val) => {
    setState(prev => ({
      ...prev,
      [name]: val,
    }))
  }


  const questions = interviewer.questions;
  const filter = history?.filter((item) => item?._id == id)[0];
  const question = questions[filter?.role_id]?.questions;

  // useEffect(() => {
  //   if (filter === undefined) {
  //     router.push("/interviewer");
  //   }
  // }, [history, filter])

  const saveChat = () => {
    saveChatsAPI({ history_id: id, chats: chat }).then(() => {
      dispatch(setChats(chat));
    })
  }

  const getChats = () => {
    getChatsAPI({ history_id: id }).then(res => {
      dispatch(setChats(res.data?.chats || []));
      setChat(prev => (res.data?.chats || []));
    })
  }

  const evaluate = async () => {
    handleState("loading", true);
    handleState("msg", "Evaluating you");

    gptPrompt(`
      evalute all my responses from 
      the interview we just conducted
    `).then((data) => {
      setChat((prev) => [...prev, { msg: `Evaluation: ${data}` }]);
      handleState("loading", false);
      handleState("msg", "")
      saveChat();
      
    })
  }

  const stop = () => {
    setState({
      ...state,
      listening: false,
      speaking: false,
      done: true,
      started: false,
      completed: true,
      msg: "Done Interviewing you, your session as ended!",
    });
    evaluate();
  }

  const start = async () => {
    if (chat?.length !== question?.length) {
      setState({
        ...state,
        started: true,
        listening: false,
        speaking: true,
        msg: "Gemini is/was Speaking...",
      });
      setNext(0);
      setChat((prev) => ([]));

      const intro = `So ${filter?.name}, my name is Gemini
       and am your ${filter?.role}recruiter
       i will be asking you questions 
      about your role and you will reply me
      by speaking concisely back to me, you are welcome, So
      `
      setChat((prev) => [...prev, { question: intro }]);

      speak(intro + question[0]);

      setChat((prev) => [...prev, { question: question[0] }]);
    }
  };



  const nextQuestion = () => {
    if (chat?.length !== question?.length + 1) {
      if (question[next + 1] !== undefined) {
        setNext(next + 1);
        setState({
          ...state,
          started: true,
          listening: false,
          speaking: true,
          msg: "Gemini is/was Speaking...",
          loading: false,

        });
        speak(question[next + 1])
        setChat((prev) => [
          ...prev,
          { question: question[next + 1] },
        ]);

      }

    }

    if (next === question?.length - 1) {
      stop();
    }
  };

  const startListening = () => {
    recognition.start();
    setState({
      ...state,
      speaking: false,
      listening: true,
      msg: "Gemini is/was Listening to you...",
      loading: true,
    });

  };
  recognition.onresult = async (e) => {
    const transcript = e.results[0][0].transcript;
    setChat((prev) => [...prev, { answer: transcript }]);

    handleState("loading", true);
    handleState("msg", "Thinking...");
    recognition.stop();

    gptPrompt(`
      if you are interviewing me now and want 
      to recruite me for this ${filter?.role} 
      role, remember no matter what i
      say you are the one interviewing
      (provided my name is ${filter?.name}) So
      reply concerning this - "${transcript}".
      but please key your reply breif with questions too'
    `).then(data => {

      setChat((prev) => [...prev, { msg: data }]);
      handleState("loading", false);
      handleState("msg", "Gemini is/was speaking")
      speak(data.replace("*", ""))
    })

  }

  recognition.onend = (e) => {
    setState({
      ...state,
      listening: false,
      speaking: true,
      loading: false,
    });
  }

  // useEffect(() => {


  // }, [])



  const stopListening = () => {
    recognition.stop();
  };

  useEffect(() => {
    getChats();
  }, [id])

  const chatRef = useRef(0);

  useEffect(() => {
    const domNode = chatRef.current;

    if (domNode) {
      domNode.scrollTop = domNode.scollHeight;
      domNode.addEventListener("DOMNodeInserted", event => {
        event.target.scrollIntoView({ behavior: "smooth", block: "start" });
      })
    }

  }, [])


  return (
    <div className="body interview-chat">
      <SideBar />
      <div className="main">
        <Header section={
          <h1 className="title">{filter?.title}</h1>
        } />
        <main>
          <Space p={".3rem"} />

          <div className="row">
            <div className="video">
              <div className="interviewer">
                <Image src={Logo} alt="" className="male" />
                <Image src={Logo2} alt="" className="female" />
                <small className="name">Gemini</small>
              </div>
              <div className="candidate">
                <video controls={false} ref={cameraRef} autoPlay={true}></video>
                <div className="controls">

                  {(!state.started && filter !== undefined)
                    &&
                    <button onClick={start}>
                      Start
                      <Space p={".3rem"} />
                      <AiOutlinePlayCircle />
                    </button>
                  }

                  {
                    (state.started && state.speaking && !state.loading) &&
                    <button onClick={startListening}>
                      Speak
                      <Space p={".3rem"} />
                      <CiMicrophoneOn className="red" />
                    </button>
                  }

                  {
                    (state.started && !state.speaking) &&
                    <button onClick={stopListening}>
                      Done Speaking
                      <Space p={".3rem"} />
                      <CiMicrophoneOff className="red" />
                    </button>
                  }

                  {
                    (state.started && !state.loading && state.speaking) &&
                    <button onClick={nextQuestion}>
                      {next === question?.length - 1 ? "Finish" : "Next"}
                      <Space p={".3rem"} />
                      <AiOutlineArrowRight />
                    </button>
                  }

                </div>
              </div>
              <div className="msg">{state.msg}
                <Space p={".3rem"} />

                {state.loading && <div className="spin"></div>}
              </div>
              <button onClick={() => dispatch(toggleChatBar(true))} className="toggle-chat">Chat Section
                <Space p={".3rem"} />
                <AiOutlineComment className="icon" />
              </button>
              <Space p={".3rem"} />

            </div>

            <div className={`${prompt?.components?.chatbar ? "chat open" : "chat"}`} ref={chatRef}>
              <div className="chat-top">
                <h2 className="blue">Chat</h2>
                <button onClick={() => dispatch(toggleChatBar(false))} className="close-bar">&times;</button>
              </div>
              <Space p={".3rem"} />
              <div className="chat-history">
                {chat?.length === 0 ? (
                  <small className="red">No Chat History</small>
                ) : (
                  chat?.map((item, i) => {
                    return (
                      <div key={i} className="chat-bar">
                        {item?.question && (
                          <div className="question">
                            <div className="data">
                              <Image src={Logo} alt="" className="male" />
                              <Image src={Logo2} alt="" className="female" />
                              <Space p={".3rem"} />
                              <div className="col">
                                <h4>Gemini</h4>
                                <div className="text">
                                  <small>{item?.question}</small>
                                </div>
                              </div>
                            </div>

                          </div>
                        )}

                        {item?.answer && (
                          <div className="answer">
                            <div className="data">
                              <h4 className="blue">{filter?.name}</h4>
                            </div>
                            <div className="text">
                              <small>{item?.answer}</small>
                            </div>
                          </div>
                        )}

                        {item?.msg && (
                          <div className="">
                            <div className="data">
                              <Image src={Logo} alt="" />
                              <Space p={".3rem"} />
                              <div className="col">
                                <h4>Gemini</h4>
                                <div className="text">
                                  <small>{item?.msg}</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
