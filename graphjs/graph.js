/*

A basic framework I created to graph a function and points using an
HTML5 canvas element.

Purpose: To visualize the guesses of my Perceptron class, to see how accurate
it will become over time.

*/

// Create the Graph constructor and add data attributes
function Graph (id, width, height) {
  // Establish our canvas and it's dimensions
  this.screen = document.getElementById(id);
  this.screen.width = width;
  this.screen.height = height;
  this.screenContext = this.screen.getContext("2d");

  // Graph constants
  this.origin = {x : this.screen.width/2, y : this.screen.height/2};

  // Important graph data USER SET
  this.scaleX = null;
  this.scaleY = null;
  this.ticklength = null;
  this.equation = "";
  this.graphTicksEnabled = false;
  this.pointEvaluationEnabled = false;
}

// Overwrite the Graph Prototype and add behavior
Graph.prototype = {
  defineScale: function(scaleX, scaleY, ticklength) {
    this.scaleX = scaleX;
    this.scaleY = scaleY;

    // Create a scalar ratio to evenly distribute ticks
    this.scalarX = this.origin.x/this.scaleX;
    this.scalarY = this.origin.y/this.scaleY;

    this.ticklength = ticklength;
    this.scaleDefined = true;
  },

  // Takes equation string of form y = f(x) = ax + b
  defineEquation: function(equation) {
    this.equation = equation;
  },

  // y = f(x)
  f: function(x) {
    return eval(this.equation);
  },

  convertX: function(x) {
    return this.origin.x + x;
  },

  convertY: function(y) {
    return this.origin.y - y;
  },

  // Get a randomly generated point
  getPoint: function(xMin, xMax, yMin, yMax) {
    var point =
    {
      x: this.convertX(Math.floor(Math.random() * (xMax - xMin + 1)) + xMin),
      y: this.convertY(Math.floor(Math.random() * (yMax - yMin + 1)) + yMin),
      context: this.screenContext
    }
    return point;
  },

  // Generate n data points
  generateRandomPoints(n) {
    var points = [];
    for(var i = 0; i < n; i++) {
      points.push(this.getPoint(-this.screen.width, this.screen.width, -this.screen.height, this.screen.height));
    }
    return points;
  },

  drawGraphAxis: function() {
    if(!this.scaleDefined) {
      throw "GraphScaleUndefinedException: Set using Graph.defineScale(scaleX, scaleY, ticklength)";
    }
    this.screenContext.strokeStyle = "black";

    // Start drawing our axis'
    this.screenContext.beginPath();

    // Draw the X Axis
    this.screenContext.moveTo(0, this.origin.y);
    this.screenContext.lineTo(this.screen.width, this.origin.y);

    // Draw the Y Axis
    this.screenContext.moveTo(this.origin.x, 0);
    this.screenContext.lineTo(this.origin.x, this.screen.height);

    this.screenContext.stroke();

    if(this.graphTicksEnabled) {
      this.drawGraphTicks();
    }
  },

  enableGraphTicks: function(enable) {
    this.graphTicksEnabled = enable;
  },

  drawGraphTicks: function() {
    this.screenContext.strokeStyle = "black";
    this.screenContext.beginPath();

    // Create ticks for x axis
    for(x = 0; x < this.origin.x; x += this.scalarX) {
      this.screenContext.moveTo(x, this.origin.x - this.ticklength/2);
      this.screenContext.lineTo(x, this.origin.x + this.ticklength/2);
    }
    for(x = this.screen.width; x > this.origin.x; x -= this.scalarX) {
      this.screenContext.moveTo(x, this.origin.x - this.ticklength/2);
      this.screenContext.lineTo(x, this.origin.x + this.ticklength/2);
    }

    // Create ticks for y axis
    for(y = 0; y < this.origin.y; y += this.scalarY) {
      this.screenContext.moveTo(this.origin.y - this.ticklength/2, y);
      this.screenContext.lineTo(this.origin.y + this.ticklength/2, y);
    }
    for(y = this.screen.height; y > this.origin.y; y -= this.scalarY) {
      this.screenContext.moveTo(this.origin.y - this.ticklength/2, y);
      this.screenContext.lineTo(this.origin.y + this.ticklength/2, y);
    }
    this.screenContext.stroke();
  },

  enablePointEvaluation: function(enable) {
    this.pointEvaluationEnabled = enable;
  },

  drawPoints: function(pointArray) {
    if(this.pointEvaluationEnabled) {
      if(point.y < f(point.x)) {
        this.screenContext.fillStyle = "red";
      } else {
        this.screenContext.fillStyle  = "green";
      }
    } else {
      this.screenContext.fillStyle = "black";
    }

    pointArray.forEach(function(point) {
      point.context.fillRect(point.x, point.y, 5, 5);
    });
  },

  graphEquation: function() {

  }

};
