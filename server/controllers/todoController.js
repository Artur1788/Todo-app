import Todo from '../schemas/todoSchema.js';
import User from '../schemas/userSchema.js';

// get all todos for authorized user
const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// add todo for the user
const setTodo = async (req, res, next) => {
  try {
    const { name, description, status } = req.body;

    if (!name || !description || !status) {
      throw new Error('please add all fields');
    }

    const todo = await Todo.create({
      name,
      description,
      status,
      user: req.user.id,
    });

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// update todo
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(400);
      throw new Error('Todo not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      res.status(400);
      throw new Error('Todo not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('Todo not found');
    }

    // Make sure the logged in user matches the todo user
    if (todo.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await Todo.deleteOne({ _id: todo._id });

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export { getTodos, setTodo, updateTodo, deleteTodo };
