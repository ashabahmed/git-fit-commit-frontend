document.addEventListener("DOMContentLoaded", function() {
	const exUrl = "http://localhost:3000/exercises/"
	const userUrl = "http://localhost:3000/users/1"

		
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
		<p>Current Weight: ${user.currentWeight.slice(-1)} lbs.</p>
		<p>Pounds Lost: ${user.startingWeight - parseInt(user.currentWeight.slice(-1))} lbs.</p>
		<p>Pounds Left: ${user.goalWeight - parseInt(user.currentWeight.slice(-1))} lbs.</p>
		`
		const weightUl = document.querySelector(".weightUl")
		const newLi = document.createElement("li")
		let d = new Date()
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oct.", "November", "December"]
		newLi.innerHTML = `${months[d.getMonth()]} ${d.getDate()} ${user.currentWeight[0]}`

		weightUl.appendChild(newLi)
	}

	const submitHandler = () => {
		document.addEventListener('submit', e => {
			e.preventDefault()
			if(e.target.matches("#weightInput")) {
				console.log(e.target)
				const weightForm = document.getElementById('weightInput')
				const currentWeight = weightForm.currentweight.value
				const weightInfo = {currentWeight: currentWeight}
				weightForm.reset()

				const options = {
					method: "POST",
					headers: {
						"content-type": "application/json",
						"accept": "application/json"
					},
					body: JSON.stringify(weightInfo)
				}

				fetch(userUrl, options)
				.then(response => response.json())
				.then(getUser())
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

	const updateMacros = (proteinInput, carbsInput, fatsInput) => {
		console.log(proteinInput)
	}

	// const clickHandler = () => {

	// }

	getUser();
	submitHandler();
	// getExercises();
})