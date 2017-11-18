activationPressed = false;
keyPressed = "";

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key == " ")
    {
        activationPressed = true;
        return;
    }
    if (activationPressed)
    {
        console.log(`content document keypress Key: ${e.key}`);
        keyPressed = e.key;
        e.stopPropagation();
        e.preventDefault();

        var getting = browser.storage.local.get("links");
        getting.then(onGotLinkLoaded, onError);
    }
    activationPressed = false;
});

function onError(error)
{
  console.log(`Error: ${error}`);
}

function onGotLinkLoaded(item)
{
    for (i = 0; i < item.links.length; i++)
    {
        var link = item.links[i];
        if (keyPressed == link.key)
        {
            console.log(`Content sending message: ${link.url}`);
            browser.runtime.sendMessage({"url": link.url});
            break;
        }
    }
}
