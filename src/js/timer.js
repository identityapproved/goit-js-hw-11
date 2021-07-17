import '/css/common.css';
import Swal from 'sweetalert2'

const refs = {
   dateInput: document.getElementById('date-selector'),
   startBtn: document.querySelector('button[data-start]'),
   daysOutput: document.querySelector('[data-days]'),
   hoursOutput: document.querySelector('[data-hours]'),
   minsOutput: document.querySelector('[data-minutes]'),
   secsOutput: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', true);

refs.dateInput.addEventListener('change', (e) => {
   refs.startBtn.removeAttribute('disabled');

   const enteredData = e.target.value;
   const currentDate = Date.now();
   const futureDate = new Date(enteredData);
   const futureTime = futureDate.getTime();

   if (futureTime <= currentDate) {
      refs.startBtn.setAttribute('disabled', true);
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Please choose a date in the future',
         backdrop: `rgba(0,0,123,0.4)
         url("/images/nyan-cat.gif")
         left top
         no-repeat`
      });
   }
})


class Timer {
   constructor({ onTick }) {
      this.isActive = false;
      this.intervalId = null;
      this.onTick = onTick;
   }

   start() {
      if (this.isActive) {
         return
      }
      
      this.isActive = true;
      Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Timer started',
      showConfirmButton: false,
      timer: 1500
      })

      const startTime = Date.now();
      const futureDate = Date.parse(refs.dateInput.value)
      const timeRest = futureDate - startTime;

      this.intervalId = setInterval(() => {
         const currentTime = Date.now();
         const diffTime = currentTime - startTime;
         const ms = timeRest - diffTime;
         const time = this.convertMs(ms);
         this.onTick(time)
         if (ms === 0) {
            clearInterval(this.intervalId)
         }
      }, 1000)
   }

   pad(value) {
      return String(value).padStart(2, '0');
   }

  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.pad(Math.floor(ms / day));
  // Remaining hours
  const hours = this.pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
   }
   
}

const timer = new Timer({
   onTick: updateClocks
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateClocks({ days, hours, minutes, seconds }) {
   refs.daysOutput.textContent = `${days}`;
   refs.hoursOutput.textContent = `${hours}`;
   refs.minsOutput.textContent = `${minutes}`;
   refs.secsOutput.textContent = `${seconds}`;
}

