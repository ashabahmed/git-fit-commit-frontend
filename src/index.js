document.addEventListener("DOMContentLoaded", function() {
	const exUrl = "http://localhost:3000/exercises/"
	const userUrl = "http://localhost:3000/users/22"

		
	// const getExercises = () => {
	// 	fetch(exUrl)
	// 	.then(response => response.json())
	// 	.then(exercises => {
	// 		renderExercises(exercises)
	// 	})
	// }

	// const renderExercises = exercises => {
	// 	for(const exercise of exercises) {
	// 		renderExercise(exercise)
	// 	}
	// }

	// const renderExercise = exercise => {
	// 	const exDiv = document.createElement("div")
	// 	exDiv.classList.add("card")

	// 	exDiv.innerHTML = `
	// 	<h1>${exercise.exercise}</h1>
	// 	<br>
	// 	<img src="${exercise.example}">
	// 	`

	// 	mainDiv = document.querySelector(".mainDiv")
	// 	mainDiv.appendChild(exDiv)
	// }

	const getUser = () => {
		fetch(userUrl)
		.then(response => response.json())
		.then(user => renderUserWeightDiv(user))
	}

	const renderUserWeightDiv = (user) => {
		const stats = document.querySelector(".weightStats")
		stats.innerHTML = `
		<p>Goal Weight: ${user.goalWeight} lbs.</p>
		<p>Starting Weight: ${user.startingWeight} lbs.</p>
		<p>Current Weight: ${user.currentWeight.slice(-1)} lbs.</p>
		<p>Pounds Lost: ${user.startingWeight - parseInt(user.currentWeight.slice(-1))} lbs.</p>
		<p>Pounds Left: ${user.goalWeight - parseInt(user.currentWeight.slice(-1))} lbs.</p>
		`
		// const weightUl = document.querySelector(".weightUl")
		// const newLi = document.createElement("li")
		// let d = new Date()
		// let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oct.", "November", "December"]
		// newLi.innerHTML = `
		// <b>${months[d.getMonth()]} ${d.getDate()}:</b> ${user.currentWeight.slice(-1)}lbs
		// `

		// weightUl.append(newLi)

		const nav = document.querySelector("#navBar")
		nav.innerHTML = `
		<h1 class="container p-5 my-3 bg-dark text-white"> Git Fit. Git Commit. </h1>
		<h1 class="container p-5 my-3 bg-dark text-white">Hi ${user.name}</h1>
		`
	}

	const submitHandler = () => {
		document.addEventListener('submit', e => {
			e.preventDefault()
			if(e.target.matches("#weightInput")) {
				const weightForm = document.getElementById('weightInput')
				const currentWeight = weightForm.currentweight.value
				weightForm.reset()

				fetch(userUrl)
				.then(response => response.json())
				.then(data => {
					const currentWeightArray = data.currentWeight
					currentWeightArray.push(currentWeight)
					console.log(currentWeightArray)
					addCurrentWeight(currentWeightArray)
					
				})

			} else if(e.target.matches("#caloriesInput")) {
			
				const macrosForm = document.getElementById('caloriesInput')
				const proteinInput = macrosForm.protein.value
				const carbsInput = macrosForm.carbs.value
				const fatsInput = macrosForm.fats.value
				macrosForm.reset()

				updateMacros(proteinInput, carbsInput, fatsInput)
			}
		})
	}

	const addCurrentWeight = (currentWeightArray) => {
		const options = {
					method: "PATCH",
					headers: {
						"content-type": "application/json",
						"accept": "application/json"
					},
					body: JSON.stringify({
						currentWeight: currentWeightArray
					})
				}

				fetch(userUrl, options)
				.then(response => response.json())
				.then(user => {
					addCurrentWeightLi(user),
					getUser()
				})


				
	}

	const addCurrentWeightLi = (user) => {
		const weightUl = document.querySelector(".weightUl")
		const newLi = document.createElement("li")
		let d = new Date()
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oct.", "November", "December"]
		newLi.innerHTML = `
		<b>${months[d.getMonth()]} ${d.getDate()}:</b> ${user.currentWeight.slice(-1)} lbs.
		`

		weightUl.append(newLi)
	}

	const updateMacros = (proteinInput, carbsInput, fatsInput) => {
		protein = parseInt(document.querySelector(".protein").innerText)
		proteinInputInt = parseInt(proteinInput)
		carbs = parseInt(document.querySelector(".carbs").innerText)
		carbsInputInt = parseInt(carbsInput)
		fats = parseInt(document.querySelector(".fats").innerText)
		fatsInputInt = parseInt(fatsInput)

		document.querySelector(".protein").innerHTML = `${protein - proteinInputInt}g Protein`
		document.querySelector(".carbs").innerHTML = `${carbs - carbsInputInt}g Carbs`
		document.querySelector(".fats").innerHTML = `${fats - fatsInputInt}g Fats`
		
	}

	// const clickHandler = () => {

	// }

	getUser();
	submitHandler();
	// getExercises();
})