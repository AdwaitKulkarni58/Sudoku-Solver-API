const container = document.querySelector("#container");
const btn = document.querySelector("#button");
const values = [];
const totalSize = 81;

for (let i = 0; i < totalSize; i++) {
  const input = document.createElement("input");
  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    input.classList.add("box");
  }
  input.setAttribute("type", "number");
  input.setAttribute("min", 1);
  input.setAttribute("max", 9);
  container.appendChild(input);
}

const puzzle = () => {
  const allInputs = document.querySelectorAll("input");
  allInputs.forEach((input) => {
    if (input.value) {
      values.push(input.value);
    } else {
      values.push(".");
    }
  });
  const dataInStr = values.join("");
  console.log(values);
  console.log(dataInStr);

  var options = {
    method: "GET",
    url: "https://sudoku-generator1.p.rapidapi.com/sudoku/solve",
    params: {
      puzzle: dataInStr,
    },
    headers: {
      "x-rapidapi-host": "sudoku-generator1.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const data = response.data["example-solution"];
      allInputs.forEach(function (input, i) {
        input.value = data[i];
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

btn.addEventListener("click", puzzle);
