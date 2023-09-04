import mongoose from 'mongoose';

// have to be changed from this to ReactFlow Node interface

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description value'],
    },
    status: {
      type: String,
      required: [true, 'Please add a status value'],
    },
  },

  {
    timestamp: true,
  }
);

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
