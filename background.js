var tabId, downloadUrl, flag = 0;

chrome.browserAction.onClicked.addListener(function(tab){
	chrome.tabs.query({ active : true, currentWindow : true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, { "message" : "pass url"});
	})
})

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		console.log(request.message)
		if(request.message == "url sent")
			{
				flag = 1;
				downloadUrl = request.downloadUrl;
				chrome.tabs.create({ "url" : "http://www.listentoyoutube.com/", active : false }, function(tab){
					tabId = tab.id
				})
			}
		if(request.message == "downloadUrl")
			{
				//downloadUrl = request.downloadUrl;
				//console.log(downloadUrl);
				chrome.tabs.remove(tabId);
				//chrome.tabs.create({ "url" : request.downloadUrl, active : false });
			}

		/*if(request.message == "completeUrl")
			{
				console.log(request.completeUrl)
				chrome.tabs.create({ "url" : request.completeUrl, active : false });
			}*/
})


chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
	console.log(tab)
    if(info.status == "complete"){
    	if(flag==1)
    		{
    			console.log("first req send " + flag);
    			flag++;
        		chrome.tabs.sendMessage(tabId, { "message" : "put url in box", "downloadUrl" : downloadUrl, "tabId" : tabId });
			}
		else
			{
				if(flag==2)
	    			{
	    				console.log("first req send " + flag);
		    			flag++;
		    			chrome.tabs.sendMessage(tabId, { "message" : "fetch download link" });
	    			}
	    		/*else
	    			/*if(flag==3)				//else if we reload any page, it vl load complete and this statement will execute evertytime
	    				{
	    					flag++;
	    					console.log("mohit" + flag);
	    		/*			//chrome.tabs.sendMessage(tabId, { "message" : "downloadit" });
						}*/
			}
	}
});