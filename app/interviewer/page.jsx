"use client";

import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { Space } from "@/components/Space";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setRoleAndName, setHistory } from "@/redux/features/prompt";
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

  const history = useSelector((state) => state.prompt.history);

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
      role_id: state.roleId,
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
            press <b>"speak"</b> to begin recording your own personal speech when
            it's time for you to answer or reply (if you spoke and no text was generated due to
            poor internet connection press it and speak again until it works)
            and ones you are done with speaking then press <b>"done speaking"</b>.
            If in Doubt about a question Gemini asks you press 
            the <b>"Next"</b> button to proceed to the next question.
            Make sure you speak carefully and audibly!. Make sure you have been evaluated
            before you leave the session, the HR team will review your evaluation. Good Luck!!!
          </p>
          <Space p={"1rem"} />
          <small>Your Role?</small>
          <Space p={".3rem"} />
          <select
            onChange={(e) => {
              const val = e.target.value;
              val === "Full Stack Developer" &&
                setState({ ...state, roleId: 0, role: val });
              val === "Data Scientist" &&
                setState({ ...state, roleId: 1, role: val });
            }}
          >
            <option></option>
            <option>Full Stack Developer</option>
            <option>Data Scientist</option>
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
