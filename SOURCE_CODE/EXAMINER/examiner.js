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

// DOM references
const form = document.getElementById("questionForm");
const questionList = document.getElementById("questionList");

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const testId = document.getElementById("testId").value.trim();
  const question = document.getElementById("question").value.trim();
  const options = {
    0: document.getElementById("opt1").value.trim(),
    1: document.getElementById("opt2").value.trim(),
    2: document.getElementById("opt3").value.trim(),
    3: document.getElementById("opt4").value.trim(),
  };
  const answer = document.getElementById("answer").value.trim();

  // Push question to Firebase
  firebase
    .database()
    .ref("questions/" + testId)
    .push({
      question,
      options,
      answer,
    });

  form.reset();
  loadQuestions(testId);
});

// Load questions from Firebase
function loadQuestions(testId) {
  firebase
    .database()
    .ref("questions/" + testId)
    .once("value")
    .then((snapshot) => {
      questionList.innerHTML = "";
      if (snapshot.exists()) {
        const questions = snapshot.val();
        const testBlock = document.createElement("div");
        testBlock.classList.add("mb-3", "p-2", "border", "rounded");
        testBlock.innerHTML = `<h5>Test ID: ${testId}</h5>`;

        Object.entries(questions).forEach(([key, q], i) => {
          const qDiv = document.createElement("div");
          qDiv.classList.add("mb-2");
          qDiv.innerHTML = `<strong>Q${i + 1}:</strong> ${q.question} <br>
          Options: ${Object.values(q.options).join(", ")} <br>
          <strong>Answer:</strong> ${q.answer}`;
          testBlock.appendChild(qDiv);
        });

        questionList.appendChild(testBlock);
      } else {
        questionList.innerHTML = "<p>No questions found for this Test ID.</p>";
      }
    });
}
