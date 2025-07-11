// Keep backend awake script
setInterval(() => {
  fetch('https://bookvault-1.onrender.com/')
    .then(response => console.log('Backend ping:', new Date().toLocaleTimeString()))
    .catch(error => console.log('Backend ping failed:', error));
}, 840000); // Ping every 14 minutes (before 15-minute sleep)

console.log('Backend keep-alive started - pinging every 14 minutes');
