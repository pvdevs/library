function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.info = function () {
        console.log(`${title} by ${author}, ${pages} Pages.`);
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

theHobbit.info;