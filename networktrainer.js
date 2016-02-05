function Trainer() {
  this.inputs = [];
  this.answer;
}

Trainer.prototype = {
  constructor: Trainer,

  create: function(x, y, answer) {
    this.inputs[0] = x;
    this.inputs[1] = y;
    this.inputs[2] = 1;
    this.answer = answer;
  }
}
