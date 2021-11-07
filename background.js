chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.message === "PHISHING") {
            alert('Phishing  site')
        }
        else{
            alert('Not Phishing')
        }
    }    
    )