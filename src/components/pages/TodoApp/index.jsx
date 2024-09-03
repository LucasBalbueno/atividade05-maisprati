import { useState, useEffect } from 'react';

import { Container, Title, Input, Button, TaskList, TaskItem, EditInput } from './style'

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

useEffect(() => {
  fetchTasks();
}, []);

const fetchTasks = () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  setTasks(savedTasks);
};

const saveTasks = (updatedTasks) => {
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  setTasks(updatedTasks);
};

const addTask = () => {
  if (task) {
    const newTask = { id: Date.now(), text: task };
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    setTask('');
  }
};

const deleteTask = (id) => {
  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveTasks(updatedTasks);
};

const editTask = (id, text) => {
  setEditingTaskId(id);
  setEditingTaskText(text);
};

const updateTask = (id) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, text: editingTaskText } : task
  );
  saveTasks(updatedTasks);
  setEditingTaskId(null);
  setEditingTaskText('');
};

const cancelEdit = () => {
  setEditingTaskId(null);
  setEditingTaskText('');
};

const saveEdit = () => {
  if (editingTaskText.trim()) {
    updateTask(editingTaskId);
  } else {
    cancelEdit();
  }
};

return (
  <Container>
    <Title>Todo App</Title>
    <Input
      type="text"
      value={task}
      onChange={(e) => setTask(e.target.value)}
      placeholder="Add a new task"
    />
    <Button onClick={addTask}>Add Task</Button>
    <TaskList>
      {tasks.map((task) => (
        <TaskItem key={task.id}>
          {editingTaskId === task.id ? (
            <>
              <EditInput
                type="text"
                value={editingTaskText}
                onChange={(e) => setEditingTaskText(e.target.value)}
              />
              <Button onClick={saveEdit}>Save</Button>
              <Button onClick={cancelEdit}>Cancel</Button>
            </>
          ) : (
            <>
              {task.text}
              <div>
                <Button onClick={() => editTask(task.id, task.text)}>Edit</Button>
                <Button onClick={() => deleteTask(task.id)}>Delete</Button>
              </div>
            </>
          )}
        </TaskItem>
      ))}
    </TaskList>
  </Container>
);
};

export default TodoApp;