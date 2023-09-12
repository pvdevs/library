const myLibrary = [];

const addBook = document.querySelector('.add-book');
const addBookModal = document.querySelector('#add-book-modal');
const formClose = document.querySelector('#form-close');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#book-pages');
const bookRead = document.querySelector('#book-read');
const submitButton = document.querySelector('#modal-submit');
const books = document.querySelector('.books');



addBook.addEventListener('click', (e) => {
    addBookModal.showModal();
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    const temp = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookRead.checked = false;
    
    //console.log(myLibrary); //remove later
    displayBooks(temp.id - 1);
    addBookModal.close();
});

bookRead.addEventListener('click', (e) => {
    console.log(bookRead.checked);
});


function createBookCard(title, author, pages, read) {
    const div = document.createElement('div');
    div.classList.add('book');

    const bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-info');
    bookTitle.classList.add('title');

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-info');
    bookAuthor.classList.add('author');

    const bookPages = document.createElement('p');
    bookPages.classList.add('book-info');
    bookPages.classList.add('pages');

    const cardButtons = document.createElement('div'); // append os botoes aq // UNFINISHED (rever logica dos botoes de card)
    cardButtons.classList.add('buttons');

    const readButton = document.createElement('button');
    readButton.classList.add('book-info');
    readButton.classList.add('read');

    const removeButton = document.createElement('button');
    removeButton.classList.add('book-info');
    removeButton.classList.add('remove');

    bookTitle.textContent = title;
    bookAuthor.textContent = author;
    bookPages.textContent = pages;
    readButton.textContent = 'Read';
    removeButton.textContent = 'Remove';

    div.append(bookTitle, bookAuthor, bookPages);
    div.appendChild(cardButtons);

    cardButtons.append(readButton, removeButton);

    books.appendChild(div);
}

function displayBooks(id) {
    createBookCard(myLibrary[id].title, myLibrary[id].author, myLibrary[id].pages, myLibrary[id].read);
}




function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = myLibrary.length + 1;
    this.info = function () {
        console.log(`${this.title} by ${this.author}, ${this.pages} Pages, ${this.read} Read, ${this.id} Id.`);
    }
    myLibrary.push(this);
};


const theHobbit1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const theHobbit2 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const theHobbit3 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);


Book.prototype.info = function () {
    console.log(`
    ${this.title} by
    ${this.author},
    ${this.pages} Pages,
    ${this.read} Read,
    ${this.id} Id.`);
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

theHobbit1.info();
theHobbit2.info();
theHobbit3.info();

console.log(myLibrary);

// Notes for myself -> I need to create the function that toggles if i read or not the book.
