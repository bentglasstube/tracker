window.timer = (function() {
  var pad_ = function(num, length) {
    var s = num + '';
    while (s.length < length) {
      s = '0' + s;
    }
    return s;
  };

  var fmt_params_ = {
    c: [0.01, 100],
    t: [0.1, 10],
    s: [1, 60],
    m: [60, 60],
    h: [3600, 24],
    d: [86400, 0],
  };

  var timer = {
    start_:  0,
    time_: 0,
    running_: false,

    // Start the timer
    start: function() {
      if (!this.running_) {
        this.start_ = performance.now() - this.time_;
        this.running_ = true;
      }
    },

    // Stop the timer
    stop: function() {
      if (this.running_) {
        this.running_ = false;
        this.time_ = performance.now() - this.start_;
      }
    },

    // Return wether or not the tiemr is currently running
    running: function() {
      return this.running_;
    },

    // Stop the timer if it is running, otherwise start it
    toggle: function() {
      if (this.running_) {
        this.stop();
      } else {
        this.start();
      }
    },

    // Stop the timer and reset it to zero
    reset: function() {
      this.stop();
      this.start_ = 0;
      this.time_ = 0;
    },

    // Get the current time of the timer in seconds, including fractional part
    // for milliseconds
    get: function() {
      var ms = this.running_ ? performance.now() - this.start_ : this.time_;
      return ms / 1000;
    },

    // Takes a sprintf-like format string and formats the time accordingly.
    // Formats are specified by "% [pad char] [width] type"
    // The following types are supported:
    //    % - literal %
    //    c - hundredths of seconds
    //    t - tenths of seconds
    //    s - seconds
    //    m - minutes
    //    h - hours
    //    d - days
    //
    // Using a lower case letter will format the time moduluo the number of
    // that unit in the next larger unit (except for hundredths of seconds
    // which is moduluo 100).  Using a capital letter will leave the unit
    // whole.  Because there is no unit larger than days, this has no meaning
    // for days.  As an example, if the timer is currently at 329.5 seconds:
    //
    //   %M:%2s.%1t      yields    5:29.5
    //   %S.%1t          yields    329.5
    //   %M:%S.%T        yields    5:329.3295    (this is not useful)
    format: function(fmt) {
      var t = this.get();

      return fmt.replace(/%(\d*)([%ctsmh])/ig, function(match, width, type) {
        if (type == '%') return '%'; // special case for %%
        if (width == '') width = 1; // default width to 1

        var div, mod;
        [div, mod] = fmt_params_[type.toLowerCase()];

        replacement = Math.floor(t / div);
        if (mod > 0 && type == type.toLowerCase()) {
          replacement %= mod;
        }

        return pad_(replacement, width);
      });
    },
  };

  return timer;
}());
