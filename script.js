var service = $('#service-name').text().trim().replace(/ /g, '.').toLowerCase();
var contents = $('#toc a');

contents.each(function (index, e) {
  var link = $(e).attr('href');
  var key = service + "." + link;
  chrome.storage.sync.get(key, function(res) {
    setFlag(!!res[key], key, e);
  });
});

function setFlag(f, key, e) {
  var flag = f;
  var checkbox = $('<input type="checkbox" class="todo-done" name="' + key + '"' + (flag ? ' checked' : '') + ' />');
  checkbox.on('click', function () {
    if ($(this).prop('checked')) {
      chrome.storage.sync.set({
        [key]: true
      });
    } else {
      chrome.storage.sync.remove(key);
    }
  });
  $(e).before(checkbox);
}
