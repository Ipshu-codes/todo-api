const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

let todos =[
    {id: 1, title:"Learn Node.js", complete: false},
    {id:2, title:"Practice REST APIs", complete: false }
];
let nextId = 3;
app.get("/api/todos", (req,res)=> {
    res.json(todos);
});

app.post("/api/todos", (req,res) => {
    const {title} = req.body;
    if(!title||!title.trim()){
            return res.status(400).json({message: "Title is required"})
    }
    const newTodo ={
        id: nextId++,
        title: title.trim(),
        complete: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
})

app.put("/api/todos/:id", (req,res)=> {
    const todo = todos.find(
        (todo) => todo.id === Number(req.params.id)

    );
    if(!todo) {
        return res.status(404).json({message:"Todo not found"});
    }
    const {title, complete} = req.body;

    if(title !== undefined) {
        if(typeof title !== "string" || !title.trim()){
            return res.status(400).json({message: "Invalid title"});
        }
        todo.title = title.trim();
    }
    if(complete !== undefined ){
        if(typeof complete !== "boolean" ) {
            return res.status(400).json({message: "Invalid complete value"});
        }
        todo.complete = complete;
    }
    res.json(todo);
});


app.patch("/api/todos/:id", (req, res) => {
    const todo = todos.find(
        (todo) => todo.id === Number(req.params.id)
    );

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    const { title, complete } = req.body;

    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ message: "Invalid title" });
        }

        todo.title = title.trim();
    }

    if (complete !== undefined) {
        if (typeof complete !== "boolean") {
            return res.status(400).json({ message: "Invalid complete value" });
        }

        todo.complete = complete;
    }

    res.json(todo);
});


app.delete("/api/todos/:id", (req,res) => {
    const todo = todos.find(
        (todo)=> todo.id === Number(req.params.id)
    );
    if(!todo) {
        return res.status(404).json({message: "Todo not found"});
    }
    todos = todos.filter(
        (todo)=> todo.id !== Number(req.params.id)
    );
    res.json({message: "Todo deleted sucessfully!"});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

