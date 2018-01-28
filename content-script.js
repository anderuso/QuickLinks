_activationPressed = false;
_keyPressed = "";
_activation = {ctrlKey: true, altKey: false, shiftKey: false, key: " "};

function activationSettingsLoaded(data)
{
    // browser.storage.onChanged is sending activation object,
    // browser.storage.local.get sends activation object as property of other object
    var activation = data;
    if (typeof data.activation !== "undefined")
    {
        activation = data.activation;
    }
    _activation = activation;
}

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey == _activation.ctrlKey && 
        e.altKey == _activation.altKey &&
        e.shiftKey == _activation.shiftKey &&
        e.key == _activation.key)
    {
        _activationPressed = true;
        return;
    }
    
    if (_activationPressed)
    {
        _keyPressed = e.key;
        e.stopPropagation();
        e.preventDefault();

        var getting = browser.storage.local.get("links");
        getting.then(onGotLinkLoaded, onError);
    }
    _activationPressed = false;
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
        if (_keyPressed == link.key)
        {
            browser.runtime.sendMessage({"url": link.url});
            break;
        }
    }
}

var gettingActivation = browser.storage.local.get("activation");
gettingActivation.then(activationSettingsLoaded, onError);

browser.storage.onChanged.addListener((e) => {
    activationSettingsLoaded(e.activation.newValue);
});