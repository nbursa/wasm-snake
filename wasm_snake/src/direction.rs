use wasm_bindgen::preude::*;

#[wasm_bingen]
#[derive(Clone, Copy, PartialEq, Debug)]
pub enum Direction {
	Up,
	Down,
	Left,
	Right,
}
