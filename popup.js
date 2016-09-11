document.getElementById("high").onclick = function(){
	chrome.runtime.sendMessage({ "message" : "checkUrl", "quality" : "high"});
}

document.getElementById("low").onclick = function(){
	chrome.runtime.sendMessage({ "message" : "checkUrl", "quality" : "low"});
}