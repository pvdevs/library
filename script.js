function Book(title, author, pages, youHaveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.youHaveRead = youHaveRead;
    this.info = function () {
        youHaveRead ? console.log(`${this.title} by ${this.author}, ${this.pages} pages, Alredy read!`) : console.log(`${this.title} by ${this.author}, ${this.pages} pages, Not read yet!`);

    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

theHobbit.info;