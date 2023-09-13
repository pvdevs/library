const addBook = document.querySelector('.add-book');
const addBookModal = document.getElementById('add-book-modal');
const formClose = document.getElementById('form-close');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookPages = document.getElementById('book-pages');
const bookRead = document.getElementById('book-read');
const submitButton = document.getElementById('modal-submit');
const books = document.querySelector('.books');
const removeBookButton = document.querySelector('.remove');
const dialogForm = document.getElementById('dialog-form');

const myLibrary = [];

addBook.addEventListener('click', (e) => { addBookModal.showModal(); });

formClose.addEventListener('click', () => closeAddBookModal());

function closeAddBookModal() {
    addBookModal.close();
}

function submitBookForm() {
    if(!validateForm()) return;

    const newBook = new Book(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        bookRead.checked
    );

    clearForm();
    displayBook(newBook.id - 1);
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

function clearForm() { dialogForm.reset(); }

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    submitBookForm();
});

function createBookCard(title, author, pages, read, id) {
    const book = document.createElement('div');
    book.classList.add('book');
    book.setAttribute("id", `${id}`);

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

    readButton.addEventListener('click', (e) => {
        const parentId = e.target.parentNode.parentNode.id;

        if(myLibrary[parentId - 1].read) {
            readButton.textContent = 'Not read!'
            e.target.classList.remove('alredy-read');
            myLibrary[parentId - 1].toggleRead();   
        } else {
            readButton.textContent = 'Alredy read!'
            e.target.classList.add('alredy-read');
            myLibrary[parentId - 1].toggleRead();         
        }        
    });

    removeButton.addEventListener('click', (e) => {
        const parentId = e.target.parentNode.parentNode.id;
        const parent = document.getElementById(parentId);

        books.removeChild(parent);
        myLibrary.splice(parentId - 1 , 1);
    });

    if (read){
        readButton.textContent = 'Alredy read!';
        readButton.classList.add('alredy-read');
    } else {
        readButton.textContent = 'Not read';
    }
    bookTitle.textContent = title;
    bookAuthor.textContent = author;
    bookPages.textContent = pages;
    removeButton.textContent = 'Remove';


    book.append(bookTitle, bookAuthor, bookPages, cardButtons);
    cardButtons.append(readButton, removeButton);
    books.appendChild(book);
}

function displayBook(id) {
    createBookCard(
        myLibrary[id].title,
        myLibrary[id].author,
        myLibrary[id].pages,
        myLibrary[id].read,
        myLibrary[id].id);
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = myLibrary.length + 1;
    this.info = () => console.log(`${this.title} by ${this.author}, ${this.pages} Pages, ${this.read} Read, ${this.id} Id.`);
    myLibrary.push(this);
};

Book.prototype.info = function () {
    console.log(`
    ${this.title} by
    ${this.author},
    ${this.pages} Pages,
    ${this.read} Read,
    ${this.id} Id.`);
}

Book.prototype.toggleRead = function() { this.read = !this.read; }
