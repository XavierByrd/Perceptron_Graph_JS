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

  upscaleX: function(x) {
    return (x * this.scalarX) + this.origin.x;
  },

  upscaleY: function(y) {
    return this.origin.y - (y * this.scalarY);
  },

  // Get a randomly generated point
  getPoint: function(xMin, xMax, yMin, yMax) {
    var point =
    {
      actualX: Math.floor(Math.random() * (xMax - xMin + 1)) + xMin,
      actualY: Math.floor(Math.random() * (yMax - yMin + 1)) + yMin,
    }
    console.log("("+"x: " + this.f(point.actualX) + ", y:" + point.actualY +")");
    return point;
  },

  // Generate n data points
  generateRandomPoints(n) {
    var points = [];
    for(var i = 0; i < n; i++) {
      points.push(this.getPoint( -this.scaleX + 1, this.scaleX - 1, -this.scaleY + 1, this.scaleY - 1));
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

  drawPointsAsCircles: function(pointArray) {
    for(var i = 0; i < pointArray.length; i++) {
      this.screenContext.beginPath();
      this.screenContext.arc(this.upscaleX(pointArray[i].actualX), this.upscaleY(pointArray[i].actualY), 3, 0, 2*Math.PI);
      if(this.pointEvaluationEnabled) {
          if(pointArray[i].actualY < this.f(pointArray[i].actualX)) {
            this.screenContext.fillStyle  = "red";
          } else {
            this.screenContext.fillStyle  = "green";
          }
      } else {
        this.screenContext.fillStyle = "gray";
      }
      this.screenContext.fill();
      this.screenContext.stroke();
    }
  },


  graphEquation: function() {
    this.screenContext.beginPath();
    this.screenContext.strokeStyle = "blue";
    for(var x = -this.screen.width; x < this.screen.width; x++ ) {
      this.screenContext.lineTo(this.convertX(x) , this.convertY(this.f(x)));
    }
    this.screenContext.stroke();
  }

};
