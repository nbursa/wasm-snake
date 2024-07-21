use wasm_bindgen::prelude::*;

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

impl std::fmt::Display for Position {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

#[wasm_bindgen]
pub struct Snake {
    body: Vec<Position>,
    direction: Direction,
    width: i32,
    height: i32,
}

#[wasm_bindgen]
impl Snake {
    pub fn new(width: i32, height: i32) -> Snake {
        Snake {
            body: vec![
                Position::new(2, 2),
                Position::new(2, 3),
                Position::new(2, 4),
            ],
            direction: Direction::Right,
            width,
            height,
        }
    }

    pub fn change_direction(&mut self, direction: Direction) {
        self.direction = direction;
    }

    pub fn update(&mut self) {
        let mut new_head = self.body[0].clone();

        if self.body.len() > 1 {
            let second_element = self.body[1].clone();
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

        self.body.insert(0, new_head);        
        self.body.pop();
    }

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

#[wasm_bindgen]
#[derive(Clone, Copy, PartialEq, Debug)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}

