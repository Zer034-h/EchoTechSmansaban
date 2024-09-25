import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvRVu9RyCvxQvTu1iiy7mMDja26cACuTU",
  authDomain: "iot-monitoring-fe406.firebaseapp.com",
  databaseURL: "https://iot-monitoring-fe406-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "iot-monitoring-fe406",
  storageBucket: "iot-monitoring-fe406.appspot.com",
  messagingSenderId: "534573831564",
  appId: "1:534578381564:web:6ed12537db0c135bf84d79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fungsi untuk memperbarui data di halaman
function updateSensorData(snapshot) {
  const data = snapshot.val();
  
  // Memperbarui nilai sensor di halaman
  document.getElementById('ph-value').innerText = data.ph || 'N/A';
  document.getElementById('suhu-value').innerText = data.suhu || 'N/A';
  document.getElementById('kekeruhan-value').innerText = data.kekeruhan || 'N/A';
  document.getElementById('tds-value').innerText = data.tds || 'N/A';
  document.getElementById('timestamp-value').innerText = date.waktu || 'N/A';
}

// Mendengarkan perubahan data di Firebase Realtime Database
const sensorRef = ref(database, 'sensor'); // Sesuaikan dengan jalur di Firebase
onValue(sensorRef, (snapshot) => {
  updateSensorData(snapshot);
}, (error) => {
  console.error("Error fetching data: ", error);
});
