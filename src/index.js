

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
	function addDarkmodeWidget() {
		new Darkmode().showWidget();
	}
	window.addEventListener('load', addDarkmodeWidget);


	const renderName = (user) => {
		const navBar = document.querySelector("#navBarName")
		navBar.innerText = user.name
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
			<p> Try for some light cardio if you're up for it! </p>
			`
		} else {
			tomorrowDiv.innerHTML = `
				<h3 style="text-align:center;">${tomorrow}</h3>
				<br>
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
			<p> Try for some light cardio if you're up for it! </p>
			`
		} else {
		dayAfterTomorrowDiv.innerHTML = `
			<h3 style="text-align:center;">${dayAfterTomorrow}</h3>
			<br>
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
			<p> Try for some light cardio if you're up for it! </p>
			`
		} else {
			threeDaysAfterDiv.innerHTML = `
			<h3 style="text-align:center;">${threeDaysAfter}</h3>
			<br>
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
			<h2 class="card-title">Workout Tracker:</h2>
			<h3 style="text-align:center;">${n}</h3>
			<h4 style="text-align:center;"> <b> Rest for 3 minutes after each set!</b> </h4>
			<br>
			<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${fullBodySample1.id}"><b class="workout-p" data-exercise-id="${fullBodySample1.id}">${fullBodySample1.exercise}</b>: 3 Sets - 6-10 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<br> no
			<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${coreSample.id}"><b class="workout-p" data-exercise-id="${coreSample.id}">${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<br>
			<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${legsSample.id}"><b class="workout-p" data-exercise-id="${legsSample.id}">${legsSample.exercise}</b>: 2 Sets - 6-10 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<br>
			<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${armsSample.id}"><b class="workout-p" data-exercise-id="${armsSample.id}">${armsSample.exercise}</b>: 2 Sets - 10-12 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<br>
			<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${fullBodySample2.id}"><b class="workout-p" data-exercise-id="${fullBodySample2.id}">${fullBodySample2.exercise}</b>: 1 Set until failure </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
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
			<h2 class="card-title">Workout Tracker:</h2>
			<h3 style="text-align:center;">${n}</h3>
			<h4 style="text-align:center;"> <b>Rest for 1 minute after each set!</b> </h4>
			<br>
			<p class="workout-p" data-exercise-id="${fullBodySample1.id}"><b class="workout-p" data-exercise-id="${fullBodySample1.id}">${fullBodySample1.exercise}</b>: 3 Sets - 6-10 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<p class="workout-p" data-exercise-id="${coreSample.id}"><b class="workout-p" data-exercise-id="${coreSample.id}">${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<p class="workout-p" data-exercise-id="${backSample.id}"><b class="workout-p" data-exercise-id="${backSample.id}">${backSample.exercise}</b>: 2 Sets - 6-10 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<p class="workout-p" data-exercise-id="${armsSample.id}"><b class="workout-p" data-exercise-id="${armsSample.id}">${armsSample.exercise}</b>: 2 Sets - 10-12 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<p class="workout-p" data-exercise-id="${legsSample.id}"><b class="workout-p" data-exercise-id="${legsSample.id}">${legsSample.exercise}</b>: 1 Set until failure </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<br>
			<ul class="pagination pagination-sm justify-content-end" style="margin:20px 0">
				<li class="page-item" ><a id="prev-btn" class="page-link" href="#">Previous</a></li>
			
				<li class="page-item" ><a id="next-btn" class="page-link" href="#">Next</a></li>
			</ul>
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
			<h2 class="card-title">Workout Tracker:</h2>
			<h3 style="text-align:center;">${n}</h3>
			<h4 style="text-align:center;"> <b>Rest for 2 minutes after each set!</b> </h4>
			<br>
			<p class="workout-p" data-exercise-id="${legsSample.id}"><b class="workout-p" data-exercise-id="${legsSample.id}">${legsSample.exercise}</b>: 3 Sets - 6-10 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<p class="workout-p" data-exercise-id="${coreSample.id}"><b class="workout-p" data-exercise-id="${coreSample.id}">${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<p class="workout-p" data-exercise-id="${back.id}"><b class="workout-p" data-exercise-id="${back.id}">${back.exercise}</b>: 2 Sets - 6-10 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<p class="workout-p" data-exercise-id="${fullBodySample1.id}"><b class="workout-p" data-exercise-id="${fullBodySample1.id}">${fullBodySample1.exercise}</b>: 2 Sets - 10-12 Reps each </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<p class="workout-p" data-exercise-id="${legsSample2.id}"><b class="workout-p" data-exercise-id="${legsSample2.id}">${legsSample2.exercise}</b>: 1 Set until failure </p> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<br>
			<ul class="pagination pagination-sm justify-content-end" style="margin:20px 0">
				<li class="page-item" ><a id="prev-btn" class="page-link" href="#">Previous</a></li>
			
				<li class="page-item" ><a id="next-btn" class="page-link" href="#">Next</a></li>
			</ul>
			`
			workoutDiv.appendChild(workout)
		} else {
			const workoutDiv = document.querySelector("#workoutDiv")
			workoutDiv.innerHTML = `
			<h1> Rest Day </h1>
			<strong> Try for some light cardio if you're up for it! </strong>
			<p> Resting up is just dandy though, you're doing great!</p>
			`
		}


		
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
		.then(user => {
			renderName(user)
			renderUserWeightDiv(user)
		})
	}

	const renderUserWeightDiv = (user) => {
		const stats = document.querySelector(".weightStats")
		stats.innerHTML = `
		<h5 style="text-align:center;">GOAL WEIGHT: ${user.goalWeight} lbs.</h5>
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
				const img = weightForm.image.value
				const notes = weightForm.notes.value
				weightForm.reset()

				fetch(userUrl)
				.then(response => response.json())
				.then(data => {
					const currentWeightArray = data.currentWeight
					currentWeightArray.push(currentWeight)
					addCurrentWeight(currentWeightArray, img, notes)
					
				})

			} else if(e.target.matches("#caloriesInput")) {
			
				const macrosForm = document.getElementById('caloriesInput')
				const proteinInput = macrosForm.protein.value
				const carbsInput = macrosForm.carbs.value
				const fatsInput = macrosForm.fats.value
				macrosForm.reset()

				updateMacros(proteinInput, carbsInput, fatsInput)
			} else if(e.target.matches("#mainForm")) {
				e.preventDefault();
				form = e.target
				// Attributes
				const name = form.name.value
				const age = form.age.value
				const startingWeight = form.sw.value
				const goalWeight = form.gw.value
				const skillLevelDropDown = document.getElementById("skillLevelInput");
				const skillLevel = skillLevelDropDown.value;
				const equipmentArray = []
				const sexArray = []

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
				
				const sexValue = sexArray[0]
				const equipmentValue = equipmentArray[0]

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
				.then(getUser())	
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

	const renderChart = () => {
	const ctx = document.getElementById('myChart');
			const myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Current Weight',
						data: [],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});

			
			renderUser();
		}

	const renderUser = () => {
		fetch(userUrl)
		.then(response => response.json())
		.then(user => {
			myChart.data["datasets"]["data"] = user.currentWeight
		})
	}

	const addCurrentWeightLi = (user, img, notes) => {
		const weightUl = document.querySelector(".weightUl")
		const newLi = document.createElement("li")

		newLi.innerHTML = `
		<b>${months[d.getMonth()]} ${d.getDate()}:</b> ${user.currentWeight.slice(-1)} lbs.
		`

		weightUl.append(newLi)
		
		renderProgressCard(user, img, notes)
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
	// 	document.addEventListener('click', e =>{
	// 		const target = e.target
			
	// 	})

	// }

	// if(e.target.matches(".workout-p")){
	// 	const workout = e.target
	// 	const exerciseId = workout.dataset.exerciseId
	// 	console.log(exerciseId)
		
	// 	fetch(exUrl + exerciseId)
	// 	.then(response => response.json())
	// 	.then(exercise => {
	// 		renderExerciseInfo(exercise)
	// 	})
	// } else 
	// const renderExerciseInfo = exercise => {
	// 	exerciseInfoDiv.innerHTML = `
	// 		<div class="modal-fade" id="exerciseModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	// 			<div class="modal-dialog modal-dialog-centered" role="document">
	// 				<div class="modal-content">
	// 					<div class="modal-header">
	// 						<h5 class="modal-title" id="exampleModalLongTitle">${exercise.exercise}</h5>
	// 						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
	// 							<span aria-hidden="true">&times;</span>
	// 						</button>
	// 					</div>
	// 					<div class="modal-body">
	// 					<img src="${exercise.example}">
	// 					<p>${exercise.exerciseType}</p>
	// 					<p>${exercise.equipment}</p>
	// 					<p>${exercise.majorMuscle}</p>
	// 					<p>${exercise.minorMuscle}</p>
	// 					<p>${exercise.notes}</p>
	// 					<p>${exercise.modifications}</p>
	// 					</div>
	// 				<div class="modal-footer">
	// 				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	// 				</div>
	// 		</div>
	// 		`
	// }

	$("#navbar_register_btn").on("click",function(e){
		e.preventDefault();
		$('#navModal').modal('show');
	})

	$(".workout-p").on("click",function(e){
		e.preventDefault();
		$('#exerciseModal').modal('show');
	})

	// clickHandler();
	submitHandler();
	getExercises();
	getUser();
})