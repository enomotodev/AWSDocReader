var contents = $('#toc a');

contents.each(function (index, e) {
  var link = $(e).attr('href');
  chrome.storage.sync.get(link, function(res) {
    setFlag(!!res[link], link, e);
  });
});

function setFlag(f, link, e) {
  var flag = f;
  var checkbox = $('<input type="checkbox" class="todo-done" name="' + link + '"' + (flag ? ' checked' : '') + ' />');
  checkbox.on('click', function () {
    if ($(this).prop('checked')) {
      chrome.storage.sync.set({
        [link]: true
      });
    } else {
      chrome.storage.sync.remove(link);
    }
  });
  $(e).before(checkbox);
}
