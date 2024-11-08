import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

console.log("JavaScript file loaded successfully");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn8Al2osV0vTJrBTYnfbddWE_pNJZ4oqw",
  authDomain: "esp8266-qn.firebaseapp.com",
  databaseURL: "https://esp8266-qn-default-rtdb.firebaseio.com",
  projectId: "esp8266-qn",
  storageBucket: "esp8266-qn.appspot.com",
  messagingSenderId: "452827113347",
  appId: "1:452827113347:web:42cd7a1fa7db6463ebb8b6",
  measurementId: "G-B6174LNYYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Get elements
const Quat1onCheckbox = document.getElementById("Quat1-on");
// const Quat2onCheckbox = document.getElementById("Quat2-on");
const BomCheckbox = document.getElementById("Bom-on");
const RemCheckbox = document.getElementById("Rem-on");
// const CuaSlider = document.getElementById("Cua-slider");
// const CuaValue = document.getElementById("Cua-value");
const CuaCheckbox = document.getElementById("Cua-on");
const QuatHutCheckbox = document.getElementById("QuatHut-on");
const ModeCheckbox = document.getElementById("Auto-on");

// Function to write data to Firebase
function writeData(path, value) {
  set(ref(database, path), value);
}

// Add event listeners for checkboxes
Quat1onCheckbox.addEventListener("change", function () {
  writeData("Button/Quat1", Quat1onCheckbox.checked ? 1 : 0);
});

// Quat2onCheckbox.addEventListener("change", function () {
//   writeData("Button/Quat2", Quat2onCheckbox.checked ? 1 : 0);
// });

BomCheckbox.addEventListener("change", function () {
  writeData("Button/Bom", BomCheckbox.checked ? 1 : 0);
});

RemCheckbox.addEventListener("change", function () {
  writeData("Button/Rem", RemCheckbox.checked ? 1 : 0);
});

CuaCheckbox.addEventListener("change", function () {
  writeData("Button/Cua", CuaCheckbox.checked ? 1 : 0);
});

QuatHutCheckbox.addEventListener("change", function () {
  writeData("Button/QuatHut", QuatHutCheckbox.checked ? 1 : 0);
});

ModeCheckbox.addEventListener("change", function () {
  writeData("Button/Mode", ModeCheckbox.checked ? 1 : 0);
});

onValue(ref(database, "Button/Quat1"), (snapshot) => {
  Quat1onCheckbox.checked = snapshot.val() === 1;
});

onValue(ref(database, "Button/Bom"), (snapshot) => {
  BomCheckbox.checked = snapshot.val() === 1;
});

onValue(ref(database, "Button/Rem"), (snapshot) => {
  RemCheckbox.checked = snapshot.val() === 1;
});

// Lấy phần tử span chứa giá trị co2
const co2Element = document.getElementById("co2");
const co2Unit = document.getElementById("unit");

// Hàm cập nhật giá trị và kích thước font của số co2
function updateCO2Value(value) {
  co2Element.textContent = value;
  // Nếu giá trị vượt quá 9999, giảm kích thước font xuống
  if (value > 999) {
    co2Element.style.fontSize = "40px";
    co2Unit.style.fontSize = "40px";
  } else {
    co2Element.style.fontSize = "60px";
    co2Unit.style.fontSize = "60px";
  }
}

// Listen for sensor data changes and update the display
onValue(ref(database, "Sensor/Co2"), (snapshot) => {
  document.getElementById("co2").textContent = snapshot.val();
  updateCO2Value(snapshot.val());
});

onValue(ref(database, "Sensor/DoAm"), (snapshot) => {
  document.getElementById("doam").textContent = snapshot.val();
});

onValue(ref(database, "Sensor/TiaUV"), (snapshot) => {
  document.getElementById("tiauv").textContent = snapshot.val();
});

onValue(ref(database, "Sensor/Gio"), (snapshot) => {
  document.getElementById("gio").textContent = snapshot.val();
});

// //xoay quạt
// document.getElementById("fan-box").onclick = function () {
//   alert("Div was clicked!");
//   // Bạn có thể gọi bất kỳ hàm nào khác tại đây
// };
