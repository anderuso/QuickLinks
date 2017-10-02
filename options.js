function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    link: document.querySelector("#link").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#link").value = result.link || "bing.com";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("link");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
