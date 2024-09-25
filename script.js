// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase Realtime Database
const database = firebase.database();

// Function to update data on the webpage
function updateSensorData(snapshot) {
  const data = snapshot.val();
  
  document.getElementById('ph-value').innerText = data.ph || 'N/A';
  document.getElementById('suhu-value').innerText = data.suhu || 'N/A';
  document.getElementById('kekeruhan-value').innerText = data.kekeruhan || 'N/A';
  document.getElementById('tds-value').innerText = data.tds || 'N/A';
  
  const date = new Date(data.timestamp * 1000); // Convert timestamp to readable date
  document.getElementById('timestamp-value').innerText = date.toLocaleString();
}

// Listen for changes in the Firebase Realtime Database
database.ref('/sensor_data').limitToLast(1).on('child_added', updateSensorData);
