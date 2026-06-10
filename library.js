const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
const bookPages = document.querySelector("#pages")
const bookList = document.querySelector(".bookList")
const dialog = document.querySelector("#bookDialog")
const newBook = document.querySelector("#newBook")
const submitBookBtn = document.querySelector("#submitBookBtn")
const cancelBtn = document.querySelector("#cancelBtn")
const bookForm = document.querySelector("#bookForm")

newBook.addEventListener('click', () => {
    dialog.showModal(); 
});

cancelBtn.addEventListener('click', () => {
    dialog.close();
    bookForm.reset();
});

const myLibrary = [
    new Book('The Hobbit', 'J.R.R. Tolkien', 310, 'Read'),
    new Book('Dune', 'Frank Herbert', 412, 'Read'),
    new Book('1984', 'George Orwell', 328, 'Not Read')
];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
  if (this.read === "Read") {
    this.read = "Not Read";
  } else {
    this.read = "Read";
  }
};

function addBookToLibrary(title, author, pages, read) {
    const bookInstance = new Book(title, author, pages, read)
    myLibrary.push(bookInstance)
}

const displayBooks = () => {
    bookList.innerHTML = "";

    for (const book of myLibrary) {
        const card = document.createElement('div')
        const title = document.createElement('h2')
        const author = document.createElement('p')
        const pages = document.createElement('p')
        const read = document.createElement('p')
        const removeBtn = document.createElement('button')
        const togglebtn = document.createElement('button')
        
        title.textContent = `${book.title}`
        author.textContent = `${book.author}`
        pages.textContent = `${book.pages}`
        read.textContent = `${book.read}`
        removeBtn.textContent = "Remove"
        togglebtn.textContent = "Toggle Read"

        togglebtn.classList.add('toggle-read')
        removeBtn.classList.add('remove-btn')
        card.classList.add("card")

        if (book.read === "Read") {
            card.classList.add('is-read');
            card.classList.remove('not-read'); // Cleans up old classes on re-render
        } else {
            card.classList.add('not-read');
            card.classList.remove('is-read'); // Cleans up old classes on re-render
        }
        
        card.setAttribute('data-id', `${book.id}`)
        card.append(title, author, pages, read, togglebtn, removeBtn)

        const removeButton = card.querySelector('.remove-btn')
        const toggleButton = card.querySelector('.toggle-read')

        toggleButton.addEventListener('click', () => {
            const bookToReadEdit = card.dataset.id;
            const targetBook = myLibrary.find(b => b.id === bookToReadEdit)

            if (targetBook) {
                targetBook.toggleRead()
            }
            
            displayBooks()
        })

        removeButton.addEventListener('click', () => {
            // Read the card's data-id attribute
            const bookIdToToRemove = card.dataset.id;

            const bookIndex = myLibrary.findIndex(b => b.id === bookIdToToRemove)

            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1)
            }

            displayBooks()
        })

        
        bookList.appendChild(card)
    }
}

submitBookBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const checkedRadio = document.querySelector('input[name="readStatus"]:checked')

    const title = bookTitle.value
    const author = bookAuthor.value
    const pages = bookPages.value
    const readChoice = checkedRadio.value

    addBookToLibrary(title, author, pages, readChoice)
    dialog.close()
    bookForm.reset()
    displayBooks()
})

displayBooks()