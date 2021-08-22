// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state){
    if (state=="DIRTY") return "CLEAN";
    else if (location=="A") return "RIGHT";
    else if (location=="B") return "LEFT";
}

function ensuciar(states){
    let location = states[0];
    let sideA = states[1];
    let sideB = states[2];

    let ramd = Math.random() * (10 - 1) +1;

    if(sideA == "CLEAN" && ramd > 6){
        states[1] = "DIRTY";
        print_action(location, "DIRTY SIDE A");
    }

    ramd = Math.random() * (10 - 1) +1;
    if(sideB == "CLEAN" && ramd > 6){
        states[2] = "DIRTY";
        print_action(location, "DIRTY SIDE B");
    }

    return states;
}

function cantidad_veces(){
    for(let i=1; i < 9 ;i++){
      let cell = "es"+i;
      let cont = parseInt( document.getElementById(cell).innerHTML );
      if(cont < 2) return false;
    }
    return true;
}

function contador(states){
    let location = states[0];
    let sideA = states[1];
    let sideB = states[2];

    let position = 1;
    
    if(sideA == "DIRTY" && sideB == "DIRTY"){
      position = 1;
    }else if(sideA == "DIRTY" && sideB == "CLEAN"){
      position = 3;
    }else if(sideA == "CLEAN" && sideB == "DIRTY"){
      position = 5;
    }else{
      position = 7;
    }

    if(location != "A"){
        position += 1;
    }
    
    const cell = "es"+position;
    let cont = parseInt( document.getElementById(cell).innerHTML );
    document.getElementById(cell).innerHTML = cont+1;
    
}

function test(states){

      contador(states);
       var location = states[0];		
       var state = states[0] == "A" ? states[1] : states[2];
       var result = reflex_agent(location, state);
       print_action(location, result);
       if (result == "CLEAN"){
         if (location == "A") states[1] = "CLEAN";
          else if (location == "B") states[2] = "CLEAN";
       }
       else if (result == "RIGHT") states[0] = "B";
       else if (result == "LEFT") states[0] = "A";		
 
       states = ensuciar(states);

       if( !cantidad_veces() ){ 
           setTimeout(function(){ test(states); }, 300);
        }
}

function print_action(location, action){
  document.getElementById("parrafo").innerHTML+= `<br>Location: ${location} | Action: ${action}`;
}

var states = ["A","DIRTY","DIRTY"];
test(states);
