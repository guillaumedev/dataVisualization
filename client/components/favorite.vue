<template>
  <div class="row center-align">
    <h4 class="center-align">Listes de vos séries favorites.</h4>
   <!-- <a v-on="click: writeFavorited" class="waves-effect waves-light btn center-align">Sauvegarder</a>-->
  <!--   <button v-on="click: writeFavorited">Save</button> -->
  </div>
  <div class="row">
    <div class="col s12 m6 l3" v-repeat="serie in tabFavorite" v-transition="expand">
      <div class="card medium cardSerie">
        <div class="card-image">
            <img class='activator' src="{{serie.imageSrc}}">
        </div>
        <div class="card-content">
            <span class="card-title activator grey-text text-darken-4 col s12 center-align">{{serie.title}}</span>
            <div class="col s12 littleMargin center-align"> <a class="btn-floating btn-large waves-effect waves-light white" v-on="click : unFavorite(serie)"><i class="material-icons red-text">favorite</i></a><br>Retirer des favoris</div>

        </div>
        <div class="card-reveal">
            <span class="card-title grey-text text-darken-4 center-align">{{serie.title}}<i class="material-icons right">close</i> 
            </span>
           <p>
              <span class="card-title star-rating center-align">
                <i class="material-icons starInactive" v-class="starActive : biggerThan(serie.note,1)">star</i>
                <i class="material-icons starInactive" v-class="starActive : biggerThan(serie.note,2)">star</i>
                <i class="material-icons starInactive" v-class="starActive : biggerThan(serie.note,3)">star</i>
                <i class="material-icons starInactive" v-class="starActive : biggerThan(serie.note,4)">star</i>
                <i class="material-icons starInactive" v-class="starActive : biggerThan(serie.note,5)">star</i>
              </span>
           </p>
            <p class="center-align">{{serie.begin}} - {{serie.end}}</p>
            <p><span v-repeat="genre in serie.genres" class="center-align"> {{genre.name}} </span></p>
            <p>{{serie.resume}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col s6 chart" id="piechart"></div>
    <div class="col s6 chart" id="column_chart"></div>
    <!-- <div class="col s12 chart littleMargin" id="curve_chart"></div> -->
    <div class="row center-align">
      <h3 class="center-align">Listes de vos séries favorites.</h3>
    <!--   <button v-on="click: writeFavorited">Save</button> -->
    </div>
    <!-- <h3 class="align-center"></h3> -->
    <section id="vis"></section>
  </div>
</template>

<script>
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
</script>