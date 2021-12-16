function save_options() {
  var lowcheck = document.getElementById('Low').checked;
  var mediumcheck = document.getElementById('Medium').checked;
  chrome.storage.sync.set({
    low: lowcheck,
    medium: mediumcheck
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    low: true,
    medium: true
  }, function(items) {
    document.getElementById('Low').checked = items.low;
    document.getElementById('Medium').checked = items.medium;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
el = document.getElementById('save')
if(el){
  el.addEventListener('click',save_options);
}