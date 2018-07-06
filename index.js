
/* things to do before pg loads: */

/* els to hide initially */
$(".no-faves-yet").hide();
$(".new-char").hide();


/* URL to our BE: */
// const BEurl = 'http://localhost:3000';
const BEurl = "https://immense-basin-20540.herokuapp.com/";

/* retrieve & append favorites */
function retrieveFaves(){
  $.ajax({
    url: BEurl + '/favorites',
    method: 'GET'
  }).done(function(response) {
    if(response){
      /*1st remove all LIs from that UL */
      $("#faves-list").empty();
      response.forEach(function (marvelObj) {
        let newLi = `<li data-marvel-id=${marvelObj.marvel_id}><i class="tiny material-icons heart">favorite</i>${marvelObj.name}</li>`
        $("#faves-list").append(newLi);
      });
    } else {
      $(".no-faves-yet").show();
    }
  });
}
retrieveFaves();


window.onload = function() {
  console.log('HULK SMASH!');

  /* unfavorite heart click fx. */
  $("#faves-list").click(function(ev){
    let theLI = ev.target.closest("li");
    let theMarvelIdToDelete = theLI.dataset.marvelId;

    $.ajax({
      url: BEurl + `/favorites/${theMarvelIdToDelete}`,
      method: 'DELETE'
    }).done(function(response){
      console.log("response:", response);
      retrieveFaves();
    });
  });


  /* search Marvel fxn */
  $(".marvel-search-btn").click(function(ev){
    let data = {
      charName: $("#character_name").val()
    };
    $.ajax({
      url: BEurl + '/marvel/search',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("Marvel response:", response);
      if(response.data.count){
        $("#char-info").remove();
        $(".char-description").empty();

        let character = response.data.results[0];
        let charName = character.name;
        let marvelID = character.id;

        if(character.description){
          let charDescrip = character.description;
          $(".char-description").append(`<span>${charDescrip}</span>`);
        } else {
          /* show "no description provided"*/
          $(".char-description").append(`<span><em>No description provided</em></span>`);
        }

        if(character.thumbnail.path && character.thumbnail.extension){
          let imgUrl = `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`
          $("#char-img").attr('src', imgUrl);
        }
        $(".char-name").prepend(`<span id="char-info" data-marvel-id=${marvelID} data-marvel-name=${charName}>${charName}</span>`);
        $(".new-char").show();
      } else {
        $(".no-char-found").append("<span>Sorry, that character could not be found.</span>");
      }
    });
  });


  /* Add favorite fxn */
  $("i.new-char").click(function(ev){
    let data = {
      marvel_id: $("#char-info")[0].dataset.marvelId,
      name: document.getElementById('char-info').innerText
    }
    console.log(data);

    $.ajax({
      url: BEurl + '/favorites/new',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response){
      console.log("Response:", response);
      retrieveFaves();
    });
  });









}; /* end window onload fxn */
