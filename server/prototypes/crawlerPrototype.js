var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crawlerPrototype = function(serieModel) {
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
        "Expérimental",
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
        "Sport event",
        "Thriller",
        "Websérie",
        "Western"
    ];
};

crawlerPrototype.prototype.addAll = function() {
    var that = this;
    var i = 1;
    var interval = setInterval(function(){
        console.log('interval : '+i);
        that.addTenMoreSeries(i);
        i++;
        if(i == 967){
            clearInterval(interval);
        }
    },2000);
};

crawlerPrototype.prototype.addTenMoreSeries = function(i) {
    var that = this;
    request("http://www.allocine.fr/series-tv/?page="+i, function(error, response, body) {
        var $ = cheerio.load(body);
        $(".data_box").each(function() {
            var title = $(this).find('h2').text().trim();
            var production = $(this).find('tr').eq(0).find('td div').text().replace('\n',' ').trim().split('-');
            var tabGenres = $(this).find('tr').eq(2).find('td').text().split(',');
            var note = parseFloat($(this).find('.note').eq(0).text().trim().replace(',', '.'));
            var resume = $(this).find('.margin_5t').text().trim();
            var image = $(this).find('img').attr('src');
            console.log("\n------- " + title + " ---Notes : ",note);
            var stringGenre = "";
            var jsonGenre = [];
            var okForAdd = false;
            for(var j=0; j < tabGenres.length; j++){
                for(var k=0; k< that.genresValides.length;k++){
                    if(tabGenres[j].replace('\n','').trim() ==  that.genresValides[k]){
                        okForAdd = true;
                    }
                }
                jsonGenre.push({'name': tabGenres[j].replace('\n','').trim()});
                stringGenre += " "+tabGenres[j].replace('\n','').trim();
            }

            var currentSerie = new that.serieModel({
                'title': title.replace('\n','').trim(),
                'begin': production[0].replace('\n','').trim(),
                'end': production[1],
                'genres': jsonGenre,
                'note': note,
                'resume': resume.replace('\n','').trim(),
                'imageSrc': image
            });
            if(okForAdd && note != NaN){
                currentSerie.save();
            }
            else {
                console.log("Erreur de genres", jsonGenre);
            }
        });
    });
}
crawlerPrototype.prototype.deleteAll = function() {
    var query = this.serieModel.remove();
    query.exec();
};
module.exports = crawlerPrototype;
