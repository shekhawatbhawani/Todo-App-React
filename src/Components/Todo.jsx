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

  function getCurrentDateTime() {
    const now = new Date();
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", 
      "October", "November", "December"
    ];
    
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const dayOfWeek = days[now.getDay()];  // Get day of the week (Sunday-Saturday)
    const day = now.getDate();  // Get the day of the month (1-31)
    const month = months[now.getMonth()];  // Get month (January-December)
    const year = now.getFullYear();  // Get full year (e.g., 2025)
    const ampm = hours >= 12 ? "PM" : "AM";
    
    // Convert 24-hour time to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Add leading zero to minutes if needed
    const strMinutes = minutes < 10 ? "0" + minutes : minutes;
    
    // Format time as 'hh:mm AM/PM'
    const time = `${hours}:${strMinutes} ${ampm}`;
    
    // Full formatted date and time string
    const formattedDateTime = `${dayOfWeek}, ${month} ${day}, ${year} at ${time}`;
    
    return formattedDateTime;
  }

  

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
            className="bg-gray-800 p-4 rounded-lg flex flex-col justify-between items-center gap-4"
          >
           <div className=" flex justify-evenly items-center gap-4 w-full">
           <span className="flex-1 p-2 text-lg">{e.data}</span>
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
           </div>
              {<p className="text-[12px]">{getCurrentDateTime()}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
