function Perceptron() {
  this.weights = [];
  this.learningconstant = 0.00557981;
}

Perceptron.prototype = {
  constructor: Perceptron,
  // Constructor
  create: function(n) {
    for(var i = 0; i < n; i++) {
      // Derived formula for picking a number from (-1, 1);
      this.weights[i] = (Math.random() * (1 * 2)) - 1;
    }
  },

  // Recieve inputs and generate outputs
  feedforeward: function(inputs) {
    var sum = 0;
    for(var i = 0; i < this.weights.length; i++) {
      sum += inputs[i]*this.weights[i];
      //console.log(this.weights[i]);
    }
    //console.log("sum: " + sum);
    return this.activate(sum);
  },

  activate: function(sum) {
    return (sum > 0) ? 1 : -1;
  },

  train: function(inputs, desired) {
    var guess = this.feedforeward(inputs);
    var error = desired - guess;

    for(var i = 0; i < this.weights.length; i++) {
      this.weights[i] += this.learningconstant * error * inputs[i];
    }
  }
}
