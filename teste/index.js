var nomeInput = document.getElementById('name');
var descricaoInput = document.getElementById('description');
var valueInput = document.getElementById('value');
var dateInput = document.getElementById('date');
var categoryInput = document.getElementById('category');
var tableResult = document.getElementById('book-table-body'); // Moved this here to make it accessible in both event listeners

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('/get_books');
        const books = await response.json();

        books.forEach(book => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${book.name}</td>
                <td>${book.description}</td>
                <td>${book.value}</td>
                <td>${book.date}</td>
                <td>${book.category}</td>
            `;
            tableResult.appendChild(newRow);
        });
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
    }
});

document.getElementById("table-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = {
        name: nomeInput.value,
        description: descricaoInput.value,
        value: parseFloat(valueInput.value),
        date: dateInput.value,
        category: categoryInput.value
    };

    try {
        const response = await fetch('/add_book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const newBook = await response.json();

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${newBook.name}</td>
                <td>${newBook.description}</td>
                <td>${newBook.value}</td>
                <td>${newBook.date}</td>
                <td>${newBook.category}</td>
            `;

            tableResult.appendChild(newRow);

            nomeInput.value = ''; // Corrected the variable names here
            descricaoInput.value = '';
            valueInput.value = '';
            dateInput.value = '';
            categoryInput.value = '';
        } else {
            console.error('Erro ao adicionar livro:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao adicionar livro:', error);
    }
});
