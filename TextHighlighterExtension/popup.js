document.getElementById('highlightButton').addEventListener('click', () => {
    const searchText = document.getElementById('searchText').value;

    if (searchText) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];

            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: highlightText,
                args: [searchText],
            });
        });
    }
});

function highlightText(searchText) {
    const regex = new RegExp(searchText, 'gi');
    const elements = document.querySelectorAll('*:not(script):not(style)');

    for (const element of elements) {
        if (element.innerHTML.match(regex)) {
            const html = element.innerHTML.replace(regex, '<span style="background-color: yellow;">$&</span>');

            element.innerHTML = html;
        }
    }
}
