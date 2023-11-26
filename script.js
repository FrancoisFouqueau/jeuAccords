const chords = {
    // Accords majeurs
    "C": ["C", "E", "G"],
    "C#": ["C#", "F", "G#"],
    "D": ["D", "F#", "A"],
    "D#": ["D#", "G", "A#"],
    "E": ["E", "G#", "B"],
    "F": ["F", "A", "C"],
    "F#": ["F#", "A#", "C#"],
    "G": ["G", "B", "D"],
    "G#": ["G#", "C", "D#"],
    "A": ["A", "C#", "E"],
    "A#": ["A#", "D", "F"],
    "B": ["B", "D#", "F#"],

    // Accords mineurs
    "Cm": ["C", "D#", "G"],
    "C#m": ["C#", "E", "G#"],
    "Dm": ["D", "F", "A"],
    "D#m": ["D#", "F#", "A#"],
    "Em": ["E", "G", "B"],
    "Fm": ["F", "G#", "C"],
    "F#m": ["F#", "A", "C#"],
    "Gm": ["G", "A#", "D"],
    "G#m": ["G#", "B", "D#"],
    "Am": ["A", "C", "E"],
    "A#m": ["A#", "C#", "F"],
    "Bm": ["B", "D", "F#"]
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

    // Jouer le son de la note
    playNoteSound(note);

    // Reste de la fonction keyPressed...


function playNoteSound(note) {
    const audio = new Audio(`sounds/${note}.mp3`); // Assurez-vous que le chemin est correct
    audio.play();
}


    document.getElementById('clickedNoteDisplay').textContent = note;

    // Vérifier si la note appartient à l'accord et n'a pas été déjà cliquée
    if (currentChord.includes(note) && !clickedNotes.includes(note)) {
        clickedNotes.push(note);
        updateMessage(note + " fait partie de l'accord.");
    } else if (!currentChord.includes(note)) {
        updateMessage(note + " ne fait pas partie de l'accord.");
    } else {
        updateMessage(note + " a déjà été sélectionnée.");
    }

    // Vérifier si l'accord est complet après trois clics
    if (clickedNotes.length == 3) {
        checkIfChordComplete();
    }
}

function updateMessage(message) {
    document.getElementById('messageDisplay').textContent = message;
}

function checkIfChordComplete() {
    let correctNotes = currentChord.every(note => clickedNotes.includes(note)) && clickedNotes.length == 3;
    if (correctNotes) {
        updateMessage("Bravo ! Rafraîchir la page pour un nouvel accord");
        //chooseRandomChord();
    } else {
        updateMessage("Attention, vous n'avez pas donné les trois bonnes notes. Vous pouvez rafraîchir la page pour un nouvel accord");
        clickedNotes = [];
    }
}

