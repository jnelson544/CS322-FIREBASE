// Get references to the titles and searchResult div in index.html
const title1 = document.getElementById('title1');
const searchResult = document.getElementById('searchResult');

// Add click event listeners to each title
console.log(title1);
title1.addEventListener('click', () => {
    console.log('Title clicked');
  // Populate the searchResult div with static information
  searchResult.textContent = 'Static information for Podcasts';
  
  // Display the searchResult div
  searchResult.style.display = 'block';

  // Hide the searchResult div after a few moments
  setTimeout(() => {
    searchResult.style.display = 'none';
  }, 3000); // Adjust the time (in milliseconds) as needed
});