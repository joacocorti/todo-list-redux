import {
  GET_TODOS_SUCCESS,
  ADD_TODO_SUCCESS,
  EDIT_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
} from "../actions/types";

// Definimos el estado inicial del reducer
const initialState = {
  todos: [], // Arreglo donde almacenaremos los todos
  total: 0, // Número total de todos
  isLoading: false, // Indica si estamos cargando información
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      // Cuando recibimos todos los todos desde la API, actualizamos el estado
      return {
        ...state, // Mantenemos el resto de la información del estado
        todos: action.payload.todos, // Actualizamos el arreglo de todos
        totalTodos: action.payload.total, // Actualizamos el número total de todos
      };
    case ADD_TODO_SUCCESS:
      // Cuando agregamos un nuevo todo a la API, actualizamos el estado
      return {
        ...state, // Mantenemos el resto de la información del estado
        todos: [action.payload, ...state.todos], // Agregamos el nuevo todo al principio del arreglo de todos
        total: state.total + 1, // Aumentamos el número total de todos en 1
      };
    case EDIT_TODO_SUCCESS:
      // Cuando editamos un todo en la API, actualizamos el estado
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      return {
        ...state, // Mantenemos el resto de la información del estado
        todos: updatedTodos, // Reemplazamos el todo antiguo con el nuevo en el arreglo de todos
      };
    case DELETE_TODO_SUCCESS:
      // Cuando eliminamos un todo de la API, actualizamos el estado
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state, // Mantenemos el resto de la información del estado
        todos: filteredTodos, // Eliminamos el todo del arreglo de todos
        totalTodos: state.totalTodos - 1, // Disminuimos el número total de todos en 1
      };
    default:
      return state; // Si el action type no es uno de los que reconocemos, devolvemos el estado tal cual está
  }
}

export default todoReducer;
