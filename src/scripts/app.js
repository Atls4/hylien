console.log("HELLO :)");
//Signs:  primary sections ->   💙
//        secondary sections -> 🔹
'use strict'
//💙 Storage 💙
const storeInput = {};
  storeInput.set = 1;
  storeInput.numbers = 10;
  storeInput.min = 1;
  storeInput.max = 100;
  storeInput.process = "A";
  storeInput.skewNumber = 50;
  storeInput.influence = 1;
  storeInput.sorting = "A";
  storeInput.separator = "A";

let storeOutput = []; //Const
let storeCopyText = "";

//💙 Events 💙
//Select dist shape
$("#dist-shapes li").on("click",function(){
  $("#dist-shapes li").removeClass("active");
  storeInput.process = $(this).data("info");
  $(this).addClass("active");
});
//Select sort sortType
$("#sorting-form input").on("click", function(){
  storeInput.sorting = $(this).data("info");
  console.log(storeInput.sorting);
});
//Select separator
$("#separator-form input").on("click", function(){
  storeInput.separator = $(this).data("info");
  console.log(storeInput.separator);
});
//Generate button
$('#generate-button').on("click",function(){
  storeOutput = []; //Clear output
  removeText();
  changeValues();
  generateNumbers(); //Generate numbers
  sort(storeInput.sorting); //Sorting 🔹
  separator(storeInput.separator); //Separator 🔹
});
//Copy button
$('#copy-button').on("click",function(){
  doCopy(storeOutput,' ');
  let clipboard = new Clipboard('#copy-button', {
      text: function(trigger) {
          return storeCopyText;
      }
  });

  clipboard.on('success',function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
  });
  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
});
//Select buttons
$("#input-1").on("focusin",function(){
  $("#input-1-a").addClass("mdc-text-field--focused");
});
//💙 Processing 💙
//💙 Post-processing 💙
//💙 Functions 💙
//Remove text
function removeText(){
  $("#outputField").empty();
}
//Change inputValues
function changeValues() {
  storeInput.set = $("#input-1").val();
  storeInput.numbers = $("#input-2").val();
  storeInput.min = $("#input-3").val();
  storeInput.max = $("#input-4").val();
  storeInput.skewNumber = $("#skew-field").val();

  //storeInput.process = "A"; or #dist-shapes li ActiveClass -> data-info;
  storeInput.influence = 1;
  // storeInput.sorting = "C";
  // storeInput.separator = "A"; same as process

}

//Generate
function generateNumbers() {
  for (let i = 0; i < storeInput.set; i++) {
    //storage for inner loop
    let innerArray = [];

    //Number loop
    for (let i = 0; i < storeInput.numbers; i++) {
      innerArray[i] = logic(storeInput.process);
    }
    //Output array
    storeOutput[i] = innerArray;
  }
}
//Do logic 🔹
function logic(processType){
  switch(processType){
    //Simple random
    case "A":
      return randomGen( storeInput.min,
                        storeInput.max);
      break;
    //Skew towards X
    case "F":
      return randomGenSkew( storeInput.min,
                            storeInput.max,
                            storeInput.skewNumber,
                            storeInput.influence);
      break;
    //Skew right
    case "C":
      return randomGenRight(  storeInput.min,
                              storeInput.max,
                              storeInput.skewNumber,
                              storeInput.influence);
      break;
    //Skew left
    case "B":
      return randomGenLeft( storeInput.min,
                            storeInput.max,
                            storeInput.skewNumber,
                            storeInput.influence);
      break;
    //Skew bell
    case "D":
      return randomGenBell( storeInput.min,
                            storeInput.max,
                            storeInput.skewNumber,
                            storeInput.influence);
      break;
    //Skew reverse
    case "E":
      return randomGenReverse( storeInput.min,
                            storeInput.max,
                            storeInput.skewNumber,
                            storeInput.influence);
      break;

    //Case C,D,E,... here
    default:
      console.error("Something went wrong with logic()");
      break;
  }

}

//Do random random
function randomGen(minimum,maximum){
  return Math.floor(Math.random()*(maximum - minimum +1) + minimum);
};
//Do skew random
function randomGenSkew(minimum,maximum,bias,influence){
  let rnd = Math.random()*(maximum - minimum +1) + minimum;
  let mix = Math.random()*influence;
  return Math.floor(rnd*(1-mix) + bias*mix);
}
//Do skew right
function randomGenRight(minimum,maximum,bias,influence){
  let rnd = Math.random()*(maximum - minimum +1) + minimum;
  let mix = Math.random()*influence;
  return Math.floor(rnd*(1-mix) + maximum*mix);
}
//Do skew left
function randomGenLeft(minimum,maximum,bias,influence){
  let rnd = Math.random()*(maximum - minimum +1) + minimum;
  let mix = Math.random()*influence;
  return Math.floor(rnd*(1-mix) + minimum*mix);
}
//Do bell-curve
function randomGenBell(minimum,maximum,bias,influence){
  let rnd = Math.random()*(maximum - minimum +1) + minimum;
  let mix = Math.random()*influence;
  return Math.floor(rnd*(1-mix) + (maximum-minimum)*mix);
}
//Do reverse bell-curve
function randomGenReverse(minimum,maximum,bias,influence){
  let rnd = Math.random()*(maximum - minimum +1) + minimum;
  let mix = Math.random()*influence;
  return Math.floor(rnd*(1-mix) + (minimum-maximum)*mix);
}
//Do sorting 🔹
function sort(sortType){
  switch(sortType){
    case "A":

      break;

    case "B":
      return sortLowHigh(storeOutput);
      break;

    case "C":
      return sortHighLow(storeOutput);
      break;

    default:
      console.log("Something went wrong with sort()");
      break;
  }
}
//Sort from lowest to highest number
function sortLowHigh(input){
  for (let i = 0; i < input.length; i++) {
    input[i].sort( (a,b) => {
      return a-b;
    });
  }
}
//Sort from highest to lowest number
function sortHighLow(input){
  for (let i = 0; i < input.length; i++) {
    input[i].sort( (a,b) => {
      return a-b;
    });
    input[i].reverse();
  }
}
//Do separator 🔹
function separator(separatorType){
  switch (separatorType) {
    case "A":
      return printOut(storeOutput,' ');
      break;

    case "B":
      return printOut(storeOutput,'<br>');
      break;

    case "C":
      return printOut(storeOutput,', ');
      break;

    default:
      console.log("Something went wrong with separator()");
      break;
  }
}
//Print out stuff
function printOut(input,separator){
  for (let i = 0; i < input.length; i++) {
    let primaryText = `<h3 class="mdc-typography--title copy-text">Set #${i+1}</h3>`;
    let secondaryText = `<p class="mdc-typography--body1 copy-text">${storeOutput[i].join(separator)}</p>`;
    let completeText = `<div>${primaryText}${secondaryText}</div>`;

    $("#outputField").append(completeText);
  }
}
//Do copy
function doCopy(input,separator){
  storeCopyText = ""; //Reset copy store
  for (let i = 0; i < input.length; i++) {
    let copyText = `Set #${i+1}\n${storeOutput[i].join(separator)}\n`;

    storeCopyText = storeCopyText + copyText;
  }
}
//Log info
function logE(){
  console.table(storeOutput);
}
