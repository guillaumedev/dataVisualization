<template>
<div class="col s12 center-align">
<a class="waves-effect waves-light btn" href="http://localhost:1337/crawler/add" target="_blank">Crawler les données</a>
<a class="waves-effect waves-light btn" href="http://localhost:1337/crawler/del" target="_blank">Supprimer les données</a>
</div>
</template>

http://localhost:1337/crawler/add

<script>
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
</script>