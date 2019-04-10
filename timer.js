class Timer {
  constructor(elem) {
    this.id = 0;
    this.start = 0;

    this.elem = elem;

    var hms = document.createElement('span');
    hms.setAttribute('id', 'hms')
    hms.appendChild(document.createTextNode('0'));

    var cs = document.createElement('span');
    cs.setAttribute('id', 'ms');
    cs.appendChild(document.createTextNode('00'));

    while (this.elem.firstChild) {
      this.elem.removeChild(this.elem.firstChild);
    }
    this.elem.appendChild(hms);
    this.elem.appendChild(cs);

    this.elem.addEventListener('click', this.toggle.bind(this));

    this.time = 0;
  }

  get time() {
    return this.timeVal;
  }

  set time(v) {
    this.timeVal = v;

    var cs = Math.floor(v / 10) % 100;
    var s = Math.floor(v / 1000) % 60;
    var m = Math.floor(v / 60 / 1000) % 60;
    var h = Math.floor(v / 60 / 60 / 1000);

    var t = s;
    if (v >= 60000) {
      t = m + ':' + (s < 10 ? '0' : '') + t;
      if (v >= 3600000) {
        t = h + ':' + (m < 10 ? '0' : '') + t;
      }
    }

    this.elem.firstChild.innerText = t;
    this.elem.lastChild.innerText = (cs < 10 ? '0' : '') + cs;
  }

  update() {
    this.time = performance.now() - this.start;
    this.id = window.requestAnimationFrame(this.update.bind(this));
  }

  toggle() {
    if (this.id == 0) {
      this.start = performance.now() - this.time;
      this.id = window.requestAnimationFrame(this.update.bind(this));
    } else {
      window.cancelAnimationFrame(this.id);
      this.id = 0;
      this.time = performance.now() - this.start;
    }
  }
}

var timer = new Timer(document.getElementById('timer'));

$(document).keypress(function(e) {
  if (e.key == ' ') {
    timer.toggle();
    e.preventDefault();
  }
});
