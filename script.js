// Initialize the map with smaller zoom increments
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 0,
    maxZoom: 2,
    zoomControl: true,
    zoomDelta: 0.25,
    zoomSnap: 0.25,
    wheelPxPerZoomLevel: 120
});

// Calculate image dimensions and bounds
const img = new Image();
img.src = 'ttuCampusMap.png';

// Sample dining hall data with more complete information
const diningHalls = {
    'The Commons': {
        coords: [310, 1097], // You'll need to adjust these coordinates
        description: "Modern dining hall with a variety of food options, including pizza, chicken, mac and cheese, and international cuisine.",
        hours: "Mon - Thu | 11 am - 10 pm\nFri & Sat | 11 am - 8 pm\nSun | 11 am - 10 pm",
        reviews: [
            {
                rating: 5,
                text: "The Indian food at the commons is fye and affordable 🤑🔥"
            },
            {
                rating: 5,
                text: "the tacos are super good and i love the nanarrito"
            },
            {
                rating: 5,
                text: "CHICKEN AND WAFFLES!!."
            }
        ]
    },

    'The sub': {
        coords: [350, 1100],
        description: "Probably the most popular dining hall on campus, they have many of the food options offered at other dining halls, and fan favorites like chick fila a and starbucks.",
        hours:"Mon - Fri | 10 am - 4 pm\nSat & Sun | CLOSED",
        reviews: [
            {
                rating: 4,
                text: "this place is good only because chick fil a"
            },
            {
                rating: 5,
                text: "The bbq place has really good chop beef sandwiches and their mac and chees is tasty."
            }
        ]
    },

    '23 at Sneed': {
        coords: [420, 1145], // You'll need to adjust these coordinates
        description: "Newest dining hall on campus, it has a variety of options such as tex mex, chicken, pizza, and a rotating weekly dish, also has a small snack bar with chips, ice cream, suhsi, and more.",
        hours: "Mon - Fri | 7 am - 10 pm\nSat & Sun | 9 am - 9 pm",
        reviews: [
            {
                rating: 3,
                text: "The food is good enough but for what your paying it could be better"
            },
            {
                rating: 4,
                text: "super convenient since i live at sneed but the food gets old fast"
            },
            {
                rating: 4,
                text: "Sneed is close to my dorm and has good food"
            }
        ]
    },

    'The Market': {
        coords: [386, 1012],
        description: "Largest dining hall featuring the most in restaraunt options, they have home cooking, itallian, classic burgers, and more.",
        hours: "Mon - Thu | 7 am - 11 pm\nFri | 7 am - 8 pm\nSat | 11 am - 8 pm\nSun | 11 am - 9 pm",
        reviews: [
            {
                rating: 5,
                text: "cheaper than everything else and good quality most bang for your buck"
            },
            {
                rating: 5,
                text: "they always have different things open and they also have red and black which is probably the cheapest place to get a meal on campus."
            },
            {
                rating: 5,
                text: "This place is peak because it has the best dicount out of any dining halls"
            },
            {
                rating: 4,
                text: "This is my favorite dining hall because it has a decent variety of options of food and has the best discounts for meal plans."
            },
            {
                rating: 5,
                text: " I love Fazzolis and the seasonal items they have"
            },
            {
                rating: 5,
                text: "5/5 because it has fazolis"
            },
            {
                rating: 3,
                text: "is too far but has a pretty wide selection and is usually open"
            }
        ]
    },
    
    'Fresh Plate': {
        coords: [308, 1062], // You'll need to adjust these coordinates
        description: "One of the best budget options on campus, it's an all you can eat buffet with many options open for breakfast lunch and dinner.",
        hours: "Breakfast | All-you-care to eat\nMon - Fri | 7 am - 10 am\nLunch | All-you-care to eat\nMon - Fri | 11 am - 1:30 pm\nDinner | All-you-care to eat\non - Thu | 5 pm - 7 pm\nFri | 5 pm - 6:30 pm\nBrunch | All-you-care to eat\nSat & Sun | 10:30 am - 2:30 pm\nRetail\nMon - Fri | 10 am - 10 pm\nSat & Sun | 3 pm - 10 pm",
        reviews: [
            {
                rating: 5,
                text: "the food is good and the price is great"
            },
            {
                rating: 4,
                text: "It's Cheap and has a variety of food."
            },
            {
                rating: 2,
                text: "It's good if youre trying to eat cheap but its just not very good quality."
            }
        ]
    },

    'Wiggins': {
        coords: [318, 965], // You'll need to adjust these coordinates
        description: "A smaller dining hall witha large grocery / snack area, and many options for food inlcuding chikc fil a, also the latest open dining hall on campus.",
        hours: "Mon - Fri | 7 am - Midnight\nSat & Sun | 10 am - Midnight",
        reviews: [
            {
                rating: 5,
                text: "really good burgers"
            },
            {
                rating: 5,
                text: "i love their corndogs"
            }
        ]
    },

    'Murray': {
        coords: [438, 1038], // You'll need to adjust these coordinates
        description: "A smaller dining hall but not bad by any means, they have a wok station, a tex mex place, and a unique smoothie bar.",
        hours: "Mon - Thu | 7:30 am - 10 pm\nFri & Sat | CLOSED\nSun | 10 am - 10 pm",
        reviews: [
            {
                rating: 3,
                text: "I ate here expecting there to be really good asian food but it kind of tasted like a microwaved meal"
            },
            {
                rating: 4,
                text: "The smoothie bar is good"
            }
        ]
    },

    // Add more dining halls as needed
};

img.onload = function() {
    console.log('Image loaded successfully');
    const width = this.width;
    const height = this.height;
    const imageUrl = 'ttuCampusMap.png';
    const bounds = [[0, 0], [height, width]];
    
    // Add the image overlay
    const imageOverlay = L.imageOverlay(imageUrl, bounds).addTo(map);
    
    // Set the view to fit the image bounds
    map.fitBounds(bounds);
    map.setZoom(0);

    // Add circle markers for each dining hall
    for (const [name, hall] of Object.entries(diningHalls)) {
        const circleMarker = L.circleMarker(hall.coords, {
            radius: 5,
            fillColor: '#FF0000',
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        })
            .bindPopup(name)
            .addTo(map)
            .on('click', () => showDiningHallDetails(name));
    }
};

function showDiningHallDetails(hallName) {
    const hall = diningHalls[hallName];
    
    // Hide placeholder and show content
    document.getElementById('placeholder').style.display = 'none';
    document.getElementById('panelContent').style.display = 'block';
    
    // Update content
    document.getElementById('hallName').textContent = hallName;
    document.getElementById('hallDescription').textContent = hall.description;
    
    // Remove any existing hours sections before adding new one
    const existingHours = document.querySelector('.hours-section');
    if (existingHours) {
        existingHours.remove();
    }
    
    // Add hours section
    const hoursHTML = `
        <div class="hours-section">
            <h3>Hours</h3>
            <p class="hours-text">${hall.hours.replace(/\n/g, '<br>')}</p>
        </div>
    `;
    
    // Insert hours after description
    document.getElementById('hallDescription').insertAdjacentHTML('afterend', hoursHTML);
    
    // Calculate and display average rating
    const avgRating = calculateAverageRating(hall.reviews);
    document.getElementById('overallRating').textContent = 
        `Overall Rating: ${avgRating.toFixed(1)} / 5 stars`;
    
    // Display reviews
    displayReviews(hall.reviews);
}

function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
}

function displayReviews(reviews) {
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '';
    
    if (!reviews || reviews.length === 0) {
        reviewsList.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
        return;
    }
    
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerHTML = `
            <div class="rating">★ ${review.rating}/5</div>
            <p>${review.text}</p>
        `;
        reviewsList.appendChild(reviewElement);
    });
}

// Handle review form submission
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const hallName = document.getElementById('hallName').textContent;
    const rating = parseInt(document.getElementById('starRating').value);
    const text = document.getElementById('reviewText').value;
    
    // Add the new review
    if (!diningHalls[hallName].reviews) {
        diningHalls[hallName].reviews = [];
    }
    diningHalls[hallName].reviews.push({ rating, text });
    
    // Update the display
    showDiningHallDetails(hallName);
    
    // Clear the form
    this.reset();
});

// Close modal when clicking the X
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('diningModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('diningModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}); 