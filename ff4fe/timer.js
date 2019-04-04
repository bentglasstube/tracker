$(function() {

  var timer = { id: 0, time: 0, start: 0 };

  function toggle() {
    if (timer.id == 0) {
      timer.start = performance.now() - timer.time;
      timer.id = setInterval(function() {
        timer.time = performance.now() - timer.start;

        var cs = Math.floor(timer.time / 10) % 100;
        var s = Math.floor(timer.time / 1000) % 60;
        var m = Math.floor(timer.time / 60 / 1000) % 60;
        var h = Math.floor(timer.time / 60 / 60 / 1000);

        var t = s;
        if (timer.time >= 60000) {
          t = m + ':' + (s < 10 ? '0' : '') + t;
          if (timer.time >= 3600000) {
            t = h + ':' + (m < 10 ? '0' : '') + t;
          }
        }

        $('#timer #hms').text(t);
        $('#timer #ms').text((cs < 10 ? '0' : '') + cs);
      }, 10);
    } else {
      clearInterval(timer.id);
      timer.id = 0;
      timer.time = performance.now() - timer.start;
    }
  }

  $(document).keypress(function(e) {
    if (e.key == ' ') {
      toggle();
      e.preventDefault();
    }
  });

  $('#timer').click(function(e) { toggle(); });
});
