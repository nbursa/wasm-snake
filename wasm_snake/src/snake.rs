use wasm_bindgen::prelude::*;
use js_sys;
use crate::position::Position;
use crate::direction::Direction;

#[wasm_bindgen]
pub struct Snake {
	body: Vec<Position>,
	direction: Direction,
	width: i32,
	height: i32,
	level: i32,
	foods: Vec<Position>,
}

#[wasm_bindgen]
impl Snake {
	pub fn new(width: i32, height: i32) -> Snake {
		let mut snake = Snake {
			body: vec![
				Position::new(2, 2),
				Position::new(2, 3),
				Position::new(2, 4),
			],
			direction: Direction::Right,
			width,
			height,
			level: 1,
			foods: Vec::new(),
		};
		snake.generate_foods();
		snake
	}

	fn generate_foods(&mut self) {
		self.foods.clear();
		for _ in 0..self.level {
			loop {
				let new_food = Position::new(
					(js_sys::Math::random() * self.width as f64) as i32,
					(js_sys::Math::random() * self.height as f64) as i32,
				);
				if !self.body.contains(&new_food) && !self.foods.contains(&new_food) {
					self.foods.push(new_food);
					break;
				}
			}
		}
	}

	pub fn change_direction(&mut self, direction: Direction) {
		if self.is_opposite_direction(direction) {
			return;
		}
		self.direction = direction;
	}

	fn is_opposite_direction(&self, direction: Direction) -> bool {
		match (self.direction, direction) {
			(Direction::Up, Direction::Down) |
			(Direction::Down, Direction::Up) |
			(Direction::Left, Direction::Right) |
			(Direction::Right, Direction::Left) => true,
			_ => false,
		}
	}

	pub fn update(&mut self) {
		let mut new_head = self.body[0].clone();

		if self.body.len() > 1 {
			let second_element = self.body[0].clone();
			if new_head == second_element {
				return;
			}
		}

		match self.direction {
			Direction::Up => new_head.y -= 1,
			Direction::Down => new_head.y += 1,
			Direction::Left => new_head.x -= 1,
			Direction::Right => new_head.x += 1,
		}

		if self.foods.contains(&new_head) {
			self.foods.retain(|&food| food != new_head);
			self.body.insert(0, new_head.clone());
			if self.foods.is_empty() {
				self.level += 1;
				self.generate_foods();
			}
		} else {
			self.body.insert(0, new_head);
			self.body.pop();
		}
	}

	pub fn render(&self) -> String {
		 let snake_body = self.body
		 	.iter()
			.map(|pos| pos.to_string())
			.collect::<Vec<String>>()
			.join(", ");
		let foods = self.foods
			.iter()
			.map(|pos| format!("food: {}", pos.to_string()))
			.collect::<Vec<String>>()
			.join(", ");
		format!("Snake [{}], Foods: [{}], Level: {}", snake_body, foods, self.level)
	}

	pub fn get_body(&self) -> Vec<Position> {
		self.body.clone()
	}

	pub fn get_foods(&self) -> Vec<Position> {
		self.foods.clone()
	}

	pub fn get_level(&self) -> i32 {
		self.level
	}

	pub fn get_direction(&self) -> Direction {
		self.direction
	}

	pub fn check_collision(&self) -> bool {
		let head = self.body[0];

		// Check for wall collisions
		if head.x < 0 || head.y < 0 || head.x >= self.width || head.y >= self.height {
			return true;
		}

		// Check for self collisions
		for part in &self.body[1..] {
			if head == *part {
				return true;
			}
		}

		false
	}
}
