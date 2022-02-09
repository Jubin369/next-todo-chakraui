import dbConnect from '../../utils/dbConnect';
import Todo from '../../models/Todo';
import nc from 'next-connect';



const handler = nc();

handler.get(async (req, res) => {
    
  await dbConnect();
  const todos = await Todo.find({});
  res.send(todos);
});

handler.post(async (req, res) => {
    await dbConnect();
    const todo = await Todo.create(req.body);

    res.status(201).json({ success: true, data: todo })
});

handler.delete(async (req, res) => {
    await dbConnect();
    let id = req.query.id;
    const deletedTodo= await Todo.deleteOne({ id: id });

    if (!deletedTodo) {
        return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: {} });
});

export default handler;
