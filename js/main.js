import '../style/style.scss';

import Snake from './classes/snake';
import Food from './classes/food';

document.addEventListener('DOMContentLoaded', () => {
	
	const canvas = document.querySelector('.game');
	const ctx = canvas.getContext('2d'),
		 canvasWidth = canvas.width,
		 canvasHeight = canvas.height;
	let animationId;

	const snake = new Snake(98, 120, ctx);
	const food = new Food(98, 64, ctx, canvasWidth, canvasHeight);

	function game() {

		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	
		food.draw();
		snake.draw();

		snake.move();

		if (snake.isCollisedWithFood(food.x, food.y, food.radius)) {
			food.setNewFood();
			snake.increazeSize();
		}

		document.addEventListener('keydown', e => {
			switch (e.key) {
				case 'ArrowUp':
					if (snake.dir !== 'bot') {
						snake.changeDirection('top');
					}
					break;
				case 'ArrowDown':
					if (snake.dir !== 'top') {
						snake.changeDirection('bot');
					}
					break;
				case 'ArrowLeft':
					if (snake.dir !== 'right') {
						snake.changeDirection('left');
					}
					break;
				case 'ArrowRight':
					if (snake.dir !== 'left') {
						snake.changeDirection('right');
					}
					break;
			}
		});

		animationId = requestAnimationFrame(game);
	}
	animationId = requestAnimationFrame(game);
});