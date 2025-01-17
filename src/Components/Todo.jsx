import { useState } from "react";
import { useForm } from "react-hook-form";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let obj = { data: data.task };
    setTodos([...todos, obj]);
    reset();
  };

  return (
    <div className="w-[90%] max-w-md mx-auto my-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-5 rounded-2xl shadow-2xl text-white font-light">
      <h1 className="text-center text-2xl font-extrabold mb-5">Todo App</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Enter your task ..."
            {...register("task", { required: true })}
            className="w-full p-3 rounded-lg focus:outline-none focus:ring focus:ring-green-400 bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-bold"
          >
            Add
          </button>
        </div>
        {errors.task && (
          <p className="text-red-500 text-sm mt-2">Task is required</p>
        )}
      </form>

      <ul className="mt-8 space-y-4">
        {todos.map((e, index) => (
          <li
            key={index}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center gap-4"
          >
            <span className="flex-1">{e.data}</span>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold"
              onClick={(event) => {
                event.preventDefault(); // Prevent input focus
                const spanRef = event.target.previousElementSibling;
                spanRef.style.color =
                  spanRef.style.color === "red" ? "" : "red";
                spanRef.style.textDecoration =
                  spanRef.style.textDecoration === "line-through"
                    ? ""
                    : "line-through";
                spanRef.style.fontWeight =
                  spanRef.style.fontWeight === "bold" ? "" : "bold";
              }}
            >
              Complete
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold"
              onClick={(event) => {
                event.preventDefault(); // Prevent input focus
                setTodos(todos.filter((_, i) => i !== index));
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
