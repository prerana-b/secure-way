var url_site = window.location.href
console.log(url_site)

 let apiUrl = 'https://www.virustotal.com/vtapi/v2/url/report?apikey=fd90e09802f93492e5e936179413e94d630de55c6726339b58a92309acb5d7b7';
 apiUrl = apiUrl + '&resource=' + url_site;
 fetch(apiUrl, {
         method: 'GET',
         headers: new Headers()
     })
     .then(response => response.json())
    .then(data => checker(data));

function checker(data){
    if (data.positives > 0){
        chrome.runtime.sendMessage({
            "message": "PHISHING"
         });
    }
    else{
        chrome.runtime.sendMessage({
            "message": "NOT PHISHING"
         });
    }
}



 