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

function keyPressed(noteText, soundId) {
    document.getElementById('clickedNoteDisplay').textContent = noteText;
    playNoteSound(soundId);

    // Logique pour vérifier l'appartenance à l'accord
    if (currentChord.includes(noteText) && !clickedNotes.includes(noteText)) {
        clickedNotes.push(noteText);
        updateMessage(noteText + " fait partie de l'accord.");
    } else if (!currentChord.includes(noteText)) {
        updateMessage(noteText + " ne fait pas partie de l'accord.");
    } else {
        updateMessage(noteText + " a déjà été sélectionnée.");
    }

    if (clickedNotes.length == 3) {
        checkIfChordComplete();
    }
}


function playNoteSound(soundId) {
    const audio = new Audio(`sounds/${soundId}.mp3`);
    audio.play();
}


    document.getElementById('clickedNoteDisplay').textContent = note;

    
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

