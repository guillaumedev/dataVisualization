/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Require
	// var Vue = require('vue')
	// var VueRouter = require('vue-router')
	
	// Vue
	Vue.use(VueRouter);
	Vue.use(VueResource);
	// Vue.http.options.root = 'http://127.0.0.1:1337';
	// Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';
	// Vue.http.headers.common['Access-Control-Allow-Origin']: '*';
	var App = Vue.extend({
	    data: function() {
	        return {
	            tabFavorite : [],
	            logFavorite: "",
	            serverUrl: "http://127.0.0.1:1337"
	            // serverUrl : "http://10.224.140.248:1337"
	
	        };
	    },
	    methods: {
	        addFavorite: function(favorite) {
	           if(this.isFavorited(favorite)){
	            this.tabFavorite.push(favorite);
	           }
	        },
	        isFavorited: function(favorite) {
	             for(var i=0; i<this.tabFavorite.length;i++){
	                if(favorite._id == this.tabFavorite[i]._id){
	                    return false;
	                }
	            }
	            return true;
	        },
	        writeFavorited: function() {
	            this.logFavorite = JSON.stringify(this.tabFavorite);
	        },
	        getFavorite: function() {
	            console.log(this.tabFavorite);
	        },
	        unFavorite: function(favorite) {
	            for(var i=0; i<this.tabFavorite.length; i++) {
	                if(this.tabFavorite[i]._id == favorite._id){
	                    this.tabFavorite.splice(i,1);
	                }
	            }
	        },
	        biggerThan: function(note, min) {
	          if(Math.round(parseFloat(note)) >= min){
	            return true;
	          }
	          // return false;
	        }
	
	    }
	})
	var tabFavorite = [];
	// Router
	var router = new VueRouter()
	router.map({
	    '/': {
	        component: __webpack_require__(5)
	    },
	    '/charts': {
	        component: __webpack_require__(8)
	    },
	    '/favorite': {
	        component: __webpack_require__(11)
	    },
	    '/crawl': {
	        component: __webpack_require__(14)
	    }
	});
	
	
	router.start(App, '#app')

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6)
	module.exports.template = __webpack_require__(7)


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {
	  inherit: true,
	  data: function() {
	    return {
	      serieSearch:"",
	      tabSeries: [],
	      inSearch: false
	    }
	  },
	  methods: {
	    search: function (e) {
	      if(this.serieSearch.length > 0){
	        this.inSearch = true;
	        this.$http.post(this.serverUrl+'/search',{'serieSearch': this.serieSearch}, function(data, status,request){
	          // console.log(data);
	          this.tabSeries = data;
	          this.inSearch = false;
	        }, {'emulateJSON': true});
	      } else {
	        alert("Merci d'indiquer une série");
	      }
	    },
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div class=\"row\">\n    <form class=\"col s8 offset-s2\">\n      <div class=\"row\">\n        <div class=\"input-field col s10\">\n          <input placeholder=\"Entrez le nom d'une série\" id=\"name_serie\" v-model=\"serieSearch\" type=\"text\" class=\"validate\">\n        </div>\n        <div class=\"input-field col s2\">\n          <button class=\"btn waves-effect waves-light btn-large btn-floating orange darken-4\" v-on=\"click: search\" type=\"submit\" name=\"action\">\n            <i class=\"material-icons right\">search</i>\n          </button>\n        </div>\n      </div>\n    </form>\n\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col s12 center-align\" v-show=\"inSearch\">\n        <div class=\"preloader-wrapper big active\">\n        <div class=\"spinner-layer spinner-blue\">\n          <div class=\"circle-clipper left\">\n            <div class=\"circle\"></div>\n          </div><div class=\"gap-patch\">\n            <div class=\"circle\"></div>\n          </div><div class=\"circle-clipper right\">\n            <div class=\"circle\"></div>\n          </div>\n        </div>\n\n        <div class=\"spinner-layer spinner-red\">\n          <div class=\"circle-clipper left\">\n            <div class=\"circle\"></div>\n          </div><div class=\"gap-patch\">\n            <div class=\"circle\"></div>\n          </div><div class=\"circle-clipper right\">\n            <div class=\"circle\"></div>\n          </div>\n        </div>\n\n        <div class=\"spinner-layer spinner-yellow\">\n          <div class=\"circle-clipper left\">\n            <div class=\"circle\"></div>\n          </div><div class=\"gap-patch\">\n            <div class=\"circle\"></div>\n          </div><div class=\"circle-clipper right\">\n            <div class=\"circle\"></div>\n          </div>\n        </div>\n\n        <div class=\"spinner-layer spinner-green\">\n          <div class=\"circle-clipper left\">\n            <div class=\"circle\"></div>\n          </div><div class=\"gap-patch\">\n            <div class=\"circle\"></div>\n          </div><div class=\"circle-clipper right\">\n            <div class=\"circle\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col s12 m6 l3\" v-repeat=\"serie in tabSeries\" v-transition=\"expand\" track-by=\"_id\" v-show=\"!inSearch\">\n      <div class=\"card medium cardSerie\">\n        <div class=\"card-image\">\n            <img class='activator' src=\"{{serie.imageSrc}}\">\n        </div>\n        <div class=\"card-content\">\n            <span class=\"card-title activator grey-text text-darken-4 col s12 center-align\">{{serie.title}}</span>\n            <div class=\"col s12 littleMargin center-align\"> \n            <a class=\"btn-floating btn-large waves-effect waves-light red\"><i class=\"material-icons\" v-on=\"click : addFavorite(serie)\">favorite</i></a><br>Ajouter aux favoris\n            </div>\n        </div>\n        <div class=\"card-reveal\">\n            <span class=\"card-title grey-text text-darken-4 center-align center\">{{serie.title}}<i class=\"material-icons right\">close</i> \n            </span>\n           <p>\n              <span class=\"card-title star-rating center-align\">\n                <i class=\"material-icons starInactive\" v-class=\"starActive : biggerThan(serie.note,1)\">star</i>\n                <i class=\"material-icons starInactive\" v-class=\"starActive : biggerThan(serie.note,2)\">star</i>\n                <i class=\"material-icons starInactive\" v-class=\"starActive : biggerThan(serie.note,3)\">star</i>\n                <i class=\"material-icons starInactive\" v-class=\"starActive : biggerThan(serie.note,4)\">star</i>\n                <i class=\"material-icons starInactive\" v-class=\"starActive : biggerThan(serie.note,5)\">star</i>\n              </span>\n           </p>\n            <p class=\"center-align\">{{serie.begin}} - {{serie.end}}</p>\n            <p><span v-repeat=\"genre in serie.genres\" class=\"center-align\"> {{genre.name}} </span></p>\n            <p>{{serie.resume}}</p>\n        </div>\n      </div>\n    </div>\n  </div>";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9)
	module.exports.template = __webpack_require__(10)


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
	    inherit: true,
	    data: function() {
	        return {
	            tabSerieByGenre: [],
	            tabSerieByYear: [],
	            inSearch: true
	        }
	    },
	    ready : function(){
	        var that = this;
	        var timer = setInterval(function(){
	            if(google != undefined){
	                clearInterval(timer);
	                that.getAllData();
	            }
	        },2000);
	    },
	    methods: {
	        getAllData: function(e) {
	            this.serieByGenre();
	            this.serieByYear();
	        },
	        serieByGenre: function () {
	            this.$http.post(this.serverUrl+'/serieByGenre', function(data, status,request){
	              this.tabSerieByGenre = data;
	              this.drawPieChart();
	              this.drawColumnChart();
	              this.drawBubbleChart();
	            }, {'emulateJSON': true});
	        },
	        serieByYear: function () {
	            this.$http.post(this.serverUrl+'/serieByYear', function(data, status,request){
	              this.tabSerieByYear = data;
	              this.drawLineChart();
	            }, {'emulateJSON': true});
	        },
	        drawColumnChart: function() {
	            var visualise = [
	                ['Element', 'Average'],
	            ];
	            for(var i=0; i<this.tabSerieByGenre.length;i++){
	                visualise.push([this.tabSerieByGenre[i].name,  Math.round(this.tabSerieByGenre[i].avg*100)/100]);
	            }
	            var data = google.visualization.arrayToDataTable(visualise);
	            var options = {
	                title: "Moyenne de notes des séries par genre",
	                legend: { position: "none" },
	                bar: { groupWidth: "95%" },
	                chartArea: {height: 500}
	
	            };
	            var chart = new google.visualization.BarChart(document.getElementById("column_chart"));
	            chart.draw(data, options);
	        },
	        drawLineChart: function() {
	            var visualise =[
	                        ['Année', 'Nombre'],
	                ];
	            for(var i=0; i<this.tabSerieByYear.length;i++){
	                visualise.push([parseInt(this.tabSerieByYear[i]._id),  this.tabSerieByYear[i].count]);
	            }
	            var data = google.visualization.arrayToDataTable(visualise);
	
	            var options = {
	              title: 'Séries par années',
	              curveType: 'function',
	              legend: { position: 'bottom' }
	            };
	
	            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
	
	            chart.draw(data, options);
	            this.inSearch = false;
	        },
	        drawPieChart: function () {
	            // console.log(this.tabSerieByGenre);
	            var visualise =[
	                        ['Genre', 'Nombre'],
	                ];
	            for(var i=0; i<this.tabSerieByGenre.length;i++){
	                visualise.push([this.tabSerieByGenre[i].name,     this.tabSerieByGenre[i].nbSeries]);
	            }
	             var data = google.visualization.arrayToDataTable(visualise);
	
	            var options = {
	              title: 'Les séries par genre :',
	              pieHole: 0.4,
	              chartArea: {height: 500}
	            };
	
	            var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	
	            chart.draw(data, options);
	        },
	
	        getBaseNode: function(){
	            var baseNode = {"name": "flare","children": []};
	            return baseNode;
	        },
	
	        drawBubbleChart: function() {
	
	          var that = this;
	          var node = this.getBaseNode();
	
	          for(var i=0; i<this.tabSerieByGenre.length;i++){
	              node['children'].push({"name":this.tabSerieByGenre[i].name, "size":this.tabSerieByGenre[i].nbSeries});
	          }
	
	          var myJson = JSON.stringify(node);
	
	          var diameter = $(window).width()-30,
	              format = d3.format(",d"),
	              color = d3.scale.category20c();
	
	          var bubble = d3.layout.pack()
	              .sort(null)
	              .size([diameter, diameter])
	              .padding(1.5);
	
	          var svg = d3.select("#bubbleChart").append("svg")
	              .attr("width", diameter)
	              .attr("height", diameter)
	              .attr("class", "bubble align-center");
	
	          root = JSON.parse(myJson);
	
	          // d3.json("flare.json", function(error, root) {
	          //   if (error) throw error;
	
	            var node = svg.selectAll(".node")
	                .data(bubble.nodes(classes(root))
	                .filter(function(d) { return !d.children; }))
	              .enter().append("g")
	                .attr("class", "node")
	                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	
	            node.append("title")
	                .text(function(d) { return format(d.value)+" séries de type "+d.className; });
	
	            node.append("circle")
	                .attr("r", function(d) { return d.r; })
	                .style("fill", function(d) { return getRandomColor(); });
	
	            node.append("text")
	                .attr("dy", ".3em")
	                .style("text-anchor", "middle")
	                .text(function(d) { return d.className.substring(0, d.r / 3); });
	         // });
	
	          function getRandomColor() {
	              var letters = '0123456789ABCDEF'.split('');
	              var color = '#';
	              for (var i = 0; i < 6; i++ ) {
	                  color += letters[Math.floor(Math.random() * 16)];
	              }
	              return color;
	          }
	
	          // Returns a flattened hierarchy containing all leaf nodes under the root.
	          function classes(root) {
	            var classes = [];
	
	            function recurse(name, node) {
	              if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
	              else {
	                if(node.name!==undefined){
	                  classes.push({packageName: name, className: node.name, value: node.size});
	                }
	              }
	            }
	
	            recurse(null, root);
	            return {children: classes};
	          }
	
	          d3.select(self.frameElement).style("height", diameter + "px");
	        }
	
	    },
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"row\">\n    <h4 class=\"center-align\">Analyse de la base de données de séries :</h4>\n     <div class=\"col s12 center-align\" v-show=\"inSearch\">\n        <div class=\"preloader-wrapper big active\">\n        <div class=\"spinner-layer spinner-blue\">\n          <div class=\"circle-clipper left\">\n            <div class=\"circle\"></div>\n          </div><div class=\"gap-patch\">\n            <div class=\"circle\"></div>\n          </div><div class=\"circle-clipper right\">\n            <div class=\"circle\"></div>\n          </div>\n        </div>\n\n        <div class=\"spinner-layer spinner-red\">\n          <div class=\"circle-clipper left\">\n            <div class=\"circle\"></div>\n          </div><div class=\"gap-patch\">\n            <div class=\"circle\"></div>\n          </div><div class=\"circle-clipper right\">\n            <div class=\"circle\"></div>\n          </div>\n        </div>\n\n        <div class=\"spinner-layer spinner-yellow\">\n          <div class=\"circle-clipper left\">\n            <div class=\"circle\"></div>\n          </div><div class=\"gap-patch\">\n            <div class=\"circle\"></div>\n          </div><div class=\"circle-clipper right\">\n            <div class=\"circle\"></div>\n          </div>\n        </div>\n\n        <div class=\"spinner-layer spinner-green\">\n          <div class=\"circle-clipper left\">\n            <div class=\"circle\"></div>\n          </div><div class=\"gap-patch\">\n            <div class=\"circle\"></div>\n          </div><div class=\"circle-clipper right\">\n            <div class=\"circle\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div v-hide=\"inSearch\" class=\"row littleMargin\">\n            <div class=\"col s6 chart\" id=\"piechart\"></div>\n            <div class=\"col s6 chart\" id=\"column_chart\"></div>\n            <div class=\"col s12 chart littleMargin\" id=\"curve_chart\"></div>\n            <div class=\"col s12 chart\" id=\"bubbleChart\"></div>\n    </div>\n  </div>";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12)
	module.exports.template = __webpack_require__(13)


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = {
	    inherit: true,
	    data: function() {
	        return {
	            tabSerieByGenre: [],
	        }
	    },
	    ready : function(){
	        var that = this;
	        var timer = setInterval(function(){
	            if(google != undefined){
	              console.log(google);
	                clearInterval(timer);
	                that.formatTabFavorite();
	            }
	        },2000);
	    },
	    methods: {
	        formatTabFavorite: function() {
	            for(var i=0; i<this.tabFavorite.length;i++) {
	                for(var j=0; j<this.tabFavorite[i].genres.length; j++) {
	                    var indexGenre = this.checkGenreExist(this.tabFavorite[i].genres[j].name);
	                    if(indexGenre == -1) {
	                        this.tabSerieByGenre.push({
	                        "name":this.tabFavorite[i].genres[j].name,
	                        "nbSeries": 1,
	                        "avg" : this.tabFavorite[i].note
	                        });
	                    } else {
	                        this.tabSerieByGenre[indexGenre].nbSeries ++;
	                        this.tabSerieByGenre[indexGenre].avg += this.tabFavorite[i].note;
	                    }
	                }
	            }
	            this.calculeAverageNote();
	            this.drawPieChart();
	            this.drawColumnChart();
	            this.drawForceLayout();
	        },
	        calculeAverageNote: function() {
	            for(var i=0; i<this.tabSerieByGenre.length;i++) {
	                this.tabSerieByGenre[i].avg = this.tabSerieByGenre[i].avg / this.tabSerieByGenre[i].nbSeries;
	            }
	        },
	        checkGenreExist: function(nameGenre) {
	            var exist = false;
	            for(var i=0; i<this.tabSerieByGenre.length;i++) {
	                if(nameGenre == this.tabSerieByGenre[i].name){
	                    return i;
	                }
	            }
	            return -1;
	        },
	        drawPieChart: function () {
	            var visualise =[
	                ['Genre', 'Nombre'],
	            ];
	            for(var i=0; i<this.tabSerieByGenre.length;i++){
	                visualise.push([this.tabSerieByGenre[i].name,     this.tabSerieByGenre[i].nbSeries]);
	            }
	            var data = google.visualization.arrayToDataTable(visualise);
	
	            var options = {
	                title: 'Vos séries par genre :',
	                pieHole: 0.4,
	                chartArea: {height: 500}
	            };
	
	            var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	
	            chart.draw(data, options);
	        },
	        drawColumnChart: function() {
	            var visualise = [
	            ['Element', 'Average'],
	            ];
	            for(var i=0; i<this.tabSerieByGenre.length;i++){
	                visualise.push([this.tabSerieByGenre[i].name,  Math.round(this.tabSerieByGenre[i].avg*100)/100]);
	            }
	            var data = google.visualization.arrayToDataTable(visualise);
	            var options = {
	                title: "Moyenne de notes de vos séries par genre",
	                legend: { position: "none" },
	                bar: { groupWidth: "95%" },
	                chartArea: {height: 500}
	
	            };
	            var chart = new google.visualization.BarChart(document.getElementById("column_chart"));
	            chart.draw(data, options);
	        },
	
	        getBaseNode: function(){
	            var baseNode = {"title": "you", "img": "assets/you.png", "children": []
	            };
	            return baseNode;
	        },
	
	        drawForceLayout: function() {
	            var that = this;
	            var node = this.getBaseNode();
	            for(var i=0; i< this.tabFavorite.length; i++) {
	              node['children'].push({
	                "_id" : this.tabFavorite[i]._id,
	                "title": this.tabFavorite[i].title,
	                "img" : this.tabFavorite[i].imageSrc,
	                "note" : this.tabFavorite[i].note,
	                "size": 40000,
	                "genres":this.tabFavorite[i].genres,
	                "children": [],
	              });
	            }
	            var myJson = JSON.stringify(node);
	
	            // some colour variables
	            var tcBlack = "#130C0E";
	
	            // rest of vars
	            var w = $(window).width(),
	                h = 1000,
	                maxNodeSize = 50,
	                x_browser = 0,
	                y_browser = 0,
	                root;
	
	            var vis;
	            var force = d3.layout.force();
	
	            vis = d3.select("#vis").append("svg").attr("width", w).attr("height", h);
	
	            root = JSON.parse( myJson );
	            root.fixed = true;
	            root.x = w / 2;
	            root.y = h / 4;
	                   // Build the path
	            var defs = vis.insert("svg:defs")
	                .data(["end"]);
	
	            defs.enter().append("svg:path")
	                .attr("d", "M0,-5L10,0L0,5");
	
	             update();
	
	            /**
	             *
	             */
	            function update() {
	              var nodes = flatten(root),
	                  links = d3.layout.tree().links(nodes);
	                  // console.log('jambon');
	
	              // Restart the force layout.
	              force.nodes(nodes)
	                    .links(links)
	                    .gravity(0.05)
	                .charge(-1500)
	                .linkDistance(120)
	                .friction(0.5)
	                .linkStrength(function(l, i) {return 1; })
	                .size([w, h])
	                .on("tick", tick)
	                    .start();
	
	               var path = vis.selectAll("path.link")
	                  .data(links, function(d) { return d.target.id; });
	
	                path.enter().insert("svg:path")
	                  .attr("class", "link")
	                  // .attr("marker-end", "url(#end)")
	                  .style("stroke", "black");
	
	
	              // Exit any old paths.
	              path.exit().remove();
	
	
	
	              // Update the nodes…
	              var node = vis.selectAll("g.node")
	                  .data(nodes, function(d) { return d.id; });
	
	
	              // Enter any new nodes.
	              var nodeEnter = node.enter().append("svg:g")
	                  .attr("class", "node")
	                  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
	                  .on("click", click)
	                  .call(force.drag);
	
	              // Append a circle
	
	
	              var images = nodeEnter.append("svg:image")
	                    .attr("class", "image")
	                    .attr("xlink:href",  function(d) { return d.img;})
	                    .attr("x", function(d) { return -25;})
	                    .attr("y", function(d) { return -25;})
	                    .attr("height", 70)
	                    .attr("width", 70);
	
	              // make the image grow a little on mouse over and add the text details on click
	              var setEvents = images
	
	                      .on( 'mouseenter', function(d) {
	                        // select element in current context
	                        if(d.title != "you"){
	                          d3.select("h3").html(d.title+" : "+ d.note+"/5");
	                        }
	                        d3.select( this )
	                          .transition()
	                          .attr("x", function(d) { return -60;})
	                          .attr("y", function(d) { return -60;})
	                          .attr("height", 150)
	                          .attr("width", 150);
	                      })
	                      // set back
	                      .on( 'mouseleave', function() {
	                        d3.select("h3").html("Survolez une série et cliquez dessus !");
	                        d3.select( this )
	                          .transition()
	                          .attr("x", function(d) { return -25;})
	                          .attr("y", function(d) { return -25;})
	                          .attr("height", 70)
	                          .attr("width", 70);
	                      });
	              // Exit any old nodes.
	              node.exit().remove();
	
	
	              // Re-select for update.
	              path = vis.selectAll("path.link");
	              node = vis.selectAll("g.node");
	
	            function tick() {
	
	                path.attr("d", function(d) {
	                 var dx = d.target.x - d.source.x,
	                       dy = d.target.y - d.source.y,
	                       dr = Math.sqrt(dx * dx + dy * dy);
	                       return   "M" + d.source.x + ","
	                        + d.source.y
	                        + "A" + dr + ","
	                        + dr + " 0 0,1 "
	                        + d.target.x + ","
	                        + d.target.y;
	              });
	                node.attr("transform", nodeTransform);
	              }
	            }
	
	
	            /**
	             * Gives the coordinates of the border for keeping the nodes inside a frame
	             * http://bl.ocks.org/mbostock/1129492
	             */
	            function nodeTransform(d) {
	              d.x =  Math.max(maxNodeSize, Math.min(w - (d.imgwidth/2 || 16), d.x));
	                d.y =  Math.max(maxNodeSize, Math.min(h - (d.imgheight/2 || 16), d.y));
	                return "translate(" + d.x + "," + d.y + ")";
	               }
	
	            /**
	             * Toggle children on click.
	             */
	            function click(d) {
	
	              that.$http.post(that.serverUrl+'/searchSame',{'serie': d}, function(data, status,request){
	                    for(var i=0; i< data.length; i++) {
	                    if(data[i].imageSrc!=''||data[i]._id!=''){
	                      d['children'].push({
	                        "id" : data[i]._id+Math.random(),
	                        "title": data[i].title,
	                        "img" : data[i].imageSrc,
	                        "note" : data[i].note,
	                        "size": 40000,
	                        "genres":data[i].genres,
	                        "children": []
	                      });
	                    }
	                  }
	                  update();
	              }, {'emulateJSON': true});
	            }
	
	
	            /**
	             * Returns a list of all nodes under the root.
	             */
	            function flatten(root) {
	              var nodes = [];
	              var i = 0;
	
	              function recurse(node) {
	                if (node.children)
	                  node.children.forEach(recurse);
	                if (!node.id)
	                  node.id = ++i;
	                nodes.push(node);
	              }
	
	              recurse(root);
	              return nodes;
	            }
	        }
	    }
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<div class=\"row center-align\">\n    <h4 class=\"center-align\">Listes de vos séries favorites.</h4>\n   <!-- <a v-on=\"click: writeFavorited\" class=\"waves-effect waves-light btn center-align\">Sauvegarder</a>-->\n  <!--   <button v-on=\"click: writeFavorited\">Save</button> -->\n  </div>\n  <div class=\"row\">\n    <div class=\"col s12 m6 l3\" v-repeat=\"serie in tabFavorite\" v-transition=\"expand\">\n      <div class=\"card medium cardSerie\">\n        <div class=\"card-image\">\n            <img class='activator' src=\"{{serie.imageSrc}}\">\n        </div>\n        <div class=\"card-content\">\n            <span class=\"card-title activator grey-text text-darken-4 col s12 center-align\">{{serie.title}}</span>\n            <div class=\"col s12 littleMargin center-align\"> <a class=\"btn-floating btn-large waves-effect waves-light white\" v-on=\"click : unFavorite(serie)\"><i class=\"material-icons red-text\">favorite</i></a><br>Retirer des favoris</div>\n\n        </div>\n        <div class=\"card-reveal\">\n            <span class=\"card-title grey-text text-darken-4 center-align\">{{serie.title}}<i class=\"material-icons right\">close</i> \n            </span>\n           <p>\n              <span class=\"card-title star-rating center-align\">\n                <i class=\"material-icons starInactive\" v-class=\"starActive : biggerThan(serie.note,1)\">star</i>\n                <i class=\"material-icons starInactive\" v-class=\"starActive : biggerThan(serie.note,2)\">star</i>\n                <i class=\"material-icons starInactive\" v-class=\"starActive : biggerThan(serie.note,3)\">star</i>\n                <i class=\"material-icons starInactive\" v-class=\"starActive : biggerThan(serie.note,4)\">star</i>\n                <i class=\"material-icons starInactive\" v-class=\"starActive : biggerThan(serie.note,5)\">star</i>\n              </span>\n           </p>\n            <p class=\"center-align\">{{serie.begin}} - {{serie.end}}</p>\n            <p><span v-repeat=\"genre in serie.genres\" class=\"center-align\"> {{genre.name}} </span></p>\n            <p>{{serie.resume}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col s6 chart\" id=\"piechart\"></div>\n    <div class=\"col s6 chart\" id=\"column_chart\"></div>\n    <!-- <div class=\"col s12 chart littleMargin\" id=\"curve_chart\"></div> -->\n    <div class=\"row center-align\">\n      <h3 class=\"center-align\">Listes de vos séries favorites.</h3>\n    <!--   <button v-on=\"click: writeFavorited\">Save</button> -->\n    </div>\n    <!-- <h3 class=\"align-center\"></h3> -->\n    <section id=\"vis\"></section>\n  </div>";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15)
	module.exports.template = __webpack_require__(16)


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = {
	  inherit: true,
	  data: function() {
	    return {
	      serieSearch:"Il",
	      tabSeries: [],
	      inSearch: false
	    }
	  },
	  methods: {
	    search: function (e) {
	      if(this.serieSearch.length > 0){
	        this.inSearch = true;
	        this.$http.post(this.serverUrl+'/search',{'serieSearch': this.serieSearch}, function(data, status,request){
	          // console.log(data);
	          this.tabSeries = data;
	          this.inSearch = false;
	        }, {'emulateJSON': true});
	      } else {
	        alert("Merci d'indiquer une série");
	      }
	    },
	  }
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div class=\"col s12 center-align\">\n<a class=\"waves-effect waves-light btn\" href=\"http://localhost:1337/crawler/add\" target=\"_blank\">Crawler les données</a>\n<a class=\"waves-effect waves-light btn\" href=\"http://localhost:1337/crawler/del\" target=\"_blank\">Supprimer les données</a>\n</div>";

/***/ }
/******/ ]);
//# sourceMappingURL=build.js.map