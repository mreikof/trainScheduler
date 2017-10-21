// Crystal Collector//
var wins = 0;
var losses = 0;
//players currunt score
var addition = 0;
//selects a random number from 19 t0 120
var total = Math.floor((Math.random()* 100) + 19);
//assigns random value to crystals from 1-12
var red = Math.floor((Math.random()* 12) + 1);
var blue = Math.floor((Math.random()* 12) + 1);
var yellow = Math.floor((Math.random()* 12) + 1);
var green = Math.floor((Math.random()* 12) + 1);
var audio = new Audio("https://files.slack.com/files-pri/T0J8XK2Q3-F0NHG3FDZ/download/raven.mp3");

//updates addition in html
var updateAddition = function (){
  $(".addition").empty();
  $(".addition").append(addition);
  $("#wins").empty();
  $("#wins").append(wins);
  $("#losses").empty();
  $("#losses").append(losses);
}
//restart function
var restart = function(){
  addition = 0;
    total = Math.floor((Math.random()* 100) + 19);

  $(".total").empty();
  $(".total").append(total);

  red = Math.floor((Math.random()* 12) + 1);
    blue = Math.floor((Math.random()* 12) + 1);
    yellow = Math.floor((Math.random()* 12) + 1);
    green = Math.floor((Math.random()* 12) + 1);
    //alert('restart');
    updateAddition();
}
var logic = function (){
  if (addition == total) {
    wins = wins + 1;
    
    audio.play();
    restart();
  }else if(addition > total){
    losses = losses + 1;
    
    audio.play();
    restart();
  }else{
    updateAddition();
  }
}
$(".total").append(total);

$(".addition").append(addition);
//function

$(document).ready(function(){
  $("#red").click(function(){
    addition = addition + red;
    logic();
  })
  $("#blue").click(function(){
    addition = addition + blue;
    logic();
  })
  $("#yellow").click(function(){
    addition = addition + yellow;
    logic();
  })
  $("#green").click(function(){
    addition = addition + green;
    logic();
  })


});
