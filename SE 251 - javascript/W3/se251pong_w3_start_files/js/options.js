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

// Function to update player color
function updatePlayerColor(playerIndex, color) {
    console.log(`Updating player ${playerIndex + 1} color to ${color}`);
    player[playerIndex].setProps({ fill: color });
    pad[playerIndex].setProps({ fill: color });
}

// Add event listeners to color pickers
document.getElementById('player1Fill').addEventListener('input', function(event) {
    updatePlayerColor(0, event.target.value);
});

document.getElementById('player2Fill').addEventListener('input', function(event) {
    updatePlayerColor(1, event.target.value);
});


/*---------
    Program the six key inputs to do the following:
    . Display the correct key names for each player   
    . using a `keydown` event
        .Display the correct key name in the input
        .Change the player's key to the value of the input
        .Show the player's key in the output div 
-----------*/
