var contents = $('#toc a');

contents.each(function (index, e) {
  var link = $(e).attr('href');
  chrome.storage.local.get(link, function(res) {
    setFlag(!!res[link], link, e);
  });
});

function setFlag(f, link, e) {
  var flag = f;
  var checkbox = $('<input type="checkbox" class="todo-done" name="' + link + '"' + (flag ? ' checked' : '') + ' />');
  checkbox.on('click', function () {
    if ($(this).prop('checked')) {
      chrome.storage.local.set({
        [link]: true
      });
    } else {
      chrome.storage.local.remove(link);
    }
  });
  $(e).before(checkbox);
}
