var req, urlDump;
var extractURLsLookup = "https://api.hackertarget.com/pagelinks/?q=";
var httpHeadersLookup = "https://api.hackertarget.com/httpheaders/?q=";

/**
* Reverse IP Lookup
*
*/
function revIP(url,ref) {
    try {
        $.ajax({
            type: "GET",
            url: "http://api.hackertarget.com/reverseiplookup/?q=" + url,
            success: function(data){
                if (ref == 'homepage') {
                    var pre = document.createElement('pre');
                    pre.setAttribute('style', 'border:1px black');
                    pre.innerText = data;
                    document.getElementById('revIPpre').appendChild(pre);
                    $('#reverseIPlookup .info').empty();
                    $('#revIPinput').prop('disabled',false);
                    $('#revIPsubmit').prop('disabled',false);
                    $('#revIPsubmit').text('Lookup!');
                    $('body').animate({
                        scrollTop: $('#inputPane').offset().top-60
                    }, 900);
                } else {
                    if (data == "API count exceeded" || data == "") {
                        //lookup limit reached
                        $('#navRIP').remove();
                        $('#reverseIP').remove();
                    } else {
                        var rIPPane = document.createElement('fieldset');
                        var rIPL = document.createElement('legend');
                        var pre = document.createElement('pre');
                        pre.setAttribute('style', 'border:1px black');
                        pre.innerText = data;

                        rIPL.innerText = "Reverse IP lookup";
                        rIPPane.appendChild(rIPL);
                        rIPPane.appendChild(pre);
                        document.getElementById('reverseIPwrap').appendChild(rIPPane);   
                    }
                }
            },
            dataType: "text",
            error: function() {
                console.log("Reverse IP Lookup: ", err);
                if (ref == 'homepage') {
                    $('#reverseIPlookup .info').empty();
                    $('#revIPinput').prop('disabled',false);
                    $('#revIPsubmit').prop('disabled',false);
                    $('#revIPsubmit').text('Lookup!');
                    $('#revIPpre').append("<span>Unable to connect! Please try again later.</span>");
                } else {
                    $('#reverseIPwrap').append("<span>Not found</span>");
                    $('#navRIP').css('display','none');
                    $('#reverseIP').css('display','none');
                }
            }
        });
    }
    
    catch(err) {
        console.log("Reverse IP Lookup: ", err);
    }
}

/**
* SSL Certificate Checker
*
*/
function extractFromDump(dump) {
    var info = [];
    var $doc=$(dump);
    var mainContent = $doc.find("div.mainContent")[0];
    var qus = $(mainContent).find(".qu");

    $(qus).each(function (index, qu) {
        if (index != 10 && index != 15) {
            var key = $.trim($(qu).parent().text());
            var value = $.trim($(qu).parent().parent().text());
            value = value.replace(/\s+/g, ' ');
            value = value.replace(key, "");
            info.push({key: key, value: value});
        }
    });

    var table = $("#sslTable");
//    $("#spinner").hide();
    info.forEach(function(i){
        var valueToBeAppended ='<tr><td>'+ i.key+'</td><td>'+ i.value+'</td></tr>';
        table.append($(valueToBeAppended));
    });
    $('#sslChecker .info').empty();
}

function sslChecker(url) {
    try {
        var SslCheckerForm = {
            "SslCheckerForm[url]": url,
            "SslCheckerForm[port]": 443,
            "yt0": ""
        };
        
        $.ajax({
            type: "POST",
            url: "https://www.sslchecker.com/sslchecker",
            data: SslCheckerForm,
            success: function(data){
                var parser = new DOMParser();
                var dump = parser.parseFromString(data, "text/html");
                extractFromDump(dump);
                $('#sslURLinput').prop('disabled',false);
                $('#sslURLsubmit').prop('disabled',false);
                $('#sslURLsubmit').text('SSL Check');
                $('body').animate({
                    scrollTop: $('#inputPane').offset().top-60
                }, 900);
            },
            dataType: "html",
            error: function() {
                console.log("SSL Check: ", err);
                $('#sslChecker .info').empty();
                $('#sslTable').empty();
                $('#sslChecker .info').append("<div class='alert alert-warning'><span class='glyphicon glyphicon-remove-sign'></span> Unable to connect.</div>");
                setTimeout(function(){ 
                    $('#sslChecker .info').empty();
                }, 2000);
                $('#sslURLinput').prop('disabled',false);
                $('#sslURLsubmit').prop('disabled',false);
                $('#sslURLsubmit').text('SSL Check');
            }
        });
        $('#sslChecker .info').empty();
    }
    
    catch(err) {
        console.log("SSL Check: ", err);
    }
}

/**
* getUrlParameter function
*
*/
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

/**
* HTTP Headers
*
*/
function httpHeaders(url, ref) {
    try {
        $.ajax({
            type: "GET",
            url: httpHeadersLookup + url,
            success: function(data){
                if (ref == 'homepage') {
                    var pre = document.createElement('pre');
                    pre.setAttribute('style', 'border:1px black');
                    pre.innerText = data;
                    document.getElementById('httpPre').appendChild(pre);
                    $('#httpHeadersLookup .info').empty();
                    $('#httpInput').prop('disabled',false);
                    $('#httpSubmit').prop('disabled',false);
                    $('#httpSubmit').text('Lookup!');
                    $('body').animate({
                        scrollTop: $('#inputPane').offset().top-60
                    }, 900);
                } else {
                    if (data == "API count exceeded" || data == "") {
                        //lookup limit reached
                        $('#navHeaders').remove();
                        $('#HTTP_headers').remove();
                    } else {
                        var httpHeadersPane = document.createElement('fieldset');
                        var legend = document.createElement('legend');
                        var pre = document.createElement('pre');
                        pre.setAttribute('style', 'border:1px black');
                        pre.innerText = data;
                        legend.innerText = "HTTP Headers";
                        httpHeadersPane.appendChild(legend);
                        httpHeadersPane.appendChild(pre);
                        document.getElementById('httpHeaders').appendChild(httpHeadersPane);   
                    }
                }
            },
            dataType: "text",
            error: function() {
                console.log("HTTP Headers: ", err);
                if (ref == 'homepage') {
                    $('#httpHeadersLookup .info').empty();
                    $('#httpInput').prop('disabled',false);
                    $('#httpSubmit').prop('disabled',false);
                    $('#httpSubmit').text('Lookup!');
                    $('#httpPre').append("<span>Unable to connect! Please try again later.</span>");
                } else {
                    $('#httpHeaders').append("<span>No results found</span>");
                    $('#navHeaders').css('display','none');
                    $('#HTTP_headers').css('display','none');
                }
            }
        });
    }
    
    catch(err) {
        console.log("Reverse IP Lookup: ", err);
    }
}

/**
* Extract URLs
*
*/
function extractURLs(url, ref) {
    try {
        $.ajax({
            type: "GET",
            url: extractURLsLookup + url,
            success: function(data){
                if (ref == 'homepage') {
                    var pre = document.createElement('pre');
                    pre.setAttribute('style', 'border:1px black');
                    pre.innerText = data;
                    document.getElementById('extractedPageLinksPre').appendChild(pre);
                    $('#extractedPageLinks .info').empty();
                    $('#extractedPageLinksInput').prop('disabled',false);
                    $('#extractedPageLinksSubmit').prop('disabled',false);
                    $('#extractedPageLinksSubmit').text('Lookup!');
                    $('body').animate({
                        scrollTop: $('#inputPane').offset().top-60
                    }, 900);
                } else {
                    if (data == "API count exceeded" || data == "") {
                        //lookup limit reached
                        $('#navExtractURLs').remove();
                        $('#extractedURLs').remove();
                    } else {
                        var extractedPane = document.createElement('fieldset');
                        var legend = document.createElement('legend');
                        var pre = document.createElement('pre');
                        pre.setAttribute('style', 'border:1px black');
                        pre.innerText = data;
                        legend.innerText = "Extracted URLs";
                        extractedPane.appendChild(legend);
                        extractedPane.appendChild(pre);
                        document.getElementById('extractedURLsWrap').appendChild(extractedPane);
                    }
                }
            },
            dataType: "text",
            error: function() {
                console.log("Extracted URLs: ", err);
                if (ref == 'homepage') {
                    $('#extractedPageLinks .info').empty();
                    $('#extractedPageLinksInput').prop('disabled',false);
                    $('#extractedPageLinksSubmit').prop('disabled',false);
                    $('#extractedPageLinksSubmit').text('Lookup!');
                    $('#extractedPageLinksPre').append("<span>Unable to connect! Please try again later.</span>");
                } else {
                    $('#navExtractURLs').css('display','none');
                    $('#extractedURLs').css('display','none');
                }
            }
        });
    }
    
    catch(err) {
        console.log("Extracted URLs: ", err);
    }    
}

function startScanners (url) {
	var getLatestReport = [];
    
	getLatestReport = vt(url);

    revIP(url);
    httpHeaders(url);
    extractURLs(url);
	$('#inputPane').hide();
    $('#adHolder').hide();
	$('#scanResultWindow').show();
	document.getElementById('container').style.cursor = 'auto';
}

	$(document).ready(function () {
        if (getUrlParameter('go') == 'fileLookup') {
            try {
                ga('send', 'event', 'getUrlParameter', 'click', 'fileLookup', {transport: 'beacon'});    
            }
            
            catch (err) {
				console.log("getUrlParameter(fileLookup): ", err);
            }
            $('#urlId').removeClass('active');
            $('#urlId a').attr('aria-expanded','false');
            $('#revIPId').removeClass('active');
            $('#revIPId a').attr('aria-expanded','false');
            $('#httpId').removeClass('active');
            $('#httpId a').attr('aria-expanded','false');
            $('#extractedId').removeClass('active');
            $('#extractedId a').attr('aria-expanded','false');
            $('#sslId').removeClass('active');
            $('#sslId a').attr('aria-expanded','false');
            $('#urlLookup').attr('class','tab-pane fade');
            $('#whoisLookup').attr('class','tab-pane fade');
            $('#reverseIPlookup').attr('class','tab-pane fade');
            $('#httpHeadersLookup').attr('class','tab-pane fade');
            $('#extractedPageLinks').attr('class','tab-pane fade');
            $('#sslChecker').attr('class','tab-pane fade');
        }
        
        if (getUrlParameter('go') == 'whois') {
            try {
                ga('send', 'event', 'getUrlParameter', 'click', 'Whois Lookup', {transport: 'beacon'});    
            }            
            catch (err) {
				console.log("getUrlParameter(whoisLookup): ", err);
            }
            $('#urlId').removeClass('active');
            $('#urlId a').attr('aria-expanded','false');
            $('#revIPId').removeClass('active');
            $('#revIPId a').attr('aria-expanded','false');
            $('#httpId').removeClass('active');
            $('#httpId a').attr('aria-expanded','false');
            $('#extractedId').removeClass('active');
            $('#extractedId a').attr('aria-expanded','false');
            $('#sslId').removeClass('active');
            $('#sslId a').attr('aria-expanded','false');            
            $('#urlLookup').attr('class','tab-pane fade');
            $('#reverseIPlookup').attr('class','tab-pane fade');
            $('#httpHeadersLookup').attr('class','tab-pane fade');
            $('#extractedPageLinks').attr('class','tab-pane fade');
            $('#sslChecker').attr('class','tab-pane fade');
        }
        if (getUrlParameter('go') == 'reverseIP') {
            try {
                ga('send', 'event', 'getUrlParameter', 'click', 'Reverse IP Lookup', {transport: 'beacon'});    
            }
            
            catch (err) {
				console.log("getUrlParameter(whoisLookup): ", err);
            }
            $('#urlId').removeClass('active');
            $('#urlId a').attr('aria-expanded','false');
            $('#whoisId').removeClass('active');
            $('#whoisId a').attr('aria-expanded','false');
            $('#httpId').removeClass('active');
            $('#httpId a').attr('aria-expanded','false');
            $('#extractedId').removeClass('active');
            $('#extractedId a').attr('aria-expanded','false');
            $('#sslId').removeClass('active');
            $('#sslId a').attr('aria-expanded','false');            
            $('#revIPId').addClass('active');
            $('#revIPId a').attr('aria-expanded','true');            
            $('#urlLookup').attr('class','tab-pane fade');
            $('#httpHeadersLookup').attr('class','tab-pane fade');
            $('#extractedPageLinks').attr('class','tab-pane fade');
            $('#sslChecker').attr('class','tab-pane fade');
            $('#reverseIPlookup').attr('class','tab-pane fade active in');
        }        
        if (getUrlParameter('go') == 'sslChecker') {
            try {
                ga('send', 'event', 'getUrlParameter', 'click', 'sslChecker', {transport: 'beacon'});    
            }            
            catch (err) {
				console.log("getUrlParameter(sslChecker): ", err);
            }
            $('#urlId').removeClass('active');
            $('#urlId a').attr('aria-expanded','false');
            $('#fileId').removeClass('active');
            $('#fileId a').attr('aria-expanded','false');
            $('#httpId').removeClass('active');
            $('#httpId a').attr('aria-expanded','false');
            $('#extractedId').removeClass('active');
            $('#extractedId a').attr('aria-expanded','false');
            $('#revIPId').removeClass('active');
            $('#revIPId a').attr('aria-expanded','false');
            
            $('#sslId').addClass('active');
            $('#sslId a').attr('aria-expanded','true');
            
            $('#urlLookup').attr('class','tab-pane fade');
            $('#fileLookup').attr('class','tab-pane fade');
            $('#httpHeadersLookup').attr('class','tab-pane fade');
            $('#extractedPageLinks').attr('class','tab-pane fade');
            $('#reverseIPlookup').attr('class','tab-pane fade');
            $('#sslChecker').attr('class','tab-pane fade active in');
        }
        
        try {
            var url = getUrlParameter('url');
            if (url === undefined || url === "") {
                console.log("thisURL: ", url);    
            } else {
                try {
                    ga('send', 'event', 'URL Scan', 'sumbit', 'URL scan: Submitted through contextMenu or AddressBar', {transport: 'beacon'});
                }
                catch (err) {
                    console.log("getUrlParameter(URL Scan): ", err);
                }
                $('#urlLookup .info').empty();
                $('#urlLookup .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
                $('#url-input').attr('placeholder', url);
                $('#url-input').prop('disabled',true);
                $('#url-input').css('cursor','not-allowed');
                $('#url-submit').text("Scanning..");
                $('#url-submit').prop("disabled", true);
                $('#url-submit').css('cursor','wait');
                $('#inputPane').css('cursor','wait');
                console.log("thisURL: ", url);
                

                try {
                    var reqV = new XMLHttpRequest();
                    reqV.open('GET', 'http://www.urlvoid.com/update-report/' + url, true);
                    reqV.send(null);    
                }
                
                catch (err) {
                    console.log("URLVoid latest report Call: ", err);
                }
                
                setTimeout(function(){
                    var url = window.location.href;
                    console.log(urltest);
                    startScanners(url);
                }, 1000);
            }
        }
        
        catch(err) {
            console.log("ContextMenu Call: ", err);
        }
        		
		
        $('#searchBox').keypress(function(e) {
            if(e.which == 13) {
                var keyword = $(this).val();
                console.log(keyword);
//                https://www.google.com/#q=site:
                if (keyword == "" || keyword == undefined) {
                    //empty
                    $("#urlModal").modal("show");
                } else {
                    try {
                        ga('send', 'event', 'Google Search', 'sumbit', 'Google search: press enter', {transport: 'beacon'});
                    }

                    catch (err) {
                        console.log("Google Search: ", err);
                    }
                    
                    var searchURL = "https://www.google.com/#q=malware%2B" + keyword;
                    window.open(searchURL, '_blank');
                }
            }
        });
            
        $('#url-input').keypress(function(e) {
            if(e.which == 13) {
                var url = "";
                var arrayOfURLs = $('#url-input').val().split('\n');
                console.log(arrayOfURLs.length);
                if (arrayOfURLs.length == 1) {
                    var urlregex = new RegExp("[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*");
                    var validateURL = urlregex.test(arrayOfURLs[0]);
                    console.log("Valid input? ", validateURL);
                    if (validateURL == true) {
                        try {
                            ga('send', 'event', 'URL Scan', 'sumbit', 'URL scan: press enter', {transport: 'beacon'});
                        }

                        catch (err) {
                            console.log("URL Scan: ", err);
                        }

                        $('#urlLookup .info').empty();
                        $('#urlLookup .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
                        $('#url-input').prop('disabled',true);
                        $('#url-input').css('cursor','not-allowed');
                        
                        $('#url-submit').text("Scanning..");
                        $('#url-submit').prop("disabled", true);
        //				$('#loading').show();
        //				$('#loading').addClass("active");
                        $('#url-submit').css('cursor','wait');
                        $('#inputPane').css('cursor','wait');

                        url = arrayOfURLs[0].replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
                        //console.log("domain: ", url);

                        
                        //URLVoid latest report
                        var reqV = new XMLHttpRequest();
                        reqV.open('GET', 'http://www.urlvoid.com/update-report/' + url, true);
                        reqV.send(null);

                        setTimeout(function(){
                            var url = window.location.href;
                            console.log(urltest);
                            startScanners(url);
                        }, 1000);
                    } else {
                        $("#urlModal").modal("show");
                        $('#url-input').val('');
                    }
                } else {
                    for (i = 0; i < arrayOfURLs.length; i++) {
                        url += arrayOfURLs[i].replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0] + "\\n";
                    }
                    alert("You've exceeded the allowed limit of 1 URL scan at a time!");
                }
            }
//            $('*').toggleClass('wait');
        });
		
		
	    $('#url-submit').click(function () {
//		$('*').toggleClass('wait');
		var arrayOfURLs = $('#url-input').val().split('\n');
//		console.log(arrayOfURLs, arrayOfURLs.length);
		var url = "";
		//url += "\n" + url.split('.').pop();
		
		if (arrayOfURLs.length == 1) {
			var urlregex = new RegExp("[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*");
  			var validateURL = urlregex.test(arrayOfURLs[0]);
			console.log("Valid input? ", validateURL);
			if (validateURL == true) {
				try {
					ga('send', 'event', 'URL Scan', 'sumbit', 'URL scan: sumbit button', {transport: 'beacon'});
				}
				
				catch (err) {
					console.log("URL Scan: ", err);
				}
				
				$('#urlLookup .info').empty();
                $('#urlLookup .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
				$('#url-input').prop('disabled',true);
				$('#url-input').css('cursor','not-allowed');
				this.innerHTML = "Scanning..";
				this.disabled = true;
//				$('#loading').show();
//				$('#loading').addClass("active");
				$('#url-submit').css('cursor','wait');
				
				url = arrayOfURLs[0].replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
				//console.log("domain: ", url);
				
                //rev IP lookup
                
                try {
                    //URLVoid latest report
                    var reqV = new XMLHttpRequest();
                    reqV.open('GET', 'http://www.urlvoid.com/update-report/' + url, true);
                    reqV.send(null);    
                }
                
                catch (err) {
					console.log("URLVoid Latest report Call: ", err);
				}
                
				setTimeout(function(){ 
                    var url = window.location.href;
                    console.log(urltest);
					startScanners(url);
				}, 1000);
			} else {
				//alert("Enter a valid URL/DomainName/Subdomain. For example: http://example.com or example.com or subdomain.example.com");
				$("#urlModal").modal("show");
                $('#url-input').val('');
			}
			
			
			
		} else {
			for (i = 0; i < arrayOfURLs.length; i++) {
				url += arrayOfURLs[i].replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0] + "\\n";
			}
			alert("You've exceeded the allowed limit of 1 URL scan at a time!");
		}
	});
        
        //ssl check
        $('#sslURLsubmit').click(function () {
            var url = "";
            var getURL = $('#sslURLinput').val();
            if (getURL != undefined || getURL != "") {
                var urlregex = new RegExp("[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*");
                var validateURL = urlregex.test(getURL);
                console.log("Valid input? ", validateURL);
            }
            
            if (validateURL == true) {
				try {
					ga('send', 'event', 'SSL Check', 'sumbit', 'SSL check: submit button', {transport: 'beacon'});
				}
				
				catch (err) {
					console.log("SSL Check: ", err);
				}
                
                $("#sslTable").empty();
                $('#sslChecker .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
                $('#sslURLinput').prop('disabled',true);
                $('#sslURLsubmit').text("Checking..");
                $('#sslURLsubmit').prop('disabled',true);
				
				url = getURL.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
                
                sslChecker(url);
            } else {
				$("#urlModal").modal("show");
                $('#sslURLinput').val('');
                $('#sslURLsubmit').disabled = false;
			}
        });
        
        $('#sslURLinput').keypress(function(e) {
            if(e.which == 13) {
                var url = "";
                var getURL = $('#sslURLinput').val();
                if (getURL != undefined || getURL != "") {
                    var urlregex = new RegExp("[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*");
                    var validateURL = urlregex.test(getURL);
                    console.log("Valid input? ", validateURL);
                }
                
                if (validateURL == true) {
                    try {
                        ga('send', 'event', 'SSL Check', 'sumbit', 'SSL check: press enter', {transport: 'beacon'});
                    }

                    catch (err) {
                        console.log("SSL Check: ", err);
                    }
                    
                    $("#sslTable").empty();
                    $('#sslChecker .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
                    $('#sslURLinput').prop('disabled',true);
                    $('#sslURLsubmit').text("Checking..");
                    $('#sslURLsubmit').prop('disabled',true);

                    url = getURL.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
                    
                    sslChecker(url);
                } else {
                    $("#urlModal").modal("show");
                    $('#sslURLinput').val('');
                    $('#sslURLsubmit').disabled = false;
                }
            }
        });
        
        //reverse ip lookup
        $('#revIPsubmit').click(function () {
            var url = "";
            var getURL = $('#revIPinput').val();
            if (getURL != undefined || getURL != "") {
                var urlregex = new RegExp("[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*");
                var validateURL = urlregex.test(getURL);
            }
            
            if (validateURL == true) {
				try {
					ga('send', 'event', 'Reverse IP Lookup', 'sumbit', 'Reverse IP Lookup: submit button', {transport: 'beacon'});
				}
				
				catch (err) {
					console.log("Reverse IP Lookup: ", err);
				}
                
                $("#revIPpre").empty();
                $('#reverseIPlookup .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
                $('#revIPinput').prop('disabled',true);
                $('#revIPsubmit').text("Looking up..");
                $('#revIPsubmit').prop('disabled',true);
				
				url = getURL.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
                
                revIP(url,'homepage');
            } else {
				$("#urlModal").modal("show");
                $('#revIPinput').val('');
                $('#revIPsubmit').disabled = false;
			}
        });
        
        $('#revIPinput').keypress(function(e) {
            if(e.which == 13) {
                var url = "";
                var getURL = $('#revIPinput').val();
                if (getURL != undefined || getURL != "") {
                    var urlregex = new RegExp("[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*");
                    var validateURL = urlregex.test(getURL);
                }
                
                if (validateURL == true) {
                    try {
                        ga('send', 'event', 'Reverse IP Lookup', 'sumbit', 'Reverse IP Lookup: press enter', {transport: 'beacon'});
                    }

                    catch (err) {
                        console.log("Reverse IP Lookup: ", err);
                    }
                    
                    $("#revIPpre").empty();
                    $('#reverseIPlookup .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
                    $('#revIPinput').prop('disabled',true);
                    $('#revIPsubmit').text("Looking up..");
                    $('#revIPsubmit').prop('disabled',true);

                    url = getURL.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
                    
                    revIP(url,'homepage');
                } else {
                    $("#urlModal").modal("show");
                    $('#revIPinput').val('');
                    $('#revIPsubmit').disabled = false;
                }
            }
        });
        
        //http headers
        $('#httpSubmit').click(function () {
            var url = "";
            var getURL = $('#httpInput').val();
            if (getURL != undefined || getURL != "") {
                var urlregex = new RegExp("[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*");
                var validateURL = urlregex.test(getURL);
            }
            
            if (validateURL == true) {
				try {
					ga('send', 'event', 'HTTP Headers', 'sumbit', 'HTTP Headers: submit button', {transport: 'beacon'});
				}
				
				catch (err) {
					console.log("HTTP Headers: ", err);
				}
                
                $("#httpPre").empty();
                $('#httpHeadersLookup .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
                $('#httpInput').prop('disabled',true);
                $('#httpSubmit').text("Looking up..");
                $('#httpSubmit').prop('disabled',true);
				
				url = getURL.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
                
                httpHeaders(url,'homepage');
            } else {
				$("#urlModal").modal("show");
                $('#httpInput').val('');
                $('#httpSubmit').disabled = false;
			}
        });
        
        $('#httpInput').keypress(function(e) {
            if(e.which == 13) {
                var url = "";
                var getURL = $('#httpInput').val();
                if (getURL != undefined || getURL != "") {
                    var urlregex = new RegExp("[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*");
                    var validateURL = urlregex.test(getURL);
                }
                
                if (validateURL == true) {
                    try {
                        ga('send', 'event', 'HTTP Headers', 'sumbit', 'HTTP Headers: press enter', {transport: 'beacon'});
                    }

                    catch (err) {
                        console.log("HTTP Headers: ", err);
                    }
                    
                    $("#httpPre").empty();
                    $('#httpHeadersLookup .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
                    $('#httpInput').prop('disabled',true);
                    $('#httpSubmit').text("Looking up..");
                    $('#httpSubmit').prop('disabled',true);

                    url = getURL.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
                    
                    httpHeaders(url,'homepage');
                } else {
                    $("#urlModal").modal("show");
                    $('#httpInput').val('');
                    $('#httpSubmit').disabled = false;
                }
            }
        });
        
        //extracted URLs
        $('#extractedPageLinksSubmit').click(function () {
            var url = "";
            var getURL = $('#extractedPageLinksInput').val();
            if (getURL != undefined || getURL != "") {
                var urlregex = new RegExp("[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*");
                var validateURL = urlregex.test(getURL);
            }
            
            if (validateURL == true) {
				try {
					ga('send', 'event', 'Extracted URLs', 'sumbit', 'Extracted URLs: submit button', {transport: 'beacon'});
				}
				
				catch (err) {
					console.log("Extracted URLs: ", err);
				}
                
                $("#extractedPageLinksPre").empty();
                $('#extractedPageLinks .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
                $('#extractedPageLinksInput').prop('disabled',true);
                $('#extractedPageLinksSubmit').text("Looking up..");
                $('#extractedPageLinksSubmit').prop('disabled',true);
				
				url = getURL.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
                
                extractURLs(url,'homepage');
            } else {
				$("#urlModal").modal("show");
                $('#extractedPageLinksInput').val('');
                $('#extractedPageLinksSubmit').disabled = false;
			}
        });
        
        $('#extractedPageLinksInput').keypress(function(e) {
            if(e.which == 13) {
                var url = "";
                var getURL = $('#extractedPageLinksInput').val();
                if (getURL != undefined || getURL != "") {
                    var urlregex = new RegExp("[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*");
                    var validateURL = urlregex.test(getURL);
                }
                
                if (validateURL == true) {
                    try {
                        ga('send', 'event', 'Extracted URLs', 'sumbit', 'Extracted URLs: press enter', {transport: 'beacon'});
                    }

                    catch (err) {
                        console.log("Extracted URLs: ", err);
                    }
                    
                    $("#extractedPageLinksPre").empty();
                    $('#extractedPageLinks .info').append( "<span class='glyphicon glyphicon-refresh-animate'></span> Please wait..</span>" );
                    $('#extractedPageLinksInput').prop('disabled',true);
                    $('#extractedPageLinksSubmit').text("Looking up..");
                    $('#extractedPageLinksSubmit').prop('disabled',true);

                    url = getURL.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
                    
                    extractURLs(url,'homepage');
                } else {
                    $("#urlModal").modal("show");
                    $('#extractedPageLinksInput').val('');
                    $('#extractedPageLinksSubmit').disabled = false;
                }
            }
        });
        
	});