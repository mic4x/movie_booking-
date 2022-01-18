const container = document.querySelector('.container'); //Declares the constant container and selects the element named '.container' which can then be stylized. 
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // This is a queryselector but for multiple items.
const count = document.getElementById('count'); // This declares the constant count and the element can be called on and stylized and 
const total = document.getElementById('total'); // This declares the constant total and the element can be called on and stylized 
const movieSelect = document.getElementById('movie'); // This declares the constant movieselect and the element can be called on and stylized 

populateUI(); //Calls the function PopulateUI

let ticketPrice = +movieSelect.value; //declares the variable ticketprice (muttable) to be equal to value of the movie selected 

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) { 
  localStorage.setItem('selectedMovieIndex', movieIndex); // 
  localStorage.setItem('selectedMoviePrice', moviePrice); //
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); 
  
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  
    const selectedSeatsCount = selectedSeats.length;
  
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
  }

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  }

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
  });

// Seat click event
container.addEventListener('click', e => {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('occupied')
    ) {
      e.target.classList.toggle('selected');
  
      updateSelectedCount();
    }
  });
  
// Initial count and total set
  updateSelectedCount();
