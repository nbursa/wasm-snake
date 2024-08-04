use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy, PartialEq, Debug)]
pub enum Direction {
	Up,
	Down,
	Left,
	Right,
}
