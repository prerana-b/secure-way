chrome.extension.onRequest.addListener(function(prediction){
    if (prediction == 1){
        alert("Warning: Phishing detected!!");
        return 1;
    }
});

