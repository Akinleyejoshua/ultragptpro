"use client";
import { Space } from "./Space";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteHistory,
  setAllHistory,
  setLoader,
  toggleSideBar,
} from "@/redux/features/prompt";
import { useRouter } from "next/navigation";
import { AiOutlineDelete, AiOutlineHome } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Confirm } from "./Confirm";
import Logo from "@/src/img/logo.jpg";
import Image from "next/image";
import { delHistory, getHistory as getHistoryAPI } from "@/services/history";
import { CiChat1 } from "react-icons/ci";

export const SideBar = () => {
  const [confirm, setConfirm] = useState({
    id: null,
    msg: "",
    open: false,
    action: "",
  });

  const router = useRouter();

  const dispatch = useDispatch();
  const prompt = useSelector((state) => state.prompt);

  const history = useSelector((state) => state.prompt.history);

  useEffect(() => {
    window.speechSynthesis.cancel();

    if (history) {
      dispatch(setLoader(true));
      getHistoryAPI({
        all: true,
      }).then((res) => {
        dispatch(setAllHistory(res.data));
        dispatch(setLoader(false));
      });
    }
  }, []);

  const confirmAction = async () => {
    const id = confirm.id;

    if (confirm.action === "del") {
      delHistory({ id }).then(() => {
        dispatch(deleteHistory(id));
      });
    }
    setConfirm({ open: false });
  };

  return (
    <section
      className={`${prompt?.components?.sidebar ? "sidebar open" : "sidebar"}`}
    >
      {confirm.open === true && (
        <Confirm
          msg={confirm.msg}
          onNo={() => setConfirm({ open: false })}
          onYes={confirmAction}
        />
      )}
      <div className="top">
        <div className="top-2">
          <Image src={Logo} className="logo" alt="" height={100} width={100} />
          <h1>
            <a href="/">Ultra GPT</a>
            <button
              onClick={() => dispatch(toggleSideBar(false))}
              className="close-btn"
            >
              &times;
            </button>
          </h1>
        </div>
        <Space p=".3rem" />
        <small>Chat History</small>
        <Space p=".3rem" />

        <div className="actions">
          <Space p=".0rem" />
          {prompt.loading ? (
            <div className="spin"></div>
          ) : history?.length === 0 ? (
            <p className="red">No History</p>
          ) : (
            history?.map((item, i) => {
              return (
                <div
                
                  className="item"
                  key={i}
                  id={item?._id}
                >
                  <CiChat1 className="icon" />
                  <Space p={".3rem"} />
                  <div className="data">
                    <p
                      onClick={() => {
                        dispatch(toggleSideBar(false));
                        router.push(`${item?.path}/chat/${item?._id}`);
                      }}
                      className="dim"
                    >
                      {item?.title}
                    </p>
                    <Space p={".3rem"} />
                    
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="bottom">
        <div className="row" onClick={() => dispatch(toggleSideBar(false))}>
          <AiOutlineHome className="icon" onClick={() => router.push("/")} />
        </div>
        

        <small>Joshua Akinleye (Gemini Pro Vision)</small>
      </div>
    </section>
  );
};
