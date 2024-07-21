use wasm_bindgen::prelude::*;

// Represents a position on the game board
#[wasm_bindgen]
#[derive(Clone, Copy, PartialEq, Debug)]
pub struct Position {
    x: i32,
    y: i32,
}

#[wasm_bindgen]
impl Position {
    pub fn new(x: i32, y: i32) -> Position {
        Position { x, y }
    }
}

// Implement the Display trait to print the position
impl std::fmt::Display for Position {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

// The Snake struct will represent snake in the game
#[wasm_bindgen]
pub struct Snake {
    body: Vec<Position>,    // Vector of positions that make up the snake's body
    direction: Direction,   // The direction the snake is moving
}

// Methods for the Snake struct
#[wasm_bindgen]
impl Snake {
    pub fn new() -> Snake {
        Snake {
            body: vec![
                Position::new(2, 2),
                Position::new(2, 3),
                Position::new(2, 4),
            ],
            direction: Direction::Right,
        }
    }

    pub fn change_direction(&mut self, direction: Direction) {
        self.direction = direction;
    }

    // Update the snake's position
    pub fn update(&mut self) {
        let mut new_head = self.body[0].clone();
        match self.direction {
            Direction::Up => new_head.y -= 1,
            Direction::Down => new_head.y += 1,
            Direction::Left => new_head.x -= 1,
            Direction::Right => new_head.x += 1,
        }
        self.body.insert(0, new_head); // Add new head to the front
        self.body.pop(); // Remove the last part to simulate movement
    }

    // Method to render the snake's body as a string
    pub fn render(&self) -> String {
        self.body
            .iter()
            .map(|pos| pos.to_string())
            .collect::<Vec<String>>()
            .join(", ")
    }

    pub fn get_body(&self) -> Vec<Position> {
        self.body.clone()
    }

    pub fn get_direction(&self) -> Direction {
        self.direction
    }
}

// Represents the possible directions the snake can move
#[wasm_bindgen]
#[derive(Clone, Copy, PartialEq, Debug)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}

