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

function showtest() {
  const examDiv = document.getElementById("examnotice");
  examDiv.innerHTML = "";

  firebase
    .database()
    .ref("testList")
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const notice = snapshot.val();
        Object.values(notice).forEach((e) => {
          let testdiv = document.createElement("div");
          testdiv.classList.add("test", "p-3", "border", "rounded", "mb-3");

          let topRow = document.createElement("div");
          topRow.classList.add("mb-2");

          let testid = document.createElement("h6");
          testid.textContent = "Test ID: " + e.id;

          let title = document.createElement("h4");
          title.textContent = e.title;

          topRow.append(testid, title);

          let bottomRow = document.createElement("div");
          bottomRow.classList.add(
            "d-flex",
            "justify-content-between",
            "align-items-center"
          );

          let wish = document.createElement("p");
          wish.textContent = e.para;

          let startButton = document.createElement("button");
          startButton.textContent = "Start Test";
          startButton.classList.add("btn", "btn-primary");
          startButton.onclick = () => {
            if (e.examUrl) {
              window.location.href = e.examUrl + "?testId=" + e.id;
            } else {
              alert("No link available for this test yet");
            }
          };

          bottomRow.append(wish, startButton);
          testdiv.append(topRow, bottomRow);
          examDiv.appendChild(testdiv);
        });
      } else {
        examDiv.innerHTML = "<p>No tests available.</p>";
      }
    });
}

showtest();
