let mcqData = JSON.parse(localStorage.getItem("mcqData")) || {};

const form = document.getElementById("questionForm");
const questionList = document.getElementById("questionList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let testId = document.getElementById("testId").value.trim();
  let question = document.getElementById("question").value.trim();
  let options = [
    document.getElementById("opt1").value.trim(),
    document.getElementById("opt2").value.trim(),
    document.getElementById("opt3").value.trim(),
    document.getElementById("opt4").value.trim(),
  ];
  let answer = document.getElementById("answer").value.trim();

  if (!mcqData[testId]) {
    mcqData[testId] = [];
  }

  mcqData[testId].push({ question, options, answer });

  localStorage.setItem("mcqData", JSON.stringify(mcqData));

  form.reset();
  renderQuestions();
});

function renderQuestions() {
  questionList.innerHTML = "";
  for (let testId in mcqData) {
    let testBlock = document.createElement("div");
    testBlock.classList.add("mb-3", "p-2", "border", "rounded");
    testBlock.innerHTML = `<h5>Test ID: ${testId}</h5>`;

    mcqData[testId].forEach((q, i) => {
      let qDiv = document.createElement("div");
      qDiv.classList.add("mb-2");
      qDiv.innerHTML = `<strong>Q${i + 1}:</strong> ${q.question} <br>
        Options: ${q.options.join(", ")} <br>
        <strong>Answer:</strong> ${q.answer}`;
      testBlock.appendChild(qDiv);
    });

    questionList.appendChild(testBlock);
  }
}

renderQuestions();
