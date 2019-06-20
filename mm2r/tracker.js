$(function() {
  $('.bosses img').click(e => {
    $(e.target).toggleClass('done');
  });
});
