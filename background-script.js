browser.runtime.onMessage.addListener(notify);

function notify(message)
{
    console.log(`Background notification received: ${message}`);
    var creating = browser.tabs.create({url: message.url});
    creating.then(onCreated, onError);
}

function onCreated(windowInfo)
{
  console.log(`Created window: ${windowInfo.id}`);
}

function onError(error)
{
  console.log(`Error: ${error}`);
}

