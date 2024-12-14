import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import React, {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

// pages/TodoPage.jsx
const TodoPage = () => {
  const [todos, setTodos] = useState([]); //All todo Array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("add"); // 'view', 'add', 'edit'
  const [currentTodo, setCurrentTodo] = useState(null); //Selected to array

  //* For User Authn
  const navigate = useNavigate();

  //* edit button functionality
  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setMode("edit");
  };
  
  //* cancel button functionality
  const handleCancel = () => {
    setMode("view");
    setCurrentTodo(null);
    setError(null);
  };

  // if (isLoading) {
  //   return <div className="text-center mt-8">Loading...</div>;
  // }

  // if (error) {
  //   return (
  //     <div className="text-center mt-8 text-red-500">
  //       Error: {error}
  //       <button onClick={fetchTodos} className="ml-4 text-blue-500 underline">
  //         Retry
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <>
      {mode === "view" ? (
        <div className="w-3/4 mx-auto grid">
          <TodoList
            todos={todos}
          />
          <button
            onClick={() => setMode("add")}
            className="bg-[#6C63FF] text-[#F7F7F7] rounded-sm justify-self-end py-2 px-4 text-2xl box-content mt-4 max-w-6"
          >
            +
          </button>
        </div>
      ) : (
        <TodoForm
          // onSubmit={mode === "add" ? handleAddTodo : handleUpdateTodo}
          initialValue={currentTodo?.title || ""}
          mode={mode}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default TodoPage;
