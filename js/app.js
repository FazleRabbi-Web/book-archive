// --------------------------declaring a function for toggle method-------------------------- //
const toggle = (id, displayStyle, addClass, removeClass) => {
    document.getElementById(id + '-toggle').style.display = displayStyle;
    document.getElementById(id + '-toggle').classList.add(addClass);
    document.getElementById(id + '-toggle').classList.remove(removeClass);
};
// --------------------------initializing search value from search field-------------------------- //
const searchBook = () => {
    const searchText = document.getElementById('search-field').value;
    toggle('spinner', 'block', 'd-flex');
    toggle('div-container', 'none');
    toggle('no-result', 'none', 'd-flex', 'd-flex');
    toggle('search-item', 'none');
    document.getElementById('spinner-text').innerText = searchText;
    loadBooks(searchText);
    document.getElementById('search-field').value = '';
};
// --------------------------Load data from API (Book Library)-------------------------- //
const loadBooks = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}/`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
};
// --------------------------Function for display data in UI-------------------------- //
const displayBooks = books => {
    // --------------------------Total search item-------------------------- //
    const searchItem = document.getElementById('search-item-toggle');
    searchItem.textContent = '';
    const h3 = document.createElement('h3')
    h3.classList.add('fw-bold');
    h3.innerText = `Search Result: ${books.length} book found`;
    searchItem.appendChild(h3);
    const divContainer = document.getElementById('div-container-toggle');
    divContainer.textContent = '';// --------------------------Clean the UI for new search data-------------------------- //
    if (books.length === 0) { // -------------------------- search data checking -------------------------- //
        toggle('no-result', 'block', 'd-flex');
    }
    else{
        toggle('search-item', 'block');
    }
    books?.forEach(book => { // -------------------------- using ternary operator -------------------------- //
        const div = document.createElement('div') // -------------------------- create div to send data to UI as append child -------------------------- //
        div.classList.add('col')
        div.innerHTML = `
            <div class="card">
                <div class="card-body text-white rounded bg-secondary">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" width="365px" height="475px" class="card-img-top p-2" alt="...">
                    <div class="p-2">
                        <h4 class="card-title">Book Name: <span class="fw-bold">${book.title}</h4>
                        <h6 class="card-title">Author Name: <span class="fw-bold">${book.author_name ? book.author_name[0] : ''}</span></h6>
                        <p class="card-text">First Publish: ${book.first_publish_year}</p>
                        <p class="card-text">Latest Publish: ${book.publish_date ? book.publish_date[0] : ''}</p>
                        <p class="card-text">Publisher: ${book.publisher ? book.publisher[0] : ''}</p>
                    </div>
                </div>
            </div>
           `
        divContainer.appendChild(div);
    });
    // -------------------------- Calling toggle function -------------------------- //
    toggle('spinner', 'none', 'd-flex', 'd-flex');
    toggle('no-result', 'none');
    toggle('div-container', 'flex');
};
