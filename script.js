const addBook = document.querySelector('.add-book');
const addBookModal = document.querySelector('#add-book-modal');

addBook.addEventListener('click', (e) => {
    addBookModal.showModal();
});



const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        console.log(`${title} by ${author}, ${pages} Pages.`);
    }    
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

theHobbit.info;

// Notes for myself -> I need to create the function that toggles if i read or not the book.