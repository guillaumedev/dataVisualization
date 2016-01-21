<template>
  <div class="row">
    <h4 class="center-align">Analyse de la base de données de séries :</h4>
     <div class="col s12 center-align" v-show="inSearch">
        <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>

        <div class="spinner-layer spinner-red">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>

        <div class="spinner-layer spinner-yellow">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>

        <div class="spinner-layer spinner-green">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-hide="inSearch" class="row littleMargin">
            <div class="col s6 chart" id="piechart"></div>
            <div class="col s6 chart" id="column_chart"></div>
            <div class="col s12 chart littleMargin" id="curve_chart"></div>
            <div class="col s12 chart" id="bubbleChart"></div>
    </div>
  </div>
</template>

<script>
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
</script>