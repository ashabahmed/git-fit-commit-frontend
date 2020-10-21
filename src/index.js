document.addEventListener("DOMContentLoaded", function() {
	const exUrl = "http://localhost:3000/exercises/"
	const userUrl = "http://localhost:3000/users/23"

		
	const getExercises = () => {
		fetch(userUrl)
		.then(response => response.json())
		.then(user => {
			renderUserExercises(user)
		})
	}

	// Here are different ways we can do this workout tracker
	/*
		dynamically select exercises for each different user based on their equpiment attribute will select 
		the equipment select will return a colleciton of worksout that use that equipment 
						Also filter tthrough diffculity level no matter the equipment?
		collection will have a lot of exercises that can be shuffled through the week,
		each card will show the work outs for that day only 
		different days will select random exercises for that day from collection 	
		we can do this by doing an if statement to figure out the day			

		each exercise will list number of sets and reps for each exercise
		some exercise sets will be time based and not rep based

		on exercise click we can render that specific exercise and all it's details(gif, description, insturction, notes)
		we can get the id of the exercise and set it to the dataset id number for the p tag of the exercise

	*/


	const random_exercises = items => {
		return items[Math.floor(Math.random()*items.length)]
	}

	const renderUserExercises = user => {
		const userExercises = user.exercises
		const fullBody = userExercises.filter(exercise => exercise.majorMuscle.includes("Full Body"))
		const core = userExercises.filter(exercise => exercise.majorMuscle.includes("Core"))
		const legs = userExercises.filter(exercise => exercise.majorMuscle.includes("Legs"))
		const arms = userExercises.filter(exercise => exercise.majorMuscle.includes("Arms"))


		const workoutDiv = document.querySelector("#workoutDiv")
		const workout = document.createElement("div")
		const fullBodysample1 = random_exercises(fullBody)
		const armsSample = random_exercises(arms)
		const legsSample = random_exercises(legs)
		const coreSample = random_exercises(core)
		const fullBodysample2 = random_exercises(fullBody)

		
		workoutDiv.innerHTML = `
		<h2 class="card-title">Workout Tracker:</h2>
		<p class="><b>${fullBodysample1.exercise}</b>: 3 Sets - 6-10 Reps each </p>
		<p><b>${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </p>
		<p><b>${legsSample.exercise}</b>: 2 Sets - 6-10 Reps each </p>
		<p><b>${armsSample.exercise}</b>: 2 Sets - 10-12 Reps each </p>
		<p><b>${fullBodysample2.exercise}</b>: 1 Set until failure </p>
		`
		workoutDiv.appendChild(workout)

		
		// for(const exercise of exercises) {
		// 	renderExercise(exercise)
		// }
	}

	
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
		
		renderProgressCard(user)
	}

	const renderProgressCard = (user) => {
		const progressDiv = document.querySelector("#progressDiv")
		const newProgressCard = document.createElement("div")
		newProgressCard.innerHTML = `
			<div class="card" style="width: 18rem; margin-left: 50px;">
				<img class="card-img-top" src="https://img.etimg.com/photo/msid-74747053,quality-100/for-miles-a-great-bodyweight-workout-would-include-squats-push-ups-walking-lunges-.jpg" alt="Card image cap">
				<div class="card-body">
					<h5 class="card-title">Card title</h5>
					<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				</div>
			</div>
		`
		progressDiv.appendChild(newProgressCard)
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


		// <!-- Workout Card is going provide exercises and workout regime for the week.  -->
		// Make a function that renders all the user's exercises based off equipment.
		// Format those exercises into a workout Program



	// <!-- Make initial form for welcome page, so user can enter details -->
	// <!-- based on that we can provide specified workouts -->
	// <!-- Make sure all the stuff that's entered as form input saves to user's DB -->
	// <!-- Name of exercise will be clickable and lead to that workout's details, gif, and instructions -->

	getUser();
	submitHandler();
	getExercises();
})