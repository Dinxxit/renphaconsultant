const reviewForm = document.getElementById('review-form');
const reviewContainer = document.getElementById('review-container');
const avatarInput = document.getElementById('avatar');

const API_URL = 'http://localhost:3000/api';

// Function to fetch reviews from the server
async function fetchReviews() {
  const response = await fetch(`${API_URL}/reviews`);
  return await response.json();
}

// Function to display reviews
function displayReviews(reviews) {
  reviewContainer.innerHTML = '';
  reviews.forEach(review => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');

    reviewElement.innerHTML = `
      <img src="${review.avatar}" alt="${review.name}'s Avatar" class="review-avatar">
      <div class="review-content">
        <div class="review-header">
          <h3>${review.name}</h3>
          <div class="review-rating">
            ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
          </div>
        </div>
        <p class="review-text">${review.comment}</p>
        <div class="review-footer">
          <div>Services: ${review.services}</div>
          <div>
            <span>${new Date(review.timestamp).toLocaleString()}</span>
            <button class="delete-comment" data-id="${review.id}">Delete</button>
          </div>
        </div>
      </div>
    `;

    reviewContainer.appendChild(reviewElement);
  });

  // Add event listeners for delete buttons
  const deleteButtons = document.querySelectorAll('.delete-comment');
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteComment);
  });
}

// Function to delete a comment
async function deleteComment(event) {
  const id = event.target.dataset.id;
  try {
    const response = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      const reviews = await fetchReviews();
      displayReviews(reviews);
    } else {
      console.error('Failed to delete review');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Initial display of reviews
(async () => {
  const reviews = await fetchReviews();
  displayReviews(reviews);
})();

// Handle form submission
reviewForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const avatarFile = avatarInput.files[0];
  
  if (avatarFile) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      const newReview = {
        name: formData.get('name'),
        avatar: e.target.result,
        rating: parseInt(formData.get('rating')),
        services: formData.get('services'),
        comment: formData.get('comment')
      };

      try {
        const response = await fetch(`${API_URL}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview)
        });

        if (response.ok) {
          const reviews = await fetchReviews();
          displayReviews(reviews);
          event.target.reset();
        } else {
          console.error('Failed to submit review');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    reader.readAsDataURL(avatarFile);
  }
});

// Loader functions (unchanged)
function showLoader() {
  loaderContainer.style.opacity = '1';
  loaderContainer.style.pointerEvents = 'auto';
}

function hideLoader() {
  loaderContainer.style.opacity = '0';
  loaderContainer.style.pointerEvents = 'none';
}

function simulateLoading() {
  showLoader();
  const duration = Math.random() * 900 + 2000;
  setTimeout(hideLoader, duration);
}

window.addEventListener('load', simulateLoading);
window.addEventListener('beforeunload', showLoader);

function simulatePageNavigation(event) {
  event.preventDefault();
  simulateLoading();
  setTimeout(() => {
    alert("Page navigation simulated!");
  }, 4000);
}


// Handle form submission
reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const avatarFile = avatarInput.files[0];
    
    if (avatarFile) {
      const reader = new FileReader();
      reader.onload = async function(e) {
        // Compress the image if it's too large
        const img = new Image();
        img.onload = async function() {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 800;
          const maxHeight = 600;
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
  
          const newReview = {
            name: formData.get('name'),
            avatar: compressedDataUrl,
            rating: parseInt(formData.get('rating')),
            services: formData.get('services'),
            comment: formData.get('comment')
          };
  
          try {
            const response = await fetch(`${API_URL}/reviews`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newReview)
            });
  
            if (response.ok) {
              const reviews = await fetchReviews();
              displayReviews(reviews);
              event.target.reset();
            } else {
              console.error('Failed to submit review');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
        img.src = e.target.result;
      }
      reader.readAsDataURL(avatarFile);
    }
  });





  