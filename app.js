// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('change', filterTodo)


// Functions

// Generate todo
function addTodo(e) {
    e.preventDefault()
    
    // Create todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    
    // Create li
    const todoLi = document.createElement('li')
    todoLi.innerText = todoInput.value

    // Save to local storage
    saveLocalTodos(todoInput.value)

    todoInput.value = ''
    todoLi.classList.add('todo-item')
    todoDiv.appendChild(todoLi)

    // Check mark button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    // Trash button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    // Append to the list
    todoList.appendChild(todoDiv)

}

// Check to delete
function deleteCheck(e) {
    const item = e.target
    

    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement
        // Animation
        todo.classList.add('fall')
        removeLocalTodo(todo)
        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
        
    }

    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle("complete")

        // Add or remove from completed
        if(todo.classList.contains('complete')) {
            // Add to list of completes
            let completes
            if(localStorage.getItem('completes') === null) {
                completes = []
            } else {
                // Add this complete
                completes = JSON.parse(localStorage.getItem('completes'))
                
            }
            completes.push(todo.children[0].innerText)

            // Save completes
            localStorage.setItem('completes', JSON.stringify(completes))
        } else {
            // Remove from list of completes
            let completes
            if(localStorage.getItem('completes') === null) {
                completes = []
            } else {
                completes = JSON.parse(localStorage.getItem('completes'))
                
            }

            const index = completes.indexOf(todo.children[0].innerText)
            completes.splice(index, 1)
            localStorage.setItem('completes', JSON.stringify(completes))
        }
    }
}


// Filter todo

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach((todo) => {
        switch(e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'complete':
                if(todo.classList.contains('complete')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case 'incomplete':
                if(!todo.classList.contains('complete')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            default:
                console.log('hacker! how dare you!')
        }
    })
    console.log(todos)
}

// Save todos to local storage

function saveLocalTodos(todo) {
    // Check if the todo already exists
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo) => {
        // Create todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        
        // Create li
        const todoLi = document.createElement('li')
        todoLi.innerText = todo
        
        todoLi.classList.add('todo-item')
        todoDiv.appendChild(todoLi)

        // Check mark button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        // Trash button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        // Check if it is a completed task
        let completes
        if(!(localStorage.getItem('completes') === null)) {
            completes = JSON.parse(localStorage.getItem('completes'))
            if(completes.indexOf(todo) !== -1) {
                todoDiv.classList.toggle('complete')
            }
        }

        // Append to the list
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodo(todo) {
    let todos
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.splice(todos.indexOf(todo.children[0].innerText), 1)
    localStorage.setItem('todos', JSON.stringify(todos))

    let completes
    if(!(localStorage.getItem('completes') === null)) {
        completes = JSON.parse(localStorage.getItem('completes'))

        const index = completes.indexOf(todo.children[0].innerText)
        completes.splice(index, 1)
        localStorage.setItem('completes', JSON.stringify(completes))
    }
}
