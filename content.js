chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){

		if(request.message == "pass url")
			chrome.runtime.sendMessage({ "message" : "url sent", "quality" : request.quality, "downloadUrl" : window.location.href })
		
		if(request.message == "downloadIt")
			{
				if(request.quality == "high")
					{	
						var downloadUrl = ''
						var links = document.getElementsByTagName("a");
						for(var i=0;i<links.length;i++)
						if(links[i].href.length>downloadUrl.length)
							downloadUrl = links[i].href;
						//console.log(downloadUrl.slice(62,downloadUrl.length));
						//console.log(downloadUrl.slice(51,56));
						completeUrl = "http://" + downloadUrl.slice(51,downloadUrl.indexOf("&")) + ".listentoyoutube.com/download/" + downloadUrl.slice(62,downloadUrl.length);
						//console.log(completeUrl);
						window.location.href = completeUrl;
						setTimeout(function(){chrome.runtime.sendMessage({ "message" : "closeTab" });},2000);
					}

				if(request.quality == "low")
					{	
						var x = document.getElementById('download');
						window.location.href = x.href;
						setTimeout(function(){chrome.runtime.sendMessage({ "message" : "closeTab" });},2000);
					}
			}
})