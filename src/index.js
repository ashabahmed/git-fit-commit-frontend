document.addEventListener("DOMContentLoaded", function() {
const baseUrl = "http://localhost:3000/exercises/"
  
const getExercises = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(exercises => {
        for(const exercise of exercises) {
            renderExercise(exercise)
        }
    })
}

const renderExercise = exercise => {
  const exDiv = document.createElement("div")
  exDiv.classList.add("card")

  exDiv.innerHTML = `
  <h1>${exercise.exercise}</h1>
  <br>
  <img src="${exercise.example}">
  `

  mainDiv = document.querySelector(".mainDiv")
  mainDiv.appendChild(exDiv)
}

getExercises();
})