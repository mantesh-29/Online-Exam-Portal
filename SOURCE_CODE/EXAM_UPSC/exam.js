// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCDvi3WTREHXbIV2qVXw3sl94zXB1vCMQ4",
  authDomain: "mcq-exam-7a3e0.firebaseapp.com",
  databaseURL: "https://mcq-exam-7a3e0-default-rtdb.firebaseio.com",
  projectId: "mcq-exam-7a3e0",
  storageBucket: "mcq-exam-7a3e0.appspot.com",
  messagingSenderId: "561325025545",
  appId: "1:561325025545:web:c29a918f5bbb64dec48bd8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Get testId from URL
const urlParams = new URLSearchParams(window.location.search);
const testId = urlParams.get("testId");

// DOM reference
const examForm = document.getElementById("examForm");

// Load questions from Firebase
firebase
  .database()
  .ref("questions/" + testId)
  .once("value")
  .then((snapshot) => {
    if (snapshot.exists()) {
      const questions = snapshot.val();
      document.getElementById("examTitle").textContent = "Test ID: " + testId;

      Object.entries(questions).forEach(([key, q], index) => {
        renderQuestion(q, index);
      });
    } else {
      examForm.innerHTML = "<p>No questions available for this test.</p>";
    }
  });

// Render each question
function renderQuestion(q, index) {
  let qDiv = document.createElement("div");
  qDiv.classList.add("mb-3");
  qDiv.dataset.answer = q.answer;

  let qTitle = document.createElement("h5");
  qTitle.textContent = `${index + 1}. ${q.question}`;
  qDiv.appendChild(qTitle);

  Object.values(q.options).forEach((opt) => {
    let label = document.createElement("label");
    label.classList.add("d-block");

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "q" + index;
    radio.value = opt;

    label.appendChild(radio);
    label.append(" " + opt);
    qDiv.appendChild(label);
  });

  examForm.appendChild(qDiv);
}

// Submit exam and calculate score
function submitExam() {
  let score = 0;
  const questions = document.querySelectorAll("#examForm > div");

  questions.forEach((qDiv, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const correct = qDiv.dataset.answer;
    if (selected && selected.value === correct) {
      score++;
    }
  });

  document.getElementById(
    "result"
  ).textContent = `Your Score: ${score} / ${questions.length}`;
}
