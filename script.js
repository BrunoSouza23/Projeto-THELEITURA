async function searchBooks() {
    const searchInput = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
        if (response.ok) {
            const data = await response.json();

            if (data.items) {
                data.items.forEach(book => {
                    const title = book.volumeInfo.title;
                    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconhecido';
                    const description = book.volumeInfo.description ? book.volumeInfo.description : 'Descrição não disponível';
                    const coverUrl = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'capa-indisponivel.jpg';

                    const bookResult = document.createElement('div');
                    bookResult.className = 'book-result';

                    const bookCover = document.createElement('img');
                    bookCover.className = 'book-cover';
                    bookCover.src = coverUrl;

                    const bookDetails = document.createElement('div');
                    bookDetails.className = 'book-details';
                    bookDetails.innerHTML = `<h2>${title}</h2><p>Autor: ${authors}</p><p>${description}</p>`;

                    bookResult.appendChild(bookCover);
                    bookResult.appendChild(bookDetails);

                    resultsContainer.appendChild(bookResult);
                });
            } else {
                resultsContainer.innerHTML = 'Nenhum resultado encontrado.';
            }
        } else {
            resultsContainer.innerHTML = 'Erro ao buscar livros.';
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}
