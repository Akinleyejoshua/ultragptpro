export const speechToText = () => {
    try{
        if (window == undefined) return;
        const SpeechRecognition = window?.SpeechRecognition || window?.webkitSpeechRecognition
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        // recognition.interimResults = true;
        // recognition.lang = 'en-US';
        return recognition;
    } catch (err){
        
    }
    
}