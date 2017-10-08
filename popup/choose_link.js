function onCreated(windowInfo) {
  console.log(`Created window: ${windowInfo.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function createLink(linkUrl) {
	var linkDiv = document.createElement('div');
	linkDiv.setAttribute("class", "button site");
	linkDiv.textContent = linkUrl;
	
	return linkDiv;
}

function onGot(item) {
	var linksDiv = document.getElementById("links");
	linksDiv.innerHTML = "";
	if (item.links)
	{
		for (i = 0; i < item.links.length; i++)
		{
			var optionLink = createLink(item.links[i])
			linksDiv.appendChild(optionLink);
		}
	}
	else
	{
		var optionLink = createLink("Nothing found in options")
		linksDiv.appendChild(optionLink);
	}
}

var getting = browser.storage.local.get("links");
getting.then(onGot, onError);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("site")) {
    var chosenBeastURL = e.target.textContent;

	var creating = browser.tabs.create({url: "https://" + chosenBeastURL});
	creating.then(onCreated, onError);
	window.close();
  }
  else if (e.target.classList.contains("options")) {
	browser.runtime.openOptionsPage()  }
});
