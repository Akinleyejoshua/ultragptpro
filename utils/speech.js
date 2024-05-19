export const speak = async (msg) => {
  if ("speechSynthesis" in window) {
    var synthesis = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(msg);    
    utterance.text = msg;
    synthesis.speak(utterance);
    return synthesis;
  } else {
    alert("Text-To-Speech unsupported by your browser, use Google Chrome!");
  }
};
