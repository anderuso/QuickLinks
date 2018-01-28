_links = [];

function saveOptions(e) 
{
	e.preventDefault();
    var currentActivation = getActivation();
	browser.storage.local.set({
		links: _links,
        activation: currentActivation
	});
}

function getActivation()
{
    var activation = {ctrlKey: false, altKey: false, shiftKey: false, key: ""};
    var ctrlKey = document.getElementById("ctrlCheck");
    var altKey = document.getElementById("altCheck");
    var shiftKey = document.getElementById("shiftCheck");
    var activationKey = document.getElementById("activationKey");
    if (ctrlKey && altKey && shiftKey && activationKey && activationKey.value != "")
    {
        activation.ctrlKey = ctrlKey.checked;
        activation.altKey = altKey.checked;
        activation.shiftKey = shiftKey.checked;
        activation.key = activationKey.value;
    }
    return activation;
}

function showActivation(activation)
{
    var ctrlKey = document.getElementById("ctrlCheck");
    var altKey = document.getElementById("altCheck");
    var shiftKey = document.getElementById("shiftCheck");
    var activationKey = document.getElementById("activationKey");
    if (ctrlKey && altKey && shiftKey && activationKey && activation)
    {
        ctrlKey.checked = activation.ctrlKey;
        altKey.checked = activation.altKey;
        shiftKey.checked = activation.shiftKey;
        activationKey.value = activation.key;
    }
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
		addLink();
	}
	else if (button.textContent == "Update")
	{
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
	var table = document.getElementById("links");
    table.innerHTML = "";
	for (i = 0; i < _links.length; i++)
	{
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.className  = "title";
		td.textContent = _links[i].title;
		tr.appendChild(td);
		var td = document.createElement("td");
		td.className  = "url";
		td.textContent = _links[i].url;
		tr.appendChild(td);
		var td = document.createElement("td");
		td.className  = "key";
		td.textContent = _links[i].key;
		tr.appendChild(td);
		var td = document.createElement("td");
		var editBtn = document.createElement("button");
		editBtn.innerHTML = "Edit";
		editBtn.type = "button";
		editBtn.id = i;
		editBtn.addEventListener("click", editLink);
		td.appendChild(editBtn);
		tr.appendChild(td);
		var td = document.createElement("td");
		var removeBtn = document.createElement("button");
		removeBtn.innerHTML = "Remove";
		removeBtn.type = "button";
		removeBtn.id = i;
		removeBtn.addEventListener("click", removeLink);
		td.appendChild(removeBtn);
		tr.appendChild(td);
		table.appendChild(tr);
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
    function setLinks(result) 
    {
        _links = result.links;
        if (typeof _links === "undefined") 
        {
            _links = [];
        }
        showLinks();
    }

    function setActivation(result) 
    {
        showActivation(result.activation);
    }

    function onError(error) 
    {
        console.log(`Error: ${error}`);
    }

    var gettingLinks = browser.storage.local.get("links");
    gettingLinks.then(setLinks, onError);
    
    var gettingActivation = browser.storage.local.get("activation");
    gettingActivation.then(setActivation, onError);
}

function openTab(tabName, button) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    button.className += " active";
} 

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.getElementById("addUpdateLinkButton").addEventListener("click", addOrUpdateLink);
document.getElementById("linkTitle").addEventListener("input", validateUrl);
document.getElementById("linkUrl").addEventListener("input", validateUrl);
document.getElementById("existingLinksTab").addEventListener("click", function(){openTab("ExistingLinks", this)});
document.getElementById("activationTab").addEventListener("click", function(){openTab("Activation", this)});
