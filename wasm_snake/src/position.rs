use wasm_bindgen::prelude::*;
use std::fmt;

#[wasm_bindgen]
#[derive(Clone, Copy, PartialEq, Debug)]
pub struct Position {
	pub x: i32,
	pub y: i32,
}

#[wasm_bindgen]
impl Position {
    pub fn new(x: i32, y: i32) -> Position {
        Position { x, y }
    }
}

impl fmt::Display for Position {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "({}, {})", self.x, self.y)
	}
}
