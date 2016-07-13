chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if(request.message == "pass url")
			chrome.runtime.sendMessage({ "message" : "url sent", "downloadUrl" : window.location.href })
		
		if(request.message == "put url in box")
			{
				console.log(request.downloadUrl)
				document.getElementsByName("url")[0].value = request.downloadUrl;
				$("#go-button").click();
			}

		if(request.message == "fetch download link")
			{
				var downloadUrl = ''
				var links = document.getElementsByTagName("a");
				for(var i=0;i<links.length;i++)
					//console.log(links[i].href);
					if(links[i].href.length>downloadUrl.length)
						downloadUrl = links[i].href;
				console.log(downloadUrl.slice(62,downloadUrl.length));
				console.log(downloadUrl.slice(51,56));
				completeUrl = "http://" + downloadUrl.slice(51,downloadUrl.indexOf("&")) + ".listentoyoutube.com/download/" + downloadUrl.slice(62,downloadUrl.length);
				console.log(completeUrl);
				window.location.href = completeUrl;
				setTimeout(function(){chrome.runtime.sendMessage({ "message" : "downloadUrl", "downloadUrl" : completeUrl });},2000);
			}

		/*if(request.message == "downloadit")
			{
				completeUrl = $('audio')[0].children[0].src;
				setTimeout(function(){chrome.runtime.sendMessage({ "message" : "completeUrl", "completeUrl" : completeUrl });},5000);
			}*/
})
