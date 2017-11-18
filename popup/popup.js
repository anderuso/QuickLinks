function onCreated(windowInfo)
{
    console.log(`Created window: ${windowInfo.id}`);
}

function onError(error)
{
    console.log(`Error: ${error}`);
}

function createLink(linkData)
{
    var linkRow = document.createElement('tr');
    linkRow.setAttribute("class", "row site");
    var titleCell = document.createElement('td');
    titleCell.textContent = linkData.title;
    titleCell.setAttribute("class", "title link");
    titleCell.url = linkData.url;
    var keyCell = document.createElement('td');
    keyCell.textContent = linkData.key;
    keyCell.setAttribute("class", "key link");
    keyCell.url = linkData.url;

    linkRow.appendChild(titleCell);
    linkRow.appendChild(keyCell);

    return linkRow;
}

function onGotLinkLoaded(item)
{
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

document.addEventListener("click", (e) => {
    if (typeof e.target.classList !== "undefined")
    {
        if (e.target.classList.contains("link"))
        {
            var chosenUrl = e.target.url;

            var creating = browser.tabs.create({url: chosenUrl});
            creating.then(onCreated, onError);
            window.close();
        }
        else if (e.target.classList.contains("options"))
        {
            browser.runtime.openOptionsPage()
        }
    }
});

var getting = browser.storage.local.get("links");
getting.then(onGotLinkLoaded, onError);
