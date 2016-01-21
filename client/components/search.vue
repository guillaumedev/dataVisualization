<template>
  <div class="row">
    <form class="col s8 offset-s2">
      <div class="row">
        <div class="input-field col s10">
          <input placeholder="Entrez le nom d'une série" id="name_serie" v-model="serieSearch" type="text" class="validate">
        </div>
        <div class="input-field col s2">
          <button class="btn waves-effect waves-light btn-large btn-floating orange darken-4" v-on="click: search" type="submit" name="action">
            <i class="material-icons right">search</i>
          </button>
        </div>
      </div>
    </form>

  </div>

  <div class="row">
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

    <div class="col s12 m6 l3" v-repeat="serie in tabSeries" v-transition="expand" track-by="_id" v-show="!inSearch">
      <div class="card medium cardSerie">
        <div class="card-image">
            <img class='activator' src="{{serie.imageSrc}}">
        </div>
        <div class="card-content">
            <span class="card-title activator grey-text text-darken-4 col s12 center-align">{{serie.title}}</span>
            <div class="col s12 littleMargin center-align"> 
            <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons" v-on="click : addFavorite(serie)">favorite</i></a><br>Ajouter aux favoris
            </div>
        </div>
        <div class="card-reveal">
            <span class="card-title grey-text text-darken-4 center-align center">{{serie.title}}<i class="material-icons right">close</i> 
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
</template>

<script>
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
</script>