let mcqData = JSON.parse(localStorage.getItem("mcqData")) || {};

const urlParams = new URLSearchParams(window.location.search);
const testId = urlParams.get("testId");

const examForm = document.getElementById("examForm");

if (mcqData[testId] && mcqData[testId].length > 0) {
  document.getElementById("examTitle").textContent = "Test ID: " + testId;

  mcqData[testId].forEach((q, index) => {
    let qDiv = document.createElement("div");
    qDiv.classList.add("mb-3");

    let qTitle = document.createElement("h5");
    qTitle.textContent = index + 1 + ". " + q.question;
    qDiv.appendChild(qTitle);

    q.options.forEach((opt) => {
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
  });
} else {
  examForm.innerHTML = "<p>No questions available for this test.</p>";
}

function submitExam() {
  if (!mcqData[testId]) return;

  let score = 0;
  mcqData[testId].forEach((q, index) => {
    let selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById(
    "result"
  ).textContent = `Your Score: ${score} / ${mcqData[testId].length}`;
}
