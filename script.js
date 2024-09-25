// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvRVu9RyCvxQvTu1iiy7mMDja26cACuTU",
  authDomain: "iot-monitoring-fe406.firebaseapp.com",
  databaseURL: "https://iot-monitoring-fe406-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "iot-monitoring-fe406",
  storageBucket: "iot-monitoring-fe406.appspot.com",
  messagingSenderId: "534573831564",
  appId: "YOUR_APP_ID" // Anda bisa mendapatkan App ID dari Firebase Console (biasanya di bagian bawah di Project Settings)
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
