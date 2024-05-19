import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
          "What are the Frontend Technologies you have has a skillset",
          "What are also the Backend Technologies you have has a skillset",
          "What was your most recent full stack project about, explain the technologies and many more",
          "What is Reactjs?",
          "Thank you for your time, i will send your data to the recruiting team and they will get back to you, good luck!",
        ],
      },
      1: {
        role: "Data Scientist",
        questions: [
          "Tell me about yourself?",
          "What are the Data Analysis Technologies you have has a skillset",
          "What are also Data Science Technologies you have has a skillset",
          "What was your most recent Data Science/Analysis or Machine Learning project about, explain the technologies and many more",
          "What is Data Science?",
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
