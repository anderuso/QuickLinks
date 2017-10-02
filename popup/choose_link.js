function onCreated(windowInfo) {
  console.log(`Created window: ${windowInfo.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("site")) {
    var chosenBeastURL = e.target.textContent;

	var creating = browser.tabs.create({url: "https://" + chosenBeastURL});
	creating.then(onCreated, onError);
  }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
  }
});
