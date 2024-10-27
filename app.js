const emojis = {
    smile: 0,
    blush: 0,
    cool: 0,
    star: 0,
    love: 0
};

function loadVotes() {
    const savedVotes = JSON.parse(localStorage.getItem('votes'));
    if (savedVotes) {
        for (let key in savedVotes) {
            emojis[key] = savedVotes[key];
            document.getElementById(`count-${key}`).textContent = savedVotes[key];
        }
    }
}

function saveVotes() {
    localStorage.setItem('votes', JSON.stringify(emojis));
}

document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', () => {
        const id = emoji.getAttribute('data-id');
        emojis[id]++;
        document.getElementById(`count-${id}`).textContent = emojis[id];
        saveVotes();
    });
});

document.getElementById('showResults').addEventListener('click', () => {
    let winner = null;
    let maxVotes = 0;
    for (let [key, votes] of Object.entries(emojis)) {
        if (votes > maxVotes) {
            maxVotes = votes;
            winner = key;
        }
    }

    if (winner) {
        document.getElementById('winner').textContent = document.querySelector(`.emoji[data-id="${winner}"]`).textContent;
        document.getElementById('voteCount').textContent = maxVotes;
    }
});

document.getElementById('clearResults').addEventListener('click', () => {
    for (let key in emojis) {
        emojis[key] = 0;
        document.getElementById(`count-${key}`).textContent = 0;
    }
    saveVotes();
    document.getElementById('winner').textContent = '-';
    document.getElementById('voteCount').textContent = '0';
    localStorage.removeItem('votes');
});

window.onload = loadVotes;
