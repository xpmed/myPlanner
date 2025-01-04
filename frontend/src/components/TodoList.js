import React, { useState } from 'react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [category, setCategory] = useState(null);

  const categories = [
    { value: 'obowiązki', label: 'Obowiązki' },
    { value: 'praca', label: 'Praca' },
    { value: 'odpoczynek', label: 'Odpoczynek' },
    { value: 'inne', label: 'Inne' },
  ];

  const addTask = () => {
    if (!task.trim()) {
      toast.error('Podaj nazwę zadania');
      return;
    }
    if (!category) {
      toast.error('Wybierz kategorię!');
      return;
    }

    setTasks([...tasks, { id: Date.now(), text: task, category: category.label, completed: false }]);
    setTask('');
    setCategory(null);
    toast.success('Dodano nowe zadanie!');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.info('Usunięto zadanie.');
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success('Zaktualizowano status zadania!');
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Lista zadań</h1>

      <div className="todo-input-section">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Dodaj zadanie"
          className="todo-input"
        />
        <Select
          options={categories}
          value={category}
          onChange={setCategory}
          placeholder="Wybierz kategorię"
          className="todo-select"
        />
        <button onClick={addTask} className="todo-add-button">
          <FaPlus />
        </button>
      </div>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <span className="activity-todo">{task.text} - <em>{task.category}</em></span>
            <div className="todo-actions">
              <button onClick={() => toggleComplete(task.id)} className="todo-complete-button">
                <FaCheck />
              </button>
              <button onClick={() => deleteTask(task.id)} className="todo-delete-button">
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default TodoList;
