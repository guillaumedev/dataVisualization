module.exports = function(app, serieModel, crawlerPrototype, seriePrototype){
    var crawler = new crawlerPrototype(serieModel);
    var serie = new seriePrototype(serieModel);
    serie.byGenre();
    app.get('/', function(req, res) {
        console.log('Connection to the projetcs Lists');
        res.header('Access-Control-Allow-Origin', "*");
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end('COUCOUOUOUCOUCOU');
    })
    .post('/search', function(req,res) {
        console.log("On me cherche !");
        serie.search(req,res);
    })
    .post('/serieByGenre', function(req,res) {
        console.log("SerieByGenre asked");
        serie.getTabSerieByGenre(req,res);
    })
    .post('/serieByYear', function(req,res) {
        serie.byYear(req,res);
    })
    .post('/searchSame', function(req,res) {
        console.log('searchSame');
        serie.searchSame(req, res);
    })
    .get('/crawler/add', function(req,res) {
        crawler.addAll();
        res.header('Access-Control-Allow-Origin', "*");
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end('Crawling en cours, cela peut prendre quelques heures...');
    })
    .get('/crawler/del', function(req,res) {
        crawler.deleteAll();
        res.header('Access-Control-Allow-Origin', "*");
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end('Destruction de tout les enregistrements de séries.');
    })

    .use(function(req, res, next){

    });

}
