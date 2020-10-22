

document.addEventListener("DOMContentLoaded", function() {
	const exUrl = "http://localhost:3000/exercises/"
	const userUrl = "http://localhost:3000/users/24"

	let d = new Date()
	
	let weekday = new Array(7);
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	let dayNum = 0;
	let n = weekday[d.getDay() + dayNum];
	let tomorrow = weekday[d.getDay() + 1]
	let threeDaysFromNow = weekday[d.getDay() + 3]
	
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oct.", "November", "December"]

	const exerciseInfoDiv = document.getElementById('exerciseInfo')
	
	function addDarkmodeWidget() {
		new Darkmode().showWidget();
	}
	window.addEventListener('load', addDarkmodeWidget);

	const getExercises = () => {
		fetch(userUrl)
		.then(response => response.json())
		.then(user => {
			
			renderUserExercises(user)
		})
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
			<br>
			<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${coreSample.id}"><b class="workout-p" data-exercise-id="${coreSample.id}">${coreSample.exercise}</b>: 3 Sets - 6-10 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<br>
			<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${legsSample.id}"><b class="workout-p" data-exercise-id="${legsSample.id}">${legsSample.exercise}</b>: 2 Sets - 6-10 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<br>
			<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${armsSample.id}"><b class="workout-p" data-exercise-id="${armsSample.id}">${armsSample.exercise}</b>: 2 Sets - 10-12 Reps each </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<br>
			<button type="button" data-toggle="modal" data-target="#exerciseModal" style="background: none; border: none" class="workout-p" data-exercise-id="${fullBodySample2.id}"><b class="workout-p" data-exercise-id="${fullBodySample2.id}">${fullBodySample2.exercise}</b>: 1 Set until failure </button> <input type="checkbox" id="accept"> <span class="badge badge-pill badge-info">Done?</span>
			<br>
			<ul class="pagination pagination-sm justify-content-end" style="margin:20px 0">
				<li class="page-item" ><a id="prev-btn" class="page-link" href="#">Previous</a></li>
			
				<li class="page-item" ><a id="next-btn" class="page-link" href="#">Next</a></li>
			</ul>

			
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
			<h1> REST DAY!! </h1>
			<h3> Try for some light cardio if you're up for it! </h3>
			<h3> Resting up is just dandy though, you're doing great!</h3>
			<ul class="pagination pagination-sm justify-content-end" style="margin:20px 0">
				<li class="page-item" ><a id="prev-btn" class="page-link" href="#">Previous</a></li>
		
				<li class="page-item" ><a id="next-btn" class="page-link" href="#">Next</a></li>
			</ul>
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
					addCurrentWeight(currentWeightArray)
					
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

	const clickHandler = () => {
		document.addEventListener('click', e =>{
			if (e.target.matches("#next-btn")) {
					dayNum += 1
					
				} else if (e.target.matches("#prev-btn")) {
					dayNum -= 1
					
				}

		})

	}

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

	clickHandler();
	getUser();
	submitHandler();
	getExercises();
})





		// <!-- Workout Card is going provide exercises and workout regime for the week.  -->
		// Make a function that renders all the user's exercises based off equipment.
		// Format those exercises into a workout Program



	// <!-- Make initial form for welcome page, so user can enter details -->
	// <!-- based on that we can provide specified workouts -->
	// <!-- Make sure all the stuff that's entered as form input saves to user's DB -->
	// <!-- Name of exercise will be clickable and lead to that workout's details, gif, and instructions -->

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