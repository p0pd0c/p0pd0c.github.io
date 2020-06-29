let snake1
let food
let resolution = 40
let w
let h

let captureKeyboard = false

let cnv
function setup() {
    cnv = createCanvas(400,400)
    cnv.mouseOver(toggleKeyListener)
    cnv.mouseOut(toggleKeyListener)
    snake1 = new Snake()
    w = floor(width / resolution)
    h = floor(height / resolution)
    foodLocation()
}

function draw() {
    frameRate(12)
    scale(resolution)
    background(127)
    snake1.show()

    if(snake1.endGame()) {
        print("Game Over!")
        background(255, 0, 0)
        noLoop()
        textSize(1)
        noStroke()
        text(`Final Score: ${snake1.score}`, floor(w/2) - floor(w/3), floor(h/2))

    }
    
    if(snake1.eat(food)) {
        foodLocation()
    }
    snake1.update()
    
    

    noStroke()
    fill(255, 0, 0)
    rect(food.x, food.y, 1, 1)
}

function foodLocation() {
    let x = floor(random(w))
    let y = floor(random(h))
    food = createVector(x, y)
}

function toggleKeyListener() {
    captureKeyboard = !captureKeyboard
}

function keyPressed({ keyCode, key }) {
    if(key === " ") {
        snake1.grow()
    } else if(captureKeyboard) {
        switch(keyCode) {
            case LEFT_ARROW:
                snake1.setDir(-1, 0)
                break
            case RIGHT_ARROW:
                snake1.setDir(1, 0)
                break
            case DOWN_ARROW:
                snake1.setDir(0, 1)
                break
            case UP_ARROW:
                snake1.setDir(0, -1)
                break
            case 65:
                snake1.setDir(-1, 0)
                break
            case 68:
                snake1.setDir(1, 0)
                break
            case 83:
                snake1.setDir(0, 1)
                break
            case 87:
                snake1.setDir(0, -1)
                break
            default:
                console.log(`${keyCode} is not a mapped key!`)
                snake1.setDir(0, 0)
        }
    }
    
}




class Snake {
    constructor() {
        this.len = 1
        this.body = []
        this.body[0] = createVector(floor(w/2), floor(h/2))
        this.xdir = 0
        this.ydir = 0
        this.score = 0
    }

    setDir(x, y) {
        this.xdir = x
        this.ydir = y
    }

    update() {
        // this.body[0].x += this.xdir
        // this.body[0].y += this.ydir
        
        let head = this.body[this.body.length - 1].copy()
        this.body.shift()
        head.x += this.xdir
        head.y += this.ydir
        this.body.push(head)
    }
    
    show() {
        fill(0)
        for(let i = 0; i < this.body.length; ++i) {
            rect(this.body[i].x, this.body[i].y, 1, 1)
        }
        
    }
    
    eat(pos) {
        let x = this.body[this.body.length - 1].x
        let y = this.body[this.body.length - 1].y
        
        if(x === pos.x && y === pos.y) {
            print("Food Eaten!")
            this.score++
            this.grow()
            return true
        }
    }
    
    grow() {
        let head = this.body[this.body.length - 1].copy()
        this.len++
        this.body.push(head)
    }

    endGame() {
        let head = this.body[this.body.length - 1].copy()
        if(head.x > w - 1 || head.x < 0 || head.y < 0 || head.y > h - 1) {
            return true
        }
        
        for(let i = 0; i < this.body.length - 1; ++i) {
            let part = this.body[i]
            if(part.x == head.x && part.y === head.y) {
                return true
            }
        }

        return false
    }

    
}
        