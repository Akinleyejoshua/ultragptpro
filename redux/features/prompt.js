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
    roleId: null,
    name: "",
    role: "",
    roles: [
      {
        id: 0,
        role: "Frontend Developer",
      },
      {
        id: 1,
        role: "Backend Developer",
      },
      {
        id: 2,
        role: "Fullstack Developer",
      },
      {
        id: 3,
        role: "Data Scientist",
      },
      {
        id: 4,
        role: "Data Analyst",
      },
      {
        id: 5,
        role: "Machine Learning Engineer",
      },
      {
        id: 6,
        role: "Blockchain Developer",
      },
      {
        id: 7,
        role: "Cyber Security Analyst",
      },
      {
        id: 8,
        role: "Cyber Security Engineer",
      },
      {
        id: 9,
        role: "Cyber Security Specialist",
      },
      {
        id: 10,
        role: "C.T.O",
      },
      {
        id: 11,
        role: "C.E.O",
      },
      {
        id: 12,
        role: "Human Resource Manager (H.R)",
      },
      {
        id: 13,
        role: "Product Designer & UI/UX",
      },
      {
        id: 14,
        role: "Accountant",
      },
      {
        id: 13,
        role: "Web3 Bug Hunter",
      },
      {
        id: 14,
        role: "Data Engineer",
      },
      {
        id: 15,
        role: "Cloud Architect",
      },
      {
        id: 16,
        role: "Machine Learning Operations (MLOps)",
      },
      {
        id: 17,
        role: "Developer Operations (DevOps)",
      },
      {
        id: 18,
        role: "Business Developer",
      },
      {
        id: 19,
        role: "Graphics Designer",
      },
      {
        id: 20,
        role: "Social Media Manager",
      },

    ],
    questions: [
      "Tell me about yourself?",
      "What are your Salary Expectations?",
      "What is your work notice? explain",
      // "",
      "Thank you for your time, i will send your data to the recruiting team and they will get back to you, good luck!",
    ],
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
