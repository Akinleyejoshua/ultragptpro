import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recruiter: "Gemini",
  components: {
    sidebar: false,
    chatbar: false,
  },
  msg: "",
  prompt: "",
  loading: true,
  history: [],
  chats: [],
  interviewer: {
    roleId: 0,
    name: "",
    role: "",
    questions: {
      0: {
        role: "Full Stack Developer",
        questions: [
          "Tell me about yourself?",
          "Thank you for your time, i will send your data to the recruiting team and they will get back to you, good luck!",
        ],
      },
      1: {
        role: "Data Scientist",
        questions: [
          "Tell me about yourself?",
          "Thank you for your time, i will send your data to the recruiting team and they will get back to you, good luck!",
        ],
      },
    },
  },
};

export const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.components.sidebar = action.payload;
    },

    toggleChatBar: (state, action) => {
      state.components.chatbar = action.payload;
    },

    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },

    setChat: (state, action) => {
      const val = action.payload;
      state.chats = [...state.chats, val];
      state.prompt = "";
      state.err = "";
    },

    setChats: (state, action) => {
      const val = action.payload;
      state.chats = val;
    },

    setLoader: (state, action) => {
      state.loading = action.payload;
    },

    setMsg: (state, action) => {
      state.msg = action.payload;
    },

    deleteHistory: (state, action) => {
      const val = action.payload;
      state.history = state?.history.filter((item) => item?._id !== val);
    },

    clearHistory: (state, action) => {
      state.history = [];
    },

    setHistory: (state, action) => {
      const val = action.payload;
      state.history = [...state?.history, val];
    },

    setAllHistory: (state, action) => {
      state.history = action.payload;
    },

    setRoleAndName: (state, action) => {
      const val = action.payload;
      state.interviewer.roleId = val.roleId;
      state.interviewer.name = val.name;
      state.interviewer.role = val.role;
    },
  },
});

export const {
  setPrompt,
  setMsg,
  setLoader,
  setErr,
  deleteHistory,
  clearHistory,
  setRoleAndName,
  setHistory,
  setAllHistory,
  setChats,
  setChat,
  toggleSideBar,
  toggleChatBar,
} = promptSlice.actions;
export const promptReducer = promptSlice.reducer;
