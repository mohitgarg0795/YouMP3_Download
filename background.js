var tabId, flag = 0;

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
				chrome.tabs.create({ "url" : "http://www.listentoyoutube.com/process.php?url=" + request.downloadUrl, active : false }, function(tab){
					tabId = tab.id;
				})
			}
		if(request.message == "closeTab")
			{
				flag = 0;				//in case of successful download, reset flag to default
				chrome.tabs.remove(tabId);
			};
})


chrome.tabs.onUpdated.addListener(function(tabid, info, tab){
	//console.log(tab)
    if(info.status == "complete" && tab.id==tabId)
    	{	
    		if(flag==1)
    			{
    				//console.log("flag" + flag);
    				flag++;
    				chrome.tabs.sendMessage(tabId, { "message" : "downloadIt" });
    			}
    		else
    			{
    				if(flag==2)				//in case of invalid links
    					{	
    						flag = 0;
    						chrome.tabs.remove(tabId);
    					}
    			}
    	}
});