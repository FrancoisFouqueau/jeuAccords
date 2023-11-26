const chords = {
    "C": ["C", "E", "G"],
    "D": ["D", "F#", "A"],
    "E": ["E", "G#", "B"],
    // Ajoutez d'autres accords ici si nécessaire
};

let currentChord = [];
let clickedNotes = [];

window.onload = () => {
    chooseRandomChord();
};

function chooseRandomChord() {
    const chordKeys = Object.keys(chords);
    const randomChord = chordKeys[Math.floor(Math.random() * chordKeys.length)];
    currentChord = chords[randomChord];
    clickedNotes = [];
    document.getElementById('chordDisplay').textContent = randomChord;
    document.getElementById('messageDisplay').textContent = "Cliquez sur les notes de l'accord";
}

function keyPressed(note) {
    document.getElementById('clickedNoteDisplay').textContent = note;

    if (currentChord.includes(note)) {
        updateMessage(note + " fait partie de l'accord.");
        if (!clickedNotes.includes(note)) {
            clickedNotes.push(note);
        }
    } else {
        updateMessage(note + " ne fait pas partie de l'accord.");
    }

    if (clickedNotes.length >= currentChord.length) {
        checkIfChordComplete();
    }
}

function updateMessage(message) {
    document.getElementById('messageDisplay').textContent = message;
}

function checkIfChordComplete() {
    let correctNotes = currentChord.every(note => clickedNotes.includes(note));
    if (correctNotes) {
        updateMessage("Bravo ! Vous avez joué l'accord correctement.");
        chooseRandomChord();
    } else {
        updateMessage("Ce n'est pas le bon accord. Essayez encore !");
        clickedNotes = [];
    }
}
