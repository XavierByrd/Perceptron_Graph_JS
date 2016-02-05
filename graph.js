(function(window){
  'use strict';
  function define_Graph() {
    var Graph = {};
    Graph.create = function(canvas, width, height, x, y) {
      Graph.c = document.getElementById(canvas);

      Graph.c.width = width;
      Graph.c.height = height;

      Graph. origin = {x: Graph.c.width/2, y: Graph.c.height/2};
      Graph. ctx = Graph.c.getContext("2d");
      Graph. xaxis = typeof(x) !== 'undefined'? x : 3;
      Graph. yaxis = typeof(y) !== 'undefined' ? y : 10;
      Graph. point = {x: null, y: null};
      Graph. smoothFactor = 25;
      Graph. ticklength = 5;
      Graph. xscale = Graph.origin.x/Graph.xaxis;
      Graph. yscale = Graph.origin.y/Graph.yaxis;

      Graph.ctx.beginPath();
      Graph.ctx.moveTo(Graph.origin.x, 0);
      Graph.ctx.lineTo(Graph.origin.x, Graph.c.height);
      Graph.ctx.moveTo(0, Graph.origin.y);
      Graph.ctx.lineTo(Graph.c.width, Graph.origin.y);
      Graph.ctx.stroke();
    },

    Graph.defineScale = function(x, y) {
      Graph.xaxis = x;
      Graph.yaxis = y;
    },

    Graph.graph = function() {
      Graph.ctx.beginPath();
      Graph.ctx.strokeStyle = "#06a2cb";
      var errorFlag = false;
      for(var x = -Graph.xaxis; x < Graph.xaxis + 1; x += (Graph.smoothFactor * 0.01)) {
        ////console.log("(" +x+","+f(x)+")\n" + "(" +Graph.Graph.convertToCanvasX(x)+","+Graph.convertToScaleY(f(x))+")\n");
        if(errorFlag === true) {
          Graph.ctx.stroke();
          errorFlag = false;
          Graph.ctx.beginPath();
        }
        if(Graph.f(x) != Infinity) {
          Graph.ctx.lineTo(Graph.convertToCanvasX(x) , Graph.convertToCanvasY(Graph.f(x)));
        } else {
          errorFlag = true;
        }
      }
      Graph.ctx.stroke();
    },

    Graph.equation = function(equation) {
      //console.log("Equation saved.");
      Graph.f = function(x) {
          return eval(equation);
      }
    },

    Graph.drawTicks = function() {
      Graph.ctx.strokeStyle = "black";
      Graph.ctx.beginPath();

      // Create ticks for x axis
      for(var x = 0; x < Graph.origin.x; x +=  Graph.xscale) {
        Graph.ctx.moveTo(x, Graph.origin.x -  Graph.ticklength/2);
        Graph.ctx.lineTo(x, Graph.origin.x +  Graph.ticklength/2);
      }
      for(var x = Graph.c.width; x > Graph.origin.x; x -=  Graph.xscale) {
        Graph.ctx.moveTo(x, Graph.origin.x -  Graph.ticklength/2);
        Graph.ctx.lineTo(x, Graph.origin.x +  Graph.ticklength/2);
      }

      // Create ticks for y axis
      for(var y = 0; y < Graph.origin.y; y += Graph.yscale) {
        Graph.ctx.moveTo(Graph.origin.y -  Graph.ticklength/2, y);
        Graph.ctx.lineTo(Graph.origin.y +  Graph.ticklength/2, y);
      }
      for(var y = Graph.c.height; y > Graph.origin.y; y -= Graph.yscale) {
        Graph.ctx.moveTo(Graph.origin.y -  Graph.ticklength/2, y);
        Graph.ctx.lineTo(Graph.origin.y +  Graph.ticklength/2, y);
      }
      Graph.ctx.stroke();
      //console.log("Ticks Drawn");
    },

      Graph.convertToCanvasX = function(x) {
        return Graph.origin.x + (x * Graph.xscale);
      },

      Graph.convertToCanvasY = function(y) {
        return Graph.origin.y - (y * Graph.yscale);
      },

      Graph.convertToScaleX = function(x) {
        return (x - Graph.origin.x) / Graph.xscale;
      },

      Graph.convertToScaleY = function(y) {
        return (y + Graph.origin.y) / Graph.yscale;
      },

      Graph.generateRandomPoints = function(n) {
        var points = [];
        for(var i = 0; i < n; i++) {
          points.push(
            {
              x: (Math.random() * (Graph.xaxis * 2)) - Graph.xaxis,
              y: (Math.random() * (Graph.yaxis * 2)) - Graph.yaxis
            }
          );
        }
        return points;
      },

      Graph.drawPoints = function(points, size, flag) {
        for(var i = 0; i < points.length; i++) {
          points[i] = Graph.evaluatePoint(points[i]);
          Graph.ctx.beginPath();
          Graph.ctx.strokeStyle = "#192823";
          var radius = typeof(size) !== "undefined" ? size: 3;
          Graph.ctx.arc(Graph.convertToCanvasX(points[i].x), Graph.convertToCanvasY(points[i].y), radius, 0, 2*Math.PI);
          if(points[i].isAboveEquation) {
            Graph.ctx.fillStyle = typeof(flag) != "undefined" ? "purple" : "#218559";
          } else {
            Graph.ctx.fillStyle = typeof(flag) != "undefined" ? "purple" : "#dd1e2f";
          }
          Graph.ctx.fill();
          Graph.ctx.stroke();
        }
      },

      Graph.evaluatePoint = function(point) {
        var evaluation = false;
        var evaluatedPoint = point;

        evaluatedPoint.isAboveEquation = (point.y > Graph.f(point.x));

        return evaluatedPoint;
      }

    //console.log("Axis' Created");
    return Graph;
  }

  if(typeof(Graph) === 'undefined') {
    window.Graph = define_Graph();
  } else {
    //console.log("Graph is already defined.");
  }
})(window);
