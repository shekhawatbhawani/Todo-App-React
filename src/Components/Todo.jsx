import { useState } from "react";
import { useForm } from "react-hook-form";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let obj = { data: data.task };
    setTodos([...todos, obj]);
    reset();
  };
  return (
    <div className="w-[400px] m-16 bg-gray-100 p-5 rounded-2xl shadow-2xl font-extralight">
      <h1 className="text-center text-2xl font-extrabold">Todo App React</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Enter your task ..."
            {...register("task", { required: true })}
            className="w-[70%] p-2 rounded-md "
          />
          {errors.task && <p className="hidden">This is required</p>}
          <button
            type="submit"
            className="px-5 ml-4 bg-green-400 rounded-lg text-white font-bold"
          >
            Add
          </button>
        </div>
        <ul className="mt-10">
          {todos.map((e, index) => {
            return (
              <li
                key={index}
                className="bg-slate-200 rounded-lg p-3 flex justify-between gap-2 my-6"
              >
                <span>{e.data}</span>
                <button
                  className="bg-blue-400 px-3 py-1 rounded-lg text-gray-600 font-bold border-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    const spanRef = e.target.previousElementSibling;
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
                  complete
                </button>
                <button
                  className="bg-red-500 px-3 py-1 rounded-lg text-gray-600 font-bold border-none"
                  onClick={() => {
                    setTodos(todos.filter((element,i) => i !== index))
                  }}>
                
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
};
export default Todo;
