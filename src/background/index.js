// var match = new chrome.declarativeWebRequest.RequestMatcher({
//   url: { hostSuffix: "example.com" }
//   // url: { hostSuffix: "example.com", pathContains: "foo" }
// });
// var rule1 = {
//   conditions: [match],
//   actions: [new chrome.declarativeWebRequest.CancelRequest()]
// };
// chrome.declarativeWebRequest.onRequest.addRules([rule1]);

// chrome.webNavigation.onCommitted.addListener(
//   function(e) {
//     // ...
//     console.log("dddddddddddddddddddd");
//   },
//   {
//     url: [{ hostSuffix: "google.com" }, { hostSuffix: "google.ca" }]
//   }
// );

console.log("react-detector background script started!");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.react) {
    chrome.pageAction.show(sender.tab.id);
    console.log("ReactJS found at:", sender.tab.url);
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { toggleOutlines: true });
});

var notification = webkitNotifications.createNotification(
  "48.png", // icon url - can be relative
  "Hello!", // notification title
  "Lorem ipsum..." // notification body text
);
notification.show();
