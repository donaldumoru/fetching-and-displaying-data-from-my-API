// Assuming your Express API is running on localhost:3000
const apiUrl = 'https://api-with-dms.nw.r.appspot.com/books';

// Function to fetch a single book from the API and display it in HTML
const fetchAndDisplayBook = async (book) => {
    try {
        // Get the container element
        const booksContainer = document.getElementById('books-container');

        // Create the main book container
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('book-container');

        // Create the image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('book-image');
        const image = document.createElement('img');

        // Determine the image filename based on the book's title (modify as needed)
        let imageName;
        if (book.title.toLowerCase().includes('eloquent')) {
            imageName = 'eloquent.jpg';
        } else if (book.title.toLowerCase().includes('alchemist')) {
            imageName = 'alchemist.jpg';
        } else if (book.title.toLowerCase().includes('all in your')) {
            imageName = 'russ.jpg'
        } else if (book.title.toLowerCase().includes('the monk')) {
            imageName = 'monk.jpg'
        } else if (book.title.toLowerCase().includes('who moved')) {
            imageName = 'cheese.jpg'
        } else {
            imageName = 'hustle.jpg'
        }

        image.src = `images/${imageName}`; // Adjust the path based on your file structure
        image.alt = book.title;
        imageContainer.appendChild(image);

        // Create the details container
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('book-details');
        const title = document.createElement('p');
        title.innerHTML = `<strong>Title:</strong> ${book.title}`;
        const author = document.createElement('p');
        author.innerHTML = `<strong>Author:</strong> ${book.author}`;
        detailsContainer.appendChild(title);
        detailsContainer.appendChild(author);

        // Append both containers to the main container
        bookContainer.appendChild(imageContainer);
        bookContainer.appendChild(detailsContainer);

        // Append the book container to the container
        booksContainer.appendChild(bookContainer);

    } catch (error) {
        console.error('Error fetching and displaying book:', error.message);
    }
};

// Function to fetch all books from the API and display them in HTML
const fetchBooks = async () => {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Loop through the books and fetch/display them one by one
        for (const book of data) {
            await fetchAndDisplayBook(book);
        }

    } catch (error) {
        console.error('Error fetching books:', error.message);
    }
};

fetchBooks();
