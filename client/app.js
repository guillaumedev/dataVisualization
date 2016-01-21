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
        component: require('./components/search.vue')
    },
    '/charts': {
        component: require('./components/charts.vue')
    },
    '/favorite': {
        component: require('./components/favorite.vue')
    },
    '/crawl': {
        component: require('./components/crawl.vue')
    }
});


router.start(App, '#app')