_links = [];

function saveOptions(e) 
{
  e.preventDefault();
  browser.storage.local.set({
    links: _links
  });
}

function showUpdateButton()
{
	document.getElementById("newLinkDiv").style.display = "none";
	document.getElementById("updateLinkDiv").style.display = "block";
}

function showAddButton()
{
	document.getElementById("newLinkDiv").style.display = "block";
	document.getElementById("updateLinkDiv").style.display = "none";
}

function addLink()
{
	var linkTitleInput = document.getElementById("newLinkTitle");
	var linkUrlInput = document.getElementById("newLinkUrl");
	var linkKeyInput = document.getElementById("newLinkKey");
	_links.push({title: linkTitleInput.value, url: linkUrlInput.value, key: linkKeyInput.value});
	showLinks();
	linkTitleInput.value = "";
	linkUrlInput.value = "";
	linkKeyInput.value = "";
}

function updateLink() 
{
	var linkTitleInput = document.getElementById("updateLinkTitle");
	var linkUrlInput = document.getElementById("updateLinkUrl");
	var linkKeyInput = document.getElementById("updateLinkKey");
	var linkIndexInput = document.getElementById("linkIndex");
	var index = parseInt(linkIndexInput.value);
	if (index != Number.NaN)
	{
		_links[index] = {title: linkTitleInput.value, url: linkUrlInput.value, key: linkKeyInput.value};
		showLinks();
		linkTitleInput.value = "";
		linkUrlInput.value = "";
		linkKeyInput.value = "";
		linkIndexInput.value = "";
	}
	else
	{
		console.log(`Update link index is undefined: ${updateLinkText.value}`);
	}
	showAddButton();
}

function editLink()
{
	var editBtn = this;
	var index = Number(editBtn.id);
	if (typeof index !== "undefined")
	{
		var linkTitleInput = document.getElementById("updateLinkTitle");
		var linkUrlInput = document.getElementById("updateLinkUrl");
		var linkKeyInput = document.getElementById("updateLinkKey");
		var linkIndexInput = document.getElementById("linkIndex");
		linkTitleInput.value = _links[index].title;
		linkUrlInput.value = _links[index].url;
		linkKeyInput.value = _links[index].key;
		linkIndexInput.value = index;
		showUpdateButton();
	}
	else
	{
		console.log(`Edit button id is undefined: ${editBtn.id}`);
	}
}

function removeLink()
{
	var removeBtn = this;
	var index = Number(removeBtn.id);
	if (typeof index !== "undefined")
	{
		_links.splice(index, 1);
		showLinks();
	}
	else
	{
		console.log(`Remove button id is undefined: ${removeBtn.id}`);
	}
}

function showLinks() 
{
	var linksDiv = document.getElementById("links");
	linksDiv.innerHTML = "";
	for (i = 0; i < _links.length; i++)
	{
		var linkDiv = document.createElement("div");
		var removeBtn = document.createElement("button");
		removeBtn.innerHTML = "Remove";
		removeBtn.type = "button";
		removeBtn.id = i;
		removeBtn.addEventListener("click", removeLink);
		var editBtn = document.createElement("button");
		editBtn.innerHTML = "Edit";
		editBtn.type = "button";
		editBtn.id = i;
		editBtn.addEventListener("click", editLink);
		linkDiv.textContent = _links[i].title + " " + _links[i].url + " " + _links[i].key;
		linkDiv.appendChild(editBtn);
		linkDiv.appendChild(removeBtn);
		linksDiv.appendChild(linkDiv);
	}
}

function restoreOptions() 
{
  function setCurrentChoice(result) 
  {
    _links = result.links;
	if (typeof _links === "undefined") 
	{
		_links = [];
	}
	showLinks();
  }

  function onError(error) 
  {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("links");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.getElementById("addLinkButton").addEventListener("click", addLink);
document.getElementById("updateLinkButton").addEventListener("click", updateLink);
