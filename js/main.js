'use strict';

import '../style/style.scss';
import '../style/game.scss'

import startMode from './modes/startMode';
import endMode from './modes/endMode';

import listenForDirectionChange from './functions/listenForDirectionChange';
import createFood from './functions/createFood';
import resetFood from './functions/resetFood';
import createArrows from './functions/createArrows';
import isMobile from './functions/isMobile';
import isMaxHeight from './functions/isMaxHeight';
import isMaxWidth from './functions/isMaxWidth';


import Snake from './classes/snake';
import Food from './classes/food';
import { db} from './firebaseConfig';
import { ref, set } from "firebase/database";

page('/', index);
page('/rankings', showRankings);
page('/about', about);

function showRankings() {
	console.log("showRankings called");
    document.querySelector('.game').style.display = 'none';
    document.getElementById('content').innerHTML = `
      <h1>Rankingi</h1>
      <p>Tutaj znajdziesz rankingi graczy.</p>
      <div><textarea name="sdids" id="sda" cols="30" rows="10"></textarea></div>
      <div><h1>asdjoiikosdjikosdjikoasjiksdajisdak</h1></div>
    `;
  }

function index() {
	// Ponownie wyświetl główną zawartość gry
	document.querySelector('.game').style.display = '';
  
	document.getElementById('content').innerHTML = '<h1></h1>';
  }


function about() {
  document.getElementById('content').innerHTML = '<h1>O grze</h1>';
}

// Uruchom routing
page.start();

function saveScore(score) {
	set(ref(db, 'scores/' + Date.now()), {
	  score: score,
	  timestamp: Date.now()
	}).then(() => {
	  console.log("Score saved successfully.");
	}).catch((error) => {
	  console.error("Error saving score: ", error);
	});
  }
  




document.addEventListener('DOMContentLoaded', () => {
	const media = isMobile();
	createArrows(media), createFood(media) ;

	
	
	const canvas = document.querySelector('.canvas');
	const mediaHeigth = isMaxHeight();
	const mediaWidth = isMaxWidth();
	if (mediaHeigth && mediaWidth) {
		const gameContainer = document.querySelector('.game');
		canvas.height = gameContainer.offsetHeight - 240;
	}

	const ctx = canvas.getContext('2d'),
		 canvasWidth = canvas.width,
		 canvasHeight = canvas.height;

		 
	const snakeInit = {
		x: 98,
		y: 120
	};
	const foodInit = {
		x: 98,
		y: 64
	}
	const foodAmountInit = 100;

	let animationId = 0;
	let mode = 'start';
	let currentFood = 0;

	const snake = new Snake(snakeInit.x, snakeInit.y, ctx, canvasWidth, canvasHeight);
	const food = new Food(foodInit.x, foodInit.y, ctx, canvasWidth, canvasHeight);
	const foodContainer = createFood (foodAmountInit);


	listenForDirectionChange(snake, media);


	function game() {
		switch (mode) {
			case 'start':
				
				const startBtn = startMode();

				food.draw();
				snake.draw();

				startBtn.addEventListener('click', () => {
					mode = 'game';
					animationId = requestAnimationFrame(game);
				});
				break;
			case 'end':
				
				saveScore(currentFood);

				const endBtn = endMode(false);
				
				endBtn.addEventListener('click', () => {
					reset();

					animationId = requestAnimationFrame(game);
				});

				break;
			case 'win':
				
				const winBtn = endMode(true);
				
				winBtn.addEventListener('click', () => {
					reset();

					animationId = requestAnimationFrame(game);
				});

				break;
			case 'game':
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);

				food.draw();
				snake.draw();
				snake.move();
		
				if (snake.isCollisedWithFood(food.x, food.y, food.radius)) {
					foodContainer[currentFood].classList.add('eaten');
					currentFood++;

					if (currentFood === foodAmountInit) {
						mode = 'win';
					} else {
						food.setNewFood();
						snake.increazeSize();
					}
				}
				
				if (snake.isCoillisedWithBorder() || snake.isCollisedWithItself()) {
					mode = 'end';
				}


				animationId = requestAnimationFrame(game);
				break;
		}


		function reset() {
			mode = 'game';
			snake.reset(snakeInit.x, snakeInit.y);
			food.reset(foodInit.x, foodInit.y);
			currentFood = 0;
			resetFood(foodContainer);
		}
	}
	animationId = requestAnimationFrame(game);
});