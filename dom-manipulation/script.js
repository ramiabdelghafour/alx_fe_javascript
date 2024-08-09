const quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
  { text: "The only way to do great work is to love what you do.", category: "Work" }
];

// Function to show a random quote
function showRandomQuote() {
  const filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = `${quote.text} - ${quote.category}`;
  } else {
    document.getElementById('quoteDisplay').innerText = "No quotes available for the selected category.";
  }
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('New quote added successfully!');
    saveQuotes();
    populateCategories();
  } else {
    alert('Please fill in both fields.');
  }
}

// Function to populate the category dropdown with unique categories
function populateCategories() {
  const categories = Array.from(new Set(quotes.map(quote => quote.category)));
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore the last selected category from local storage
  const lastSelectedCategory = localStorage.getItem('selectedCategory');
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
    filterQuotes();
  }
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory);
  showRandomQuote();
}

// Helper function to get quotes filtered by the selected category
function getFilteredQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  if (selectedCategory === 'all') {
    return quotes;
  }
  return quotes.filter(quote => quote.category === selectedCategory);
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes.push(...JSON.parse(storedQuotes));
  }
}

// Initialize the application
function initializeApp() {
  loadQuotes();
  populateCategories();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  showRandomQuote(); // Show a quote on page load
}

// Run the initialization function when the page loads
window.onload = initializeApp;