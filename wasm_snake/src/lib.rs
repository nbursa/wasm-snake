pub struct Position {
    x: i32,
    y: i32,
}

pub enum Direction {
    Up,
    Down,
    Left,
    Right
}

pub struct Snake {
    body: Vec<Position>,
    direction: Direction,
}

impl Snake {}

impl Position {}

mod tests {}

