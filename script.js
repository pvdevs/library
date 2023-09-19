const addBook = document.querySelector('.add-book');
const addBookModal = document.getElementById('add-book-modal');
const formClose = document.getElementById('form-close');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookPages = document.getElementById('book-pages');
const bookRead = document.getElementById('book-read');
const submitButton = document.getElementById('modal-submit');
const booksContainer = document.querySelector('.books');
const dialogForm = document.getElementById('dialog-form');

const myLibrary = [];

//Event Listeners
addBook.addEventListener('click', () =>  addBookModal.showModal());
formClose.addEventListener('click', () => closeAddBookModal());
submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    submitBookForm();
});

function buttonsListeners(readBtn, removeBtn, book) {
    readBtn.addEventListener('click', (e) => {
        books.readBook(book.id);
        if(book.isRead){
            readBtn.textContent = 'Alredy read!';
            readBtn.classList.add('alredy-read');
        } else {
            readBtn.textContent = 'Not read';
            readBtn.classList.remove('alredy-read');
        }
    });

    removeBtn.addEventListener('click', e => {
        books.removeBook(book.id);
        booksContainer.removeChild(document.getElementById(book.id))
    })
}

//Functions
function closeAddBookModal() { addBookModal.close(); }
function clearForm() { dialogForm.reset(); }

function submitBookForm() {
    if(!validateForm()) return;

    const newBook = new Book(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        bookRead.checked
    );

    books.addBook(newBook);

    clearForm();
    createBookCard(newBook);
    addBookModal.close();
}

function validateForm() {
    if(bookTitle.value === '') {
        bookTitle.focus();
        return false;
    }
    if(bookAuthor.value === '') {
        bookAuthor.focus();
        return false;
    }
    if(bookPages.value <= 1) {
        bookPages.focus();
        return false;
    } else {
        return true;
    }
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const cardButtons = document.createElement('div');
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button');

    bookCard.classList.add('book');
    bookTitle.classList.add('book-info', 'title');
    bookAuthor.classList.add('book-info', 'author');
    bookPages.classList.add('book-info', 'pages');
    cardButtons.classList.add('buttons');
    readButton.classList.add('book-info', 'read');
    removeButton.classList.add('book-info', 'remove');

    bookCard.setAttribute("id", `${book.id}`);

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    removeButton.textContent = 'Remove';

    buttonsListeners(readButton, removeButton, book);

    if (book.isRead){
        readButton.textContent = 'Alredy read!';
        readButton.classList.add('alredy-read');
    } else {
        readButton.textContent = 'Not read';
        readButton.classList.remove('alredy-read');
    }

    bookCard.append(bookTitle, bookAuthor, bookPages, cardButtons);
    cardButtons.append(readButton, removeButton);

    booksContainer.appendChild(bookCard);
}


//Classes
class Book {

    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this._id = Math.floor(Math.random() * 900);
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        if (books.isInLibrary(this)) {
            this._id = Math.floor(Math.random() * 900);
        }
    }

};


class Library {

    constructor(){
        this.books = [];
    }

    addBook(newBook) {
        if(!this.isInLibrary(newBook)) this.books.push(newBook);
    }

    removeBook(bookId){
        this.books = this.books.filter(book => book.id !== bookId);
    }

    readBook(bookId) {
        const book = this.books.find(book => book.id === bookId);
        book.toggleRead();
    }
    
    isInLibrary(newBook) {
        return this.books.some(book => book.id === newBook.id);
    }
}

const books = new Library();
