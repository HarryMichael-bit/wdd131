const input = document.querySelector('#favchop');
const button = document.querySelector('button');
const list = document.querySelector('#list');

const chapters = [];

function output() {
    list.innerHTML = ''; // Clear existing list items

    chapters.forEach(chapter => {
        const li = document.createElement('li');
        li.textContent = chapter;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Delete ${chapter}`);

        li.append(deleteButton);
        list.append(li);
    });
}

button.addEventListener('click', () => {
    input.focus();

    if (input.value.trim() !== '') {
        chapters.push(input.value.trim());
        output();
        input.value = '';
    }
});

list.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const chapterText = e.target.parentNode.firstChild.textContent;
        chapters.splice(chapters.indexOf(chapterText), 1);
        output();
    }
});