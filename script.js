// Fetch data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Get the content container
    const contentContainer = document.getElementById('content-container');

    // Get the current page name from the URL (e.g., http://yourdomain.com/?page=page1)
    const urlParams = new URLSearchParams(window.location.search);
    const currentPageName = urlParams.get('product');

    // Find the corresponding page in the data
    const currentPage = data.pages.find(page => page.name === currentPageName);

    // Display content if the page is found
    if (currentPage) {
      const pageElement = document.createElement('div');
      pageElement.innerHTML = `<h2>${currentPage.name}</h2><p>${currentPage.content}</p>`;
      contentContainer.appendChild(pageElement);
    } else {
      // Display a message if the page is not found
      contentContainer.innerHTML = '<p>Page not found</p>';
    }
  })
  .catch(error => console.error('Error fetching data:', error));
