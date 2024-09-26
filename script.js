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
}

function tampilkanWaktuInternet() {
    // URL untuk zona waktu Jakarta (WIB), bisa diganti untuk zona WITA atau WIT
    const url = "http://worldtimeapi.org/api/timezone/Asia/Jakarta";

    // Mengambil data dari API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const dateTime = new Date(data.datetime); // Mendapatkan waktu dari response API
            const jam = dateTime.getHours();
            const menit = dateTime.getMinutes();
            const detik = dateTime.getSeconds();

            // Menambahkan 0 di depan angka jika kurang dari 10
            const waktuSekarang =
                (jam < 10 ? "0" + jam : jam) + ":" +
                (menit < 10 ? "0" + menit : menit) + ":" +
                (detik < 10 ? "0" + detik : detik);

            // Menampilkan waktu di elemen HTML
            document.getElementById("waktu").textContent = waktuSekarang;
        })
        .catch(error => {
            console.error("Gagal mengambil waktu dari API:", error);
        });
}

setInterval(tampilkanWaktuInternet, 1000);

// Menampilkan waktu internet saat halaman dimuat
tampilkanWaktuInternet();
// Mendengarkan perubahan data di Firebase Realtime Database
const sensorRef = ref(database, 'sensor'); // Sesuaikan dengan jalur di Firebase
onValue(sensorRef, (snapshot) => {
  updateSensorData(snapshot);
}, (error) => {
  console.error("Error fetching data: ", error);
});
