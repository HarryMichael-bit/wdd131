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
        deleteButton.addEventListener('click', () => {
            chapters.splice(chapters.indexOf(chapter), 1);
            output();
        });

        li.append(deleteButton);
        list.append(li);
    });
}

button.addEventListener('click', () => {
    if (input.ariaValueMax.trim() !== '') {
        chapters.push(input.value.trim());
        output();
        input.value = '';
        input.focus();
    }
});
