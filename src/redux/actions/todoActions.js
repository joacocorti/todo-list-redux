import {
  GET_TODOS_SUCCESS,
  ADD_TODO_SUCCESS,
  EDIT_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
} from "./types";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

//Función asincrónica para obtener la lista de tareas desde la API
export const getTodos =
  (page = 1, limit = 5) =>
  async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}?_page=${page}&_limit=${limit}`);
      //Obtiene el total de tareas de la respuesta de la API
      const total = response.headers.get("x-total-count");
      //Obtiene la lista de tareas de la respuesta de la API
      const todos = await response.json();
      dispatch({
        type: GET_TODOS_SUCCESS,
        //Envía la lista de tareas y el total como payload a la acción
        payload: { todos, total },
      });
    } catch (error) {
      console.log(error);
    }
  };

//Función asincrónica para agregar una nueva tarea a la API
export const addTodo = (todo) => async (dispatch) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //Envía la tarea como objeto JSON en el cuerpo de la solicitud
      body: JSON.stringify(todo),
    });
    //Obtiene la nueva tarea creada de la respuesta
    const newTodo = await response.json();
    dispatch({
      type: ADD_TODO_SUCCESS,
      //Envía la nueva tarea creada como payload a la acción
      payload: newTodo,
    });
  } catch (error) {
    console.log(error);
  }
};

//Función asincrónica para editar una tarea existente en la API
export const editTodo = (todo) => async (dispatch) => {
  try {
    await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      //Envía la tarea editada como objeto JSON en el cuerpo de la solicitud
      body: JSON.stringify(todo),
    });
    dispatch({
      type: EDIT_TODO_SUCCESS,
      //Envía la tarea editada como payload a la acción EDIT_TODO_SUCCESS del reducer
      payload: todo,
    });
  } catch (error) {
    console.log(error);
  }
};

//Función asincrónica para eliminar una tarea de la API
export const deleteTodo = (id) => async (dispatch) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    dispatch({
      type: DELETE_TODO_SUCCESS,
      //Envía el ID de la tarea eliminada como payload a la acción
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
