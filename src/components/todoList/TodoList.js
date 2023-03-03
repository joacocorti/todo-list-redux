import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
} from "../../redux/actions/todoActions";
import "../../styles/pagination.css";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const totalTodos = useSelector((state) => state.todos.totalTodos);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  console.log("totalTodos", (state) => state.todos);

  useEffect(() => {
    dispatch(getTodos(page, limit));
  }, [dispatch, page, limit]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  //Cambio de la cantidad de elementos a mostrar por página
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };
  //Función para agregar una nueva tarea
  const handleAddTodo = (event) => {
    event.preventDefault();
    dispatch(
      addTodo({
        title,
      })
    );
    setTitle("");
  };
  //   Función para editar una tarea
  const handleEditTodo = (event) => {
    event.preventDefault();
    dispatch(
      editTodo({
        id: editTodoId,
        title: title,
        completed: false,
      })
    );
    setTitle("");
    setEditMode(false);
  };

  // Función para eliminar una tarea
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  //Función para cambiar el estado de una tarea a completado o no completado:

  const handleToggleCompleted = (todo) => {
    dispatch(
      editTodo({
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
      })
    );
  };

  //   Renderizado de la lista de tareas y la paginación
  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <form onSubmit={editMode ? handleEditTodo : handleAddTodo}>
        <input
          type="text"
          className="add-todo-input"
          placeholder={editMode ? "Edit Todo" : "Add Todo..."}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button type="submit">{editMode ? "Acept Edit" : "Add"}</button>
        {editMode && (
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="todo-title">{todo.title}</td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleCompleted(todo)}
                />
              </td>
              <td>
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => {
                    setTitle(todo.title);
                    setEditMode(true);
                    setEditTodoId(todo.id);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <span className="items-per-page">Items per page:</span>
        <select
          className="selector-page"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      <div>
        <span className="total-todos">Total Todos: {totalTodos}</span>
        <div className="pagination">
          {Array.from({ length: Math.ceil(totalTodos / limit) }, (_, index) => (
            <li
              key={index}
              className={`page-item ${page === index + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(index + 1)}
            >
              <a className="page-link">{index + 1}</a>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
