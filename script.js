// Fetch data from JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Get the content container
    const contentContainer = document.getElementById('content-container');

    // Get the current page name from the URL parameter 'product'
    const urlParams = new URLSearchParams(window.location.search);
    const currentPageName = urlParams.get('product');

    // Find the corresponding page in the data
    const currentPage = data.pages.find(page => page.name === currentPageName);

    // Update the HTML content based on the JSON data
    if (currentPage) {
      // Update text content
      contentContainer.querySelector('.page-head').textContent = currentPage.head;
      contentContainer.querySelector('.page-sub-head').textContent = currentPage.subHead;
      contentContainer.querySelector('.page-content').textContent = currentPage.content;

      // Update image sources
      const mediaElements = contentContainer.querySelectorAll('.page-media');
      mediaElements.forEach((media, index) => {
        media.src = currentPage.media[index];
        media.alt = `Image ${index + 1}`;
      });

      // Update SEO meta tags
      document.title = currentPage.meta.title;
      document.querySelector('meta[name="description"]').content = currentPage.meta.description;
      document.querySelector('meta[name="keywords"]').content = currentPage.meta.keywords;

      // Update canonical tag
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      canonicalLink.href = `https://www.asmco.company/?product=${currentPage.name}`;
    } else {
      // Display a message if the page is not found
      contentContainer.innerHTML = '<p>Product not found</p>';
    }
  })
  .catch(error => console.error('Error fetching data:', error));
