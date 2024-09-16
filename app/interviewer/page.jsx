"use client";

import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { Space } from "@/components/Space";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setRoleAndName, setHistory, clearRoleAndName } from "@/redux/features/prompt";
import { useDispatch, useSelector } from "react-redux";
import { saveHistory as saveHistoryAPI } from "@/services/history";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Interviewer() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    roleId: "",
    role: "",
    id: "",
    loading: false,
  });

  const interviewer = useSelector((state) => state.prompt.interviewer);

  const setupRoleAndName = () => {
    setState({
      ...state,
      loading: true,
    })

    const data = {
      title: `${state.role} Interview for ${state.name}`,
      path: "/interviewer",
      name: state.name,
      role: state.role,
      roleId: state.roleId,
    }

    dispatch(setRoleAndName(state));
    saveHistoryAPI(data).then(res => {
      dispatch(setHistory(data));
      setState({
        ...state,
        id: res.data._id,
        loading: false,
      })
    })
  };

  useEffect(() => {
  dispatch(clearRoleAndName())
  }, [])

  return (
    <div className="body interview">
      <SideBar />
      <div className="main">
        <Header section={"Interviewer"} />
        <main>
          <h1>Practice Interview Questions</h1>
          <Space p={".3rem"} />
          <p className="">
            In this practive interview questions, you will be interviwed by an
            A.I recruiter, who will ask you questions based on your role and
            will evaluate your performance and send to the real recruiting team
            for review. Gemini is your Virtual A.I interviewer.
          </p>

          <Space p={"1rem"} />
          <h2>How to use?</h2>
          <p>Once the page loads, enable camera and mic,
            press <b>"start"</b> to begin the session. there is a chat
            tab where your dialogue is being displayed.
            press <b>"Un mute"</b> to begin recording your own personal speech when
            it's time for you to answer or reply (if you spoke and no text was generated due to
            poor internet connection press it and speak again until it works)
            and ones you are done with speaking then press <b>"Mute"</b>.
            If in Doubt about a question Gemini asks you press
            the <b>"Next"</b> button to proceed to the next question.
            Make sure you speak carefully and audibly!. Make sure you have been evaluated
            before you leave the session, the HR team will review your evaluation. Good Luck!!!
          </p>
          <Space p={"1rem"} />
          {interviewer.name === "" && 
          <>
          <small>Your Role?</small>
          <Space p={".3rem"} />
          <select
            onChange={(e) => {
              const val = e.target.value;
              const id = e.target.id;
                setState({ ...state, roleId: id, role: val });
            }}
          >
            <option></option>
            {
              interviewer?.roles?.map((item) => (
                <option key={item.id} id={item.id}>{item.role}</option>
              ))
            }
        

          </select>
          <Space p={"1rem"} />
          <small>Your name?</small>
          <Space p={".3rem"} />
          <input
            onChange={(e) =>
              setState({
                ...state,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your name"
          />
         
          </>
          }
           {state.loading && <>
            <Space p={"1rem"} />
            <div className="please-wait">Please wait, creating session...</div>
          </>
          }
          <Space p={"1rem"} />

          {(state.name !== "" && state.role !== "") && (
            (state.id == "") ? (
              <button className="start" onClick={setupRoleAndName}>
                Next
                <Space p={".3rem"} />
                <AiOutlineArrowRight />
              </button>
            ) : <button className="start" onClick={() => router.push(`/interviewer/chat/${state.id}`)}>
              Start Session
              <Space p={".3rem"} />
              <AiOutlineArrowRight />
            </button>
          )

          }
          <Space p={"1rem"} />

        </main>
      </div>
    </div>
  );
}
