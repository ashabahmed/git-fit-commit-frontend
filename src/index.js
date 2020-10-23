document.addEventListener("DOMContentLoaded", function() {
	const exUrl = "http://localhost:3000/exercises/"
	const userUrl = "http://localhost:3000/users/1"
	let d = new Date()
	let weekday = new Array(14);
			weekday[0] = "Sunday";
			weekday[1] = "Monday";
			weekday[2] = "Tuesday";
			weekday[3] = "Wednesday";
			weekday[4] = "Thursday";
			weekday[5] = "Friday";
			weekday[6] = "Saturday";
			weekday[7] = "Sunday";
			weekday[8] = "Monday";
			weekday[9] = "Tuesday";
			weekday[10] = "Wednesday";
			weekday[11] = "Thursday";
			weekday[12] = "Friday";
			weekday[13] = "Saturday";
	let n = weekday[d.getDay()];
	let tomorrow = weekday[d.getDay() + 1]
	let dayAfterTomorrow = weekday[d.getDay() + 2]
	let threeDaysAfter = weekday[d.getDay() + 3]
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oct.", "November", "December"]	
// 
// 
// 

	const logInHandler = () => {
		const home = document.querySelector("#userForm")
		home.addEventListener('submit', e => {
			e.preventDefault();
			form = e.target
			// Attributes
			const name = form.name.value
			const age = form.age.value
			const height = form.height.value
			const startingWeight = form.sw.value
			const goalWeight = form.gw.value
			const skillLevelDropDown = document.getElementById("skillLevelInput");
			const skillLevel = skillLevelDropDown.value;
			const equipmentArray = []
			const sexArray = []
			const activityLevelArray = []
			document.getElementsByName("sex").forEach(radio => {
				if(radio.checked) {
					sexArray.push(radio.value)
				}
			})
			document.getElementsByName("equipment").forEach(radio => {
				if(radio.checked) {
					equipmentArray.push(radio.value)
				}
			})
			document.getElementsByName("activityLevel").forEach(radio => {
				if(radio.checked) {
					activityLevelArray.push(radio.value)
				}
			})
			
			const sexValue = sexArray[0]
			const equipmentValue = equipmentArray[0]
			const activityLevelValue = activityLevelArray[0]

			const goalDropDown = document.getElementById("goalInput");
			const goalValue = parseInt(goalDropDown.value)
			const goalContent = goalDropDown.options[goalDropDown.selectedIndex].textContent

			calculateCalories(sexValue, startingWeight, height, age, activityLevelValue, goalValue, goalContent);

			form.reset()

			const newUser = { 
				name: name, 
				sex: sexValue, 
				age: age, 
				startingWeight: startingWeight,
				currentWeight: [startingWeight], 
				goalWeight: goalWeight, 
				macros: "protein",
				skillLevel: skillLevel, 
				equipment: equipmentValue }

			const options = {
				method: "PATCH",
				headers: {
					"content-type": "application/json",
					"accept": "application/json"
				},
				body: JSON.stringify(newUser)
			}

			fetch(userUrl, options)
			.then(response => response.json())
			.then(user => {
				getUser(user)
			})
			

			let dailyCalories = parseInt(document.querySelector("#dailyCalories").innerText)

			let dailyProtein = document.querySelector("#proteinDaily")


			dailyProtein.innerHTML = `
			<p id="dailyProteinPTag" style="text-align:center;"> ${Math.round((dailyCalories*0.4)/4)}g <b>Protein</b> </p> 
			<hr>
			`

			let dailyCarbs = document.querySelector("#carbsDaily")
			dailyCarbs.innerHTML = `
			<p id="dailyCarbsPTag" style="text-align:center;"> ${Math.round((dailyCalories*0.4)/4)}g <b>Carbs</b> </p> 
			<hr>
			`
		
			let dailyFats = document.querySelector("#fatsDaily")
			dailyFats.innerHTML = `
			<p id="dailyFatsPTag" style="text-align:center;"> ${Math.round((dailyCalories*0.2)/9)}g <b>Fats</b> </p> 
			<hr>
			`

		}
	)}

	const calculateCalories = (sexValue, startingWeight, height, age, activityLevelValue, goalValue, goalContent) => {
		const calorieInformation = document.querySelector("#calorieInformation")
		const startingWeightParsed = parseInt(startingWeight)
		if(sexValue === "male") {
			const unrounded = (10*startingWeightParsed*0.453592)+((6.25*height)-(5*age+5))  
			const rounded = Math.round(unrounded / 10) * 10;

			const tdee = rounded*activityLevelValue
			if(goalContent === "Lose Weight"){
				calorieInformation.innerHTML = `
				<h5>Suggested Daily Calories For ${goalContent} </h5>
				<h4 id="dailyCalories">${tdee+goalValue}</h4>
				<hr>
				<h5><b>Remaining Calories:</b></h5>
				<h4 id="updatedCalories"> </h4>
				
				`
			} else if(goalContent === "Maintain Weight"){
				calorieInformation.innerHTML = `
				<h5>Suggested Daily Calories For ${goalContent} </h5>
				<h4 id="dailyCalories">${tdee+goalValue}</h4>
				<hr>
				<p><b>Remaining calories after log:</b></p>

				`
			} else if(goalContent === "Gain Muscle"){
				calorieInformation.innerHTML = `
				<h5>Suggested Daily Calories For ${goalContent} </h5>
				<h4 id="dailyCalories">${tdee+goalValue}</h4>
				<hr>
				<p><b>Remaining calories after log:</b></p>

				`
			}
		} else if(sexValue === "female") {
			const unrounded = (10*startingWeightParsed*0.453592)+((6.25*height)-(5*age-161))
			const rounded = Math.round(unrounded / 10) * 10;
			const tdee = rounded*activityLevelValue
			if(goalContent === "Lose Weight"){
				calorieInformation.innerHTML = `
				<h5>Suggested Daily Calories For ${goalContent} </h5>
				<h4 id="dailyCalories">${tdee+goalValue}</h4>
				<hr>
				<p><b>Remaining calories after log:</b></p>

				`
			} else if(goalContent === "Maintain Weight"){
				calorieInformation.innerHTML = `
				<h5>Suggested Daily Calories For ${goalContent} </h5>
				<h4 id="dailyCalories">${tdee+goalValue}</h4>
				<hr>
				<p><b>Remaining calories after log:</b></p>

				`
			} else if(goalContent === "Gain Muscle"){
				calorieInformation.innerHTML = `
				<h5>Suggested Daily Calories For ${goalContent} </h5>
				<h4 id="dailyCalories">${tdee+goalValue}</h4>
				<hr>
				<p><b>Remaining calories after log:</b></p>

				`
			}
		}
	}

	const renderName = (user) => {
		const navBar = document.querySelector("#navBarName")
		navBar.innerHTML = `
		<h1 style="color: white">
			<img src="src/gitfitlogo.png" width="45px" height="45px"  alt="">
			Git Fit. Git Commit.
		</h1>
		<h5 style="text-align: center; color: white">Logged in as: ${user.name}</h5>
		`
	}

	const getExercises = () => {
		fetch(userUrl)
		.then(response => response.json())
		.then(user => {
			renderUserExercises(user)
			renderTomorrowWorkouts(user)
			renderDayAfterWorkouts(user)
			renderThreeDaysFromNowWorkout(user)
		})
	}

	const renderTomorrowWorkouts = (user) => {
		const fullBody = user.exercises.filter(exercise => exercise.majorMuscle.includes("Full Body"))
		const core = user.exercises.filter(exercise => exercise.majorMuscle.includes("Core"))
		const legs = user.exercises.filter(exercise => exercise.majorMuscle.includes("Legs"))
		const arms = user.exercises.filter(exercise => exercise.majorMuscle.includes("Arms"))
		const back = user.exercises.filter(exercise => exercise.majorMuscle.includes("Back"))
		const fullBodySample1 = random_exercises(fullBody)
		const backSample = random_exercises(back)
		const legsSample = random_exercises(legs)
		const armsSample = random_exercises(arms)
		const coreSample = random_exercises(core)

		const tomorrowDiv = document.querySelector("#tomorrowDiv")
		
		if(tomorrow === "Saturday" || tomorrow === "Sunday" || tomorrow === "Tuesday" || tomorrow === "Thursday") {
			tomorrowDiv.innerHTML = `
			<h3 style="text-align:center;"> Rest Day </h3>
			<hr>
			<p> Try for some light cardio if you're up for it! </p>
			`
		} else {
			tomorrowDiv.innerHTML = `
				<h3 style="text-align:center;">${tomorrow}</h3>
				<hr>
				<p class="workout-p" data-exercise-id="${fullBodySample1.id}"><b class="workout-p" data-exercise-id="${fullBodySample1.id}">${fullBodySample1.exercise}</b>: 3 Sets - 6-10 Reps each </p> 
				<p class="workout-p" data-exercise-id="${coreSample.id}"><b class="workout-p" data-exercise-id="${coreSample.id}">${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </p> 
				<p class="workout-p" data-exercise-id="${backSample.id}"><b class="workout-p" data-exercise-id="${backSample.id}">${backSample.exercise}</b>: 2 Sets - 6-10 Reps each </p> 
				<p class="workout-p" data-exercise-id="${armsSample.id}"><b class="workout-p" data-exercise-id="${armsSample.id}">${armsSample.exercise}</b>: 2 Sets - 10-12 Reps each </p> 
				<p class="workout-p" data-exercise-id="${legsSample.id}"><b class="workout-p" data-exercise-id="${legsSample.id}">${legsSample.exercise}</b>: 1 Set until failure </p> 
				`
		}
	}

	const renderDayAfterWorkouts = (user) => {
		const fullBody = user.exercises.filter(exercise => exercise.majorMuscle.includes("Full Body"))
		const core = user.exercises.filter(exercise => exercise.majorMuscle.includes("Core"))
		const legs = user.exercises.filter(exercise => exercise.majorMuscle.includes("Legs"))
		const arms = user.exercises.filter(exercise => exercise.majorMuscle.includes("Arms"))
		const back = user.exercises.filter(exercise => exercise.majorMuscle.includes("Back"))
		const dayAfterTomorrowDiv = document.querySelector("#dayAfterTomorrowDiv")
		const fullBodySample1 = random_exercises(fullBody)
		const backSample = random_exercises(back)
		const legsSample = random_exercises(legs)
		const armsSample = random_exercises(arms)
		const coreSample = random_exercises(core)

		if(dayAfterTomorrow === "Saturday" || dayAfterTomorrow === "Sunday" || dayAfterTomorrow === "Tuesday" || dayAfterTomorrow === "Thursday") {
			dayAfterTomorrowDiv.innerHTML = `
			<h3 style="text-align:center;"> Rest Day </h3>
			<hr>
			<p> Try for some light cardio if you're up for it! </p>
			`
		} else {
		dayAfterTomorrowDiv.innerHTML = `
			<h3 style="text-align:center;">${dayAfterTomorrow}</h3>
			<hr>
			<p class="workout-p" data-exercise-id="${fullBodySample1.id}"><b class="workout-p" data-exercise-id="${fullBodySample1.id}">${fullBodySample1.exercise}</b>: 3 Sets - 6-10 Reps each </p> 
			<p class="workout-p" data-exercise-id="${coreSample.id}"><b class="workout-p" data-exercise-id="${coreSample.id}">${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </p> 
			<p class="workout-p" data-exercise-id="${backSample.id}"><b class="workout-p" data-exercise-id="${backSample.id}">${backSample.exercise}</b>: 2 Sets - 6-10 Reps each </p> 
			<p class="workout-p" data-exercise-id="${armsSample.id}"><b class="workout-p" data-exercise-id="${armsSample.id}">${armsSample.exercise}</b>: 2 Sets - 10-12 Reps each </p> 
			<p class="workout-p" data-exercise-id="${legsSample.id}"><b class="workout-p" data-exercise-id="${legsSample.id}">${legsSample.exercise}</b>: 1 Set until failure </p> 
			<br>
			`
		}
	}
	const renderThreeDaysFromNowWorkout = (user) => {
		const fullBody = user.exercises.filter(exercise => exercise.majorMuscle.includes("Full Body"))
		const core = user.exercises.filter(exercise => exercise.majorMuscle.includes("Core"))
		const legs = user.exercises.filter(exercise => exercise.majorMuscle.includes("Legs"))
		const arms = user.exercises.filter(exercise => exercise.majorMuscle.includes("Arms"))
		const back = user.exercises.filter(exercise => exercise.majorMuscle.includes("Back"))
		const threeDaysAfterDiv = document.querySelector("#threeDaysAfterDiv")
		const fullBodySample1 = random_exercises(fullBody)
		const backSample = random_exercises(back)
		const legsSample = random_exercises(legs)
		const armsSample = random_exercises(arms)
		const coreSample = random_exercises(core)

		if(threeDaysAfter === "Saturday" || threeDaysAfter === "Sunday" || threeDaysAfter === "Tuesday" || threeDaysAfter === "Thursday") {
			threeDaysAfterDiv.innerHTML = `
			<h3 style="text-align:center;"> Rest Day </h3>
			<hr>
			<p> Try for some light cardio if you're up for it! </p>
			`
		} else {
			threeDaysAfterDiv.innerHTML = `
			<h3 style="text-align:center;">${threeDaysAfter}</h3>
			<hr>
			<p class="workout-p" data-exercise-id="${fullBodySample1.id}"><b class="workout-p" data-exercise-id="${fullBodySample1.id}">${fullBodySample1.exercise}</b>: 3 Sets - 6-10 Reps each </p> 
			<p class="workout-p" data-exercise-id="${coreSample.id}"><b class="workout-p" data-exercise-id="${coreSample.id}">${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </p> 
			<p class="workout-p" data-exercise-id="${backSample.id}"><b class="workout-p" data-exercise-id="${backSample.id}">${backSample.exercise}</b>: 2 Sets - 6-10 Reps each </p> 
			<p class="workout-p" data-exercise-id="${armsSample.id}"><b class="workout-p" data-exercise-id="${armsSample.id}">${armsSample.exercise}</b>: 2 Sets - 10-12 Reps each </p> 
			<p class="workout-p" data-exercise-id="${legsSample.id}"><b class="workout-p" data-exercise-id="${legsSample.id}">${legsSample.exercise}</b>: 1 Set until failure </p> 
			`
		}
	
	}

	const random_exercises = items => {
		return items[Math.floor(Math.random()*items.length)]
	}

	const renderUserExercises = user => {
		workoutDiv.innerHTML = ""
		if(n === "Wednesday"){
			
			const fullBody = user.exercises.filter(exercise => exercise.majorMuscle.includes("Full Body"))
			const core = user.exercises.filter(exercise => exercise.majorMuscle.includes("Core"))
			const legs = user.exercises.filter(exercise => exercise.majorMuscle.includes("Legs"))
			const arms = user.exercises.filter(exercise => exercise.majorMuscle.includes("Arms"))
	
			const workoutDiv = document.querySelector("#workoutDiv")
			const workout = document.createElement("div")
			const fullBodySample1 = random_exercises(fullBody)
			const armsSample = random_exercises(arms)
			const legsSample = random_exercises(legs)
			const coreSample = random_exercises(core)
			const fullBodySample2 = random_exercises(fullBody)
		
			workoutDiv.innerHTML = `
				<h1 class="card-title" style="text-align:center;">Workout Tracker</h1 >
				<hr>
				<h5 style="text-align:center;">${n}</h5>
				<hr>
				<h4 style="text-align:center;"> <b> Rest for 3 minutes after each set!</b> </h4>
				<hr>
				<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${fullBodySample1.id}"><b class="workout-p" data-exercise-id="${fullBodySample1.id}">${fullBodySample1.exercise}</b>: 3 Sets - 6-10 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-dark">Done?</span>
				<br>
				<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${coreSample.id}"><b class="workout-p" data-exercise-id="${coreSample.id}">${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-dark">Done?</span>
				<br>
				<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${legsSample.id}"><b class="workout-p" data-exercise-id="${legsSample.id}">${legsSample.exercise}</b>: 2 Sets - 6-10 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-dark">Done?</span>
				<br>
				<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${armsSample.id}"><b class="workout-p" data-exercise-id="${armsSample.id}">${armsSample.exercise}</b>: 2 Sets - 10-12 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-dark">Done?</span>
				<br>
				<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${fullBodySample2.id}"><b class="workout-p" data-exercise-id="${fullBodySample2.id}">${fullBodySample2.exercise}</b>: 1 Set until failure </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-dark">Done?</span>
				<br>
			`
			workoutDiv.appendChild(workout)
		} else if (n === "Friday"){
			
			const fullBody = user.exercises.filter(exercise => exercise.majorMuscle.includes("Full Body"))
			const core = user.exercises.filter(exercise => exercise.majorMuscle.includes("Core"))
			const legs = user.exercises.filter(exercise => exercise.majorMuscle.includes("Legs"))
			const arms = user.exercises.filter(exercise => exercise.majorMuscle.includes("Arms"))
			const back = user.exercises.filter(exercise => exercise.majorMuscle.includes("Back"))
	
			const workoutDiv = document.querySelector("#workoutDiv")
			const workout = document.createElement("div")
			const fullBodySample1 = random_exercises(fullBody)
			const backSample = random_exercises(back)
			const legsSample = random_exercises(legs)
			const armsSample = random_exercises(arms)
			const coreSample = random_exercises(core)
			
			workoutDiv.innerHTML = `
				<h1 class="card-title" style="text-align:center;">Workout Tracker</h1 >
				<hr>
				<h5 style="text-align:center;">${n}</h5>
				<hr>
				<h4 style="text-align:center;"> <b>Rest for 1 minute after each set!</b> </h4>
				<hr>
				<p style="text-align:center;" class="workout-p" data-exercise-id="${fullBodySample1.id}"><b class="workout-p" data-exercise-id="${fullBodySample1.id}">${fullBodySample1.exercise}</b>: 3 Sets - 6-10 Reps each </p> Done? <input type="checkbox" id="done?"> 
				<hr>
				<p style="text-align:center;" class="workout-p" data-exercise-id="${coreSample.id}"><b class="workout-p" data-exercise-id="${coreSample.id}">${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </p> Done? <input type="checkbox" id="done?">
				<hr>
				<p style="text-align:center;" class="workout-p" data-exercise-id="${backSample.id}"><b class="workout-p" data-exercise-id="${backSample.id}">${backSample.exercise}</b>: 2 Sets - 6-10 Reps each </p> Done? <input type="checkbox" id="done?"> 
				<hr>
				<p style="text-align:center;" class="workout-p" data-exercise-id="${armsSample.id}"><b class="workout-p" data-exercise-id="${armsSample.id}">${armsSample.exercise}</b>: 2 Sets - 10-12 Reps each </p> Done? <input type="checkbox" id="done?">
				<hr>
				<p style="text-align:center;" class="workout-p" data-exercise-id="${legsSample.id}"><b class="workout-p" data-exercise-id="${legsSample.id}">${legsSample.exercise}</b>: 1 Set until failure </p> Done? <input type="checkbox" id="done?"> 

			`
			workoutDiv.appendChild(workout)
		} else if (n === "Monday") {
			const fullBody = user.exercises.filter(exercise => exercise.majorMuscle.includes("Full Body"))
			const core = user.exercises.filter(exercise => exercise.majorMuscle.includes("Core"))
			const legs = user.exercises.filter(exercise => exercise.majorMuscle.includes("Legs"))
			
			const back = user.exercises.filter(exercise => exercise.majorMuscle.includes("Back"))
	
			const workoutDiv = document.querySelector("#workoutDiv")
			const workout = document.createElement("div")
			const fullBodySample1 = random_exercises(fullBody)
			
			const legsSample = random_exercises(legs)
			const coreSample = random_exercises(core)
			const legsSample2 = random_exercises(legs)
	
			
			workoutDiv.innerHTML = `
			<h1 class="card-title" style="text-align:center;">Workout Tracker:</h1 >
			<hr>
			<h5 style="text-align:center;">${n}</h5>
			<hr>
			<h4 style="text-align:center;"> <b>Rest for 2 minutes after each set!</b> </h4>
			<hr>
			<p class="workout-p" data-exercise-id="${legsSample.id}"><b class="workout-p" data-exercise-id="${legsSample.id}">${legsSample.exercise}</b>: 3 Sets - 6-10 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-dark">Done?</span>
			<p class="workout-p" data-exercise-id="${coreSample.id}"><b class="workout-p" data-exercise-id="${coreSample.id}">${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-dark">Done?</span>
			<p class="workout-p" data-exercise-id="${back.id}"><b class="workout-p" data-exercise-id="${back.id}">${back.exercise}</b>: 2 Sets - 6-10 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-dark">Done?</span>
			<p class="workout-p" data-exercise-id="${fullBodySample1.id}"><b class="workout-p" data-exercise-id="${fullBodySample1.id}">${fullBodySample1.exercise}</b>: 2 Sets - 10-12 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-dark">Done?</span>
			<p class="workout-p" data-exercise-id="${legsSample2.id}"><b class="workout-p" data-exercise-id="${legsSample2.id}">${legsSample2.exercise}</b>: 1 Set until failure </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-dark">Done?</span>
			<br>
			`
			workoutDiv.appendChild(workout)
		} else {
			const workoutDiv = document.querySelector("#workoutDiv")
			workoutDiv.innerHTML = `
			<h1 style="text-align:center;"> Today's Workout </h1>
			<hr>
			<h5 style="text-align:center;"> Rest Day </h5>
			<hr>
			<p> Try for some light cardio if you're up for it! </p>
			<p> Resting up is just dandy though, you're doing great!</p>
			`
		}


		
		// for(const exercise of exercises) {
		// 	renderExercise(exercise)
		// }
	}

	const getUser = () => {
		fetch(userUrl)
		.then(response => response.json())
		.then(user => {
			renderName(user)
			renderUserWeightDiv(user)
		})
	}

	const renderUserWeightDiv = (user) => {
		const stats = document.querySelector(".weightStats")
		stats.innerHTML = `
		<h5 style="text-align:center;">Goal Weight: ${user.goalWeight} lbs.</h5>
		<hr>
		<p> <b>Starting Weight:</b> ${user.startingWeight} lbs.</p>
		<p> <b>Current Weight:</b> ${user.currentWeight.slice(-1)} lbs.</p>
		<p> <b>Pounds Lost:</b> ${user.startingWeight - parseInt(user.currentWeight.slice(-1))} lbs.</p>
		<p> <b>Pounds Left:</b> ${parseInt(user.currentWeight.slice(-1)) - user.goalWeight} lbs.</p>
		
		`
	}

	const modalHandler = () => {
		const form = document.querySelector("#weightInput")
		form.addEventListener('submit', e => {
			e.preventDefault()
			if(e.target.matches("#weightInput")) {
				console.log(e.target)
				const currentWeight = form.currentweight.value
				const img = form.image.value
				const notes = form.notes.value
				form.reset()

				fetch(userUrl)
				.then(response => response.json())
				.then(data => {
					const currentWeightArray = data.currentWeight
					currentWeightArray.push(currentWeight)
					addCurrentWeight(currentWeightArray, img, notes)
					
				})

			} 
		})
	}

	const calorieHandler = () => {
		document.addEventListener('submit', e => {
			e.preventDefault();
			if(e.target.matches("#caloriesInput")) {
			
				const macrosForm = document.getElementById('caloriesInput')
				const proteinInput = parseInt(macrosForm.protein.value)
				const carbsInput = parseInt(macrosForm.carbs.value)
				const fatsInput = parseInt(macrosForm.fats.value)
				macrosForm.reset()

				updateMacros(proteinInput, carbsInput, fatsInput)
			} 
		})
	}




	const addCurrentWeight = (currentWeightArray, img, notes) => {
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
					addCurrentWeightLi(user, img, notes),
					getUser(),
					renderChart()
				})
	}

	// const renderChart = () => {
	// const ctx = document.getElementById('myChart');
	// 		const myChart = new Chart(ctx, {
	// 			type: 'line',
	// 			data: {
	// 				labels: [],
	// 				datasets: [{
	// 					label: 'Current Weight',
	// 					data: [],
	// 					backgroundColor: [
	// 						'rgba(255, 99, 132, 0.2)',
	// 						'rgba(54, 162, 235, 0.2)',
	// 						'rgba(255, 206, 86, 0.2)',
	// 						'rgba(75, 192, 192, 0.2)',
	// 						'rgba(153, 102, 255, 0.2)',
	// 						'rgba(255, 159, 64, 0.2)'
	// 					],
	// 					borderColor: [
	// 						'rgba(255, 99, 132, 1)',
	// 						'rgba(54, 162, 235, 1)',
	// 						'rgba(255, 206, 86, 1)',
	// 						'rgba(75, 192, 192, 1)',
	// 						'rgba(153, 102, 255, 1)',
	// 						'rgba(255, 159, 64, 1)'
	// 					],
	// 					borderWidth: 1
	// 				}]
	// 			},
	// 			options: {
	// 				scales: {
	// 					yAxes: [{
	// 						ticks: {
	// 							beginAtZero: true
	// 						}
	// 					}]
	// 				}
	// 			}
	// 		});

			
	// 		renderUser();
	// 	}

	// const renderUser = () => {
	// 	fetch(userUrl)
	// 	.then(response => response.json())
	// 	.then(user => {
	// 		myChart.data["datasets"]["data"] = user.currentWeight
	// 	})
	// }

	const addCurrentWeightLi = (user, img, notes) => {
		const weightUl = document.querySelector(".weightUl")
		const newLi = document.createElement("li")

		newLi.innerHTML = `
		<b>${months[d.getMonth()]} ${d.getDate()}:</b> ${user.currentWeight.slice(-1)} lbs.
		`

		weightUl.append(newLi)
		
		renderProgressCard(user, img, notes)
		renderChart
	}

	const renderProgressCard = (user, img, notes) => {
		
		const progressDiv = document.querySelector("#progressDiv")
		const newProgressCard = document.createElement("div")
		newProgressCard.innerHTML = `
			<div class="card" style="width: 18rem; height: 24rem; margin-left: 50px;">
				<img class="card-img-top" src="${img}">
				<div class="card-body">
					<h5 class="card-title">${months[d.getMonth()]} ${d.getDate()}</h5>
					<p class="card-text">Weight: <strong>${user.currentWeight.slice(-1)}lbs.</strong> You've Lost: <strong>${user.startingWeight - parseInt(user.currentWeight.slice(-1))}lbs.</strong>. You have <strong>${user.goalWeight - parseInt(user.currentWeight.slice(-1))}lbs</strong> left to go!</p>
					<p class="card-text">${notes} </p>				
				
				</div>
			</div>
		`
		if (progressDiv.childElementCount >= 4) {
			let firstImgDiv = progressDiv.children[0]
			progressDiv.removeChild(firstImgDiv)
			progressDiv.appendChild(newProgressCard)
		} else {
			progressDiv.appendChild(newProgressCard)
		}
		
	}

	const updateMacros = (proteinInput, carbsInput, fatsInput) => {
		const calorieInformation = document.querySelector("#calorieInformation")
		let dailyCalories = parseInt(document.querySelector("#dailyCalories").innerText)
		let updatedCalories = ((dailyCalories)-((proteinInput*4)+(carbsInput*4)+(fatsInput*9)))
		const updated = document.querySelector("#updatedCalories")
		updated.innerText = updatedCalories

		const dailyProtein = parseInt(document.getElementById("dailyProteinPTag").innerText)
		const dailyCarbs = parseInt(document.getElementById("dailyCarbsPTag").innerText)
		const dailyFats = parseInt(document.getElementById("dailyFatsPTag").innerText)

			let roundedProtein = Math.round(dailyProtein - proteinInput)
			let roundedCarbs = Math.round(dailyCarbs - carbsInput)
			let roundedFats = Math.round(dailyFats - fatsInput)

		document.querySelector("#dailyProteinPTag").innerHTML = `${roundedProtein}g Protein`
		document.querySelector("#dailyCarbsPTag").innerHTML = `${roundedCarbs}g Carbs`
		document.querySelector("#dailyFatsPTag").innerHTML = `${roundedFats}g Fats`

	}

	

	const clickHandler = () => {
		document.addEventListener('click', (e) => {
			if (e.target.matches(`[data-purpose="delete"]`)) {
				
				const removeWeightUl = document.querySelector(".weightUl")
				removeWeightUl.lastElementChild.remove()
				document.querySelector("#progressDiv").lastElementChild.remove()

			} else if (e.target.matches('.workout-p')) {
				const exerciseClickId = e.target.dataset.exerciseId
				
				fetch(exUrl + exerciseClickId)
				.then(response => response.json())
				.then(exercise => console.log(exercise))
				
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

	const renderExerciseInfo = exercise => {
		exerciseInfoDiv.innerHTML = `
			<div class="modal-fade" id="exerciseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLongTitle">${exercise.exercise}</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
						<img src="${exercise.example}">
						<p>${exercise.exerciseType}</p>
						<p>${exercise.equipment}</p>
						<p>${exercise.majorMuscle}</p>
						<p>${exercise.minorMuscle}</p>
						<p>${exercise.notes}</p>
						<p>${exercise.modifications}</p>
						</div>
					<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
			</div>
			`
	}

	$("#navbar_register_btn").on("click",function(e){
		e.preventDefault();
		$('#navModal').modal('show');
	})

	$(".workout-p").on("click",function(e){
		e.preventDefault();
		$('#exerciseModal').modal('show');
	})

	logInHandler();
	clickHandler();
	modalHandler();
	calorieHandler();
	getExercises();
	getUser();
})