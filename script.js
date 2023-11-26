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
