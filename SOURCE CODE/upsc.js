let notice = [
  {
    id: 100001,
    title: "Calendar Based MCQ [50] - Logical Reasoning",
    examUrl: "./EXAM_UPSC/Examindex.html", // ✅ make sure file exists
    para: "All the best buddy",
  },
  {
    id: 100002,
    title: "General Aptitude MCQ [30]",
    examUrl: "./EXAM_UPSC/exam.html",
    para: "All the best buddy",
  },
];

function showtest() {
  const examDiv = document.getElementById("examnotice");
  examDiv.innerHTML = "";

  notice.forEach((e) => {
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
}

showtest();
