function save_options() {
  var lowcheck = document.getElementById('Low').checked;
  chrome.storage.sync.set({
    low: lowcheck,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('Low');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    low: true,
  }, function(items) {
    document.getElementById('Low').checked = items.low;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);

document.querySelector('#go-to-options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('urlinfo.html'));
  }
});