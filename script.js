const myLibrary = [];

const addBook = document.querySelector('.add-book');
const addBookModal = document.querySelector('#add-book-modal');
const formClose = document.querySelector('#form-close');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#book-pages');
const bookRead = document.querySelector('#book-read');
const submitButton = document.querySelector('#modal-submit');



addBook.addEventListener('click', (e) => {
    addBookModal.showModal();
});

submitButton.addEventListener('click', (e) => {

});

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

myLibrary.push(theHobbit1, theHobbit2, theHobbit3);

Book.prototype.info = function () {
    console.log(`
    ${this.title} by
    ${this.author},
    ${this.pages} Pages,
    ${this.read} Read,
    ${this.id} Id.`);
}

theHobbit1.info();
theHobbit2.info();
theHobbit3.info();

// Notes for myself -> I need to create the function that toggles if i read or not the book.
