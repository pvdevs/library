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
    bookCard.classList.add('book');
    bookCard.setAttribute("id", `${book.id}`);

    const bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-info', 'title');

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-info', 'author');

    const bookPages = document.createElement('p');
    bookPages.classList.add('book-info', 'pages');

    const cardButtons = document.createElement('div'); // append os botoes aq // UNFINISHED (rever logica dos botoes de card)
    cardButtons.classList.add('buttons');

    const readButton = document.createElement('button');
    readButton.classList.add('book-info', 'read');

    const removeButton = document.createElement('button');
    removeButton.classList.add('book-info', 'remove');

    readButton.addEventListener('click', (e) => {
        const parentId = e.target.parentNode.parentNode.id;

        myLibrary.forEach((book) => {
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
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = idGenerator();
    myLibrary.push(this);
};

//Prototype
Book.prototype.toggleRead = function() { this.read = !this.read; }
