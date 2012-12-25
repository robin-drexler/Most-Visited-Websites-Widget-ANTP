var info = {
    poke:3,
    width:1,
    height:1,
    path:"widget.html",
    "v2":{
        "resize":true,
        "min_height":1,
        "max_height":3,
        "min_width":1,
        "max_width":3
    },
    "v3":{
        "multi_placement":false
    }
};

chrome.extension.onMessageExternal.addListener(function (request, sender, sendResponse) {
    if (request === "mgmiemnjjchgkmgbeljfocdjjnpjnmcg-poke") {
        chrome.extension.sendMessage(
            sender.id, {
                head:"mgmiemnjjchgkmgbeljfocdjjnpjnmcg-pokeback",
                body:info,
            });
    }
});

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.purpose === "get") {
        chrome.topSites.get(function (sites) {
            sendResponse({sites: sites});
        });
    }

    if (request.purpose === "goto") {
        chrome.tabs.query({active: true, currentWindow:true}, function (tabs) {
            var tab = tabs[0];

            chrome.tabs.update(tab.id, {url: request.url});
        });
    }

    return true;
});
