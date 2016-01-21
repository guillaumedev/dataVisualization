var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seriePrototype = function(serieModel) {
    this.serieModel = serieModel;
    this.genresValides = [
        "Action",
        "Animation",
        "Arts Martiaux",
        "Aventure",
        "Biopic",
        "Classique",
        "Comédie",
        "Comédie dramatique",
        "Comédie musicale",
        "Drame",
        "Drama",
        "Dessin animé",
        "Divers",
        "Documentaire",
        "Epouvante-horreur",
        "Erotique",
        "Espionnage",
        "Famille",
        "Fantastique",
        "Guerre",
        "Historique",
        "Judiciaire",
        "Médical",
        "Musical",
        "Péplum",
        "Policier",
        "Romance",
        "Science fiction",
        "Soap",
        "Thriller",
        "Websérie",
        "Western"
    ];
    this.tabSerieByGenre = [];
};

seriePrototype.prototype.search = function(req, res) {
    console.log("recherche de série like", req.body.serieSearch);
    this.serieModel.find({ "title": new RegExp(req.body.serieSearch, 'i')}, function(error, tabSeries) {
        // res.header('Access-Control-Allow-Origin', "*");
        // res.writeHead(200, {"Content-Type": "application/json"});
        res.send(tabSeries);
    });
};
seriePrototype.prototype.searchSame = function(req,res){
    console.log('recherche de serie identiques');
    var serie=req.body.serie;
    serie.note=parseInt(serie.note);

    var tabGenresSerie = [];
    for(var i=0; i<serie.genres.length;i++){
        tabGenresSerie.push(serie.genres[i].name);
    }
    this.serieModel.aggregate([
        {
            $match: {
                "genres.name" : {$all : tabGenresSerie},
                "title" : {$ne: serie.title}
            },
        },
        {$project :
            {
                'title':1,
                'genres':1,
                'note':1,
                'begin':1,
                'end':1,
                'imageSrc':1,
                'resume':1,
                'noteDiff' : {
                    $cond: [{ $lt: [{$subtract: [ "$note", serie.note]}, 0]},
                        {$multiply: [{$subtract: [ "$note", serie.note]},-1]},
                        {$subtract: [ "$note", serie.note]}]
                },
            }
        },
        {$sort: {'noteDiff':1}},
        { $limit : 10 }
    ], function(error, tabSeries){
        console.log("TROUVAI", tabSeries);
        res.send(tabSeries);
    });
}
seriePrototype.prototype.byGenre = function(req,res) {
       this.getSerieByOneGenre(0);
}
seriePrototype.prototype.getSerieByOneGenre = function (i) {
    var that = this;
    that.serieModel.aggregate([
        {$match:{"genres.name": that.genresValides[i] }},
        {$group:{ _id:null, total:{$sum:1}, avg:{$avg: "$note"} }}
        ], function(error, result) {
            console.log(result);
            if(result[0]!==undefined){
                var serieByGenre = {
                    "name": that.genresValides[i],
                    "nbSeries": result[0].total,
                    "avg" : result[0].avg
                    // "series" : tabSeries
                };
            } else {
                var serieByGenre = {};
            }
            console.log(serieByGenre);
            that.addTabSeryByGenre(serieByGenre);
            if(i<that.genresValides.length-1){
                that.getSerieByOneGenre(i+1);
            }
    });
};
seriePrototype.prototype.addTabSeryByGenre = function(serieByGenre) {
    this.tabSerieByGenre.push(serieByGenre);
    // console.log(this.tabSerieByGenre);
};
seriePrototype.prototype.setTabSerieByGenre = function(tabSerieByGenre){
    // console.log("setted");
    this.tabSerieByGenre = tabSerieByGenre;
    // console.log(this.tabSerieByGenre);
};
seriePrototype.prototype.getTabSerieByGenre = function(req,res) {
    // console.log(this.tabSerieByGenre);
    res.send(this.tabSerieByGenre);
};
seriePrototype.prototype.byYear = function(req,res) {
    this.serieModel.aggregate({$group : { _id : "$begin", count: { $sum: 1 } }}, {$sort:{"_id":1}},
        function(error, result) {
            // console.log(result);
            res.send(result);
        }
    );
}
module.exports = seriePrototype;
