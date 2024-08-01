use wasm_bindgen::prelude::*;
use std::fmt;

#[wasm_bindgen]
#[derive(Clone, Copy, PartialEq, Debug)]
pub struct Position {
	x: i32;
	y: i32;
}

#[wasm_bindgen]
impl Position {
	#[wasm_bindgen(getter)]
	pub fn x(&self) -> i32 {
		self.x
	}
	
	#[wasm_bindgen]
	pub fn y(&self) -> i32 {
		self.y
	}

	pub fn new(x: i32, y: i32) -> Position {
		Position { x, y }
	}
}

impl fmt:Display for Position {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "({}, {})", self.x, self.y)
	}
}
