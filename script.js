const addBook = document.querySelector('.add-book');
const addBookModal = document.getElementById('add-book-modal');
const formClose = document.getElementById('form-close');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookPages = document.getElementById('book-pages');
const bookRead = document.getElementById('book-read');
const submitButton = document.getElementById('modal-submit');
const booksContainer = document.querySelector('.books');
const removeBookButton = document.querySelector('.remove');
const dialogForm = document.getElementById('dialog-form');

const myLibrary = [];

//Event Listeners
addBook.addEventListener('click', () =>  addBookModal.showModal());
formClose.addEventListener('click', () => closeAddBookModal());
submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    submitBookForm();
});

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

    clearForm();
    displayBook(newBook);
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

    if(book.read){
        readButton.textContent = 'Read!';
        readButton.classList.add('alredy-read');
    }

    readButton.addEventListener('click', (e) => {
        const parentId = e.target.parentNode.parentNode.id;

        myLibrary.forEach((book) => { // Transform this into a function inside of Library class
            if(book.id == parentId){
                if(book.read){
                    readButton.textContent = 'Not read!';
                    e.target.classList.remove('alredy-read');
                    book.toggleRead();
                }
                else{
                    readButton.textContent = 'Alredy read!';
                    e.target.classList.add('alredy-read');
                    book.toggleRead();  
        }}});
    });

    removeButton.addEventListener('click', (e) => {
        const parentId = e.target.parentNode.parentNode.id;
        const parent = document.getElementById(parentId);

        const filterObj = myLibrary.filter(obj => {
            return obj.id == parentId;
        });

        myLibrary.splice(filterObj, 1);
        booksContainer.removeChild(parent);
    });

    if (book.read){
        readButton.textContent = 'Alredy read!';
        readButton.classList.add('alredy-read');
    } else {
        readButton.textContent = 'Not read';
    }

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    removeButton.textContent = 'Remove';

    bookCard.append(bookTitle, bookAuthor, bookPages, cardButtons);
    cardButtons.append(readButton, removeButton);

    return bookCard;
}

function displayBook(book) {
    const bookCard = createBookCard(book);
    booksContainer.appendChild(bookCard);
}

function idGenerator(){
    const randomNumber = Math.floor(Math.random() * 9000);
    const idAlredyExists = myLibrary.some((book)=>{ book.id === randomNumber; });

    if(idAlredyExists) idGenerator();
    else return randomNumber;
}

//Constructor
class Book {

    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = idGenerator();
        myLibrary.push(this);
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }
    
};

class Library {

    constructor(){
        const books = [];
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

const libTest = new Library;

const bookTest = new Book('palo','authortest',234,false);
const bookTest2 = new Book('estea','authortest2',424,true);

console.log(bookTest);
console.log(myLibrary);

//Prototype
//Book.prototype.toggleRead = function() {this.read = !this.read;}
