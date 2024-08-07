/*--------
    Make the Options Button 
    . on click
    . show or hide the `.sides` div
---------*/
    
document.querySelector('#unhide').addEventListener('click', function() {
    document.querySelector('.sides').classList.toggle('hidden');
});
    
/*---------
    Program the two fill inputs to do the following:
    . Display the correct colors on the inputs and outputs and paddles    
    . using an `input` event
        . Change the player's fill property to the value of the input
        . Change the pad's fill property  to the player's fill property
        . Show the fill's hex code in the output div 
-----------*/

// update players color
function updatePlayerColor(playerIndex, color) {
    console.log(`Updating player ${playerIndex + 1} color to ${color}`);
    player[playerIndex].setProps({ fill: color });
    pad[playerIndex].setProps({ fill: color });
}

// event listeners for player color inputs
document.getElementById('player1Fill').addEventListener('input', function(event) {
    updatePlayerColor(0, event.target.value);
});

document.getElementById('player2Fill').addEventListener('input', function(event) {
    updatePlayerColor(1, event.target.value);
});

// update stroke color
function updateStrokeColor(paddleIndex, color) {
    console.log(`Updating stroke color of paddle ${paddleIndex} to ${color}`);
    pad[paddleIndex].setProps({ stroke: color });
}

// event listener for stroke color input
document.getElementById('p1strokeColor').addEventListener('input', function(event) {
    updateStrokeColor(0, event.target.value); // Assuming paddle 1 is at index 0
});
document.getElementById('p2strokeColor').addEventListener('input', function(event) {
    updateStrokeColor(1, event.target.value); // Assuming paddle 2 is at index 1
});


/*---------
    Program the six key inputs to do the following:
    . Display the correct key names for each player   
    . using a `keydown` event
        .Display the correct key name in the input
        .Change the player's key to the value of the input
        .Show the player's key in the output div 
-----------*/

// up key update
function updatePlayerUpKey(playerIndex, key) {
    console.log(`Updating player ${playerIndex + 1} up key to ${key}`);
    // only update the up key
    player[playerIndex].setProps({
      keys: {
        u: key,
        d: player[playerIndex].keys.d
      }
    });
  }
  // event listeners for player up key inputs
  document.getElementById('player1Up').addEventListener('keydown', function(event) {
    updatePlayerUpKey(0, event.key);
  });
  
  document.getElementById('player2Up').addEventListener('keydown', function(event) {
    updatePlayerUpKey(1, event.key);
  });
  
  // down key update
  function updatePlayerDownKey(playerIndex, key) {
    console.log(`Updating player ${playerIndex + 1} down key to ${key}`);

    player[playerIndex].setProps({
      keys: {
        d: key,
        u: player[playerIndex].keys.u
      }
    });
  }
  // event listeners for player down key inputs
  document.getElementById('player1Down').addEventListener('keydown', function(event) {
    updatePlayerDownKey(0, event.key);
  });
  
  document.getElementById('player2Down').addEventListener('keydown', function(event) {
    updatePlayerDownKey(1, event.key);
  });


  // straight key update
function updatePlayerStraightKey(playerIndex, key) {
    console.log(`Updating player ${playerIndex + 1} straight key to ${key}`);

    player[playerIndex].setProps({
      keys: {
        u: player[playerIndex].keys.u,
        d: player[playerIndex].keys.d,
        s: key
      }
    });
  }
// event listeners for player straight key inputs
document.getElementById('player1S').addEventListener('keydown', function(event) {
    updatePlayerStraightKey(0, event.key);
});
document.getElementById('player2S').addEventListener('keydown', function(event) {
    updatePlayerStraightKey(1, event.key);
});


  
// height adjustment
function updatePlayerHeight(playerIndex, height) {
    console.log(`Updating player ${playerIndex + 1} height to ${height}`);
    player[playerIndex].setProps({ h: height });
    pad[playerIndex].setProps({ h: height });
}

// event listeners for player height inputs
document.getElementById('player1Height').addEventListener('input', function(event) {
    updatePlayerHeight(0, event.target.value);
});
document.getElementById('player2Height').addEventListener('input', function(event) {
    updatePlayerHeight(1, event.target.value);
});



// pause and resume functionality
const pauseGame = () => {
    gamePaused = true;
    currentState = 'pause';
};

const resumeGame = () => {
    gamePaused = false;
    currentState = 'game';
};

// get all inputs that should pause the game
const pauseInputs = document.querySelectorAll
(
    '#player1Up, #player1Down, #player2Up, #player2Down, #player1Fill, #player2Fill, #p1strokeColor, #p2strokeColor, #player1S, #player2S'
);

// add event listeners to pause and resume the game
pauseInputs.forEach(input => {
    input.addEventListener('focus', pauseGame);
    input.addEventListener('blur', resumeGame);
});

  
