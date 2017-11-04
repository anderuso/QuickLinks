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
	var button = document.getElementById("addUpdateLinkButton");
	button.textContent = "Update";
	button.disabled = false;
}

function showAddButton()
{
	var button = document.getElementById("addUpdateLinkButton");
	button.textContent = "Add";
	button.disabled = true;
}

function addOrUpdateLink()
{
	var button = document.getElementById("addUpdateLinkButton");
	if (button.textContent == "Add")
	{
		console.log("addLink");
		addLink();
	}
	else if (button.textContent == "Update")
	{
		console.log("updateLink");
		updateLink();
	}
	else
	{
		console.log(`Uknown button text: ${button.textContent}`);
	}
}

function addLink()
{
	var linkTitleInput = document.getElementById("linkTitle");
	var linkUrlInput = document.getElementById("linkUrl");
	var linkKeyInput = document.getElementById("linkKey");
	_links.push({title: linkTitleInput.value, url: new URL(linkUrlInput.value).href, key: linkKeyInput.value});
	showLinks();
	linkTitleInput.value = "";
	linkUrlInput.value = "";
	linkKeyInput.value = "";
}

function updateLink() 
{
	var linkTitleInput = document.getElementById("linkTitle");
	var linkUrlInput = document.getElementById("linkUrl");
	var linkKeyInput = document.getElementById("linkKey");
	var linkIndexInput = document.getElementById("linkIndex");
	var index = parseInt(linkIndexInput.value);
	if (index != Number.NaN)
	{
		_links[index] = {title: linkTitleInput.value, url: new URL(linkUrlInput.value).href, key: linkKeyInput.value};
		showLinks();
		linkTitleInput.value = "";
		linkUrlInput.value = "";
		linkKeyInput.value = "";
		linkIndexInput.value = "";
	}
	else
	{
		console.log(`Update link index is undefined: ${linkIndexInput.value}`);
	}
	showAddButton();
}

function editLink()
{
	var editBtn = this;
	var index = Number(editBtn.id);
	if (typeof index !== "undefined")
	{
		var linkTitleInput = document.getElementById("linkTitle");
		var linkUrlInput = document.getElementById("linkUrl");
		var linkKeyInput = document.getElementById("linkKey");
		var linkIndexInput = document.getElementById("linkIndex");
		var linkData = _links[index];
		linkTitleInput.value = linkData.title;
		linkUrlInput.value = linkData.url;
		linkKeyInput.value = linkData.key;
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

function validateUrl()
{
    var addBtn = document.getElementById("addUpdateLinkButton");
	var linkTitleInput = document.getElementById("linkTitle");
	var linkUrlInput = document.getElementById("linkUrl");
	try
	{
		var url = new URL(linkUrlInput.value);
		validUrl = true;
	}
	catch(err)
	{
		validUrl = false;
	}
	addBtn.disabled = !(validUrl && linkTitleInput.value.length > 0);
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
document.getElementById("addUpdateLinkButton").addEventListener("click", addOrUpdateLink);
document.getElementById("linkTitle").addEventListener("input", validateUrl);
document.getElementById("linkUrl").addEventListener("input", validateUrl);
