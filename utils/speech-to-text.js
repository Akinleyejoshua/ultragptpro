export const speechToText = () => {
    try{
        if (window == undefined) return;
        const SpeechRecognition = window?.SpeechRecognition || window?.webkitSpeechRecognition
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        // recognition.interimResults = true;
        return recognition;
    } catch (err){
        
    }
    
}