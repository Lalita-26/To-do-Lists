import { useEffect, useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  // ✅ โหลดข้อมูลจาก localStorage เมื่อ component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("todoTasks");
    console.log("Stored tasks from localStorage:", storedTasks);  // Check localStorage content
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // ✅ บันทึก tasks ทุกครั้งที่ tasks เปลี่ยนแปลง
  useEffect(() => {
    console.log("Tasks updated:", tasks);  // Check tasks state
    if (tasks.length > 0) {
      localStorage.setItem("todoTasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setInput("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    // ✅ อัพเดตข้อมูลใน localStorage หลังจากลบ task
    localStorage.setItem("todoTasks", JSON.stringify(updatedTasks));
  };
  

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/src/assets/Cat-Night.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-lg w-full p-6 bg-[#fef6d7] shadow-xl rounded-2xl border-2 border-white">
        <h2 className="text-2xl font-extrabold text-center text-yellow-600 drop-shadow-md mb-5">
          To-Do List :3 🌙
        </h2>
        <div className="flex mb-5 space-x-2">
          <input
            type="text"
            className="flex-1 p-3 border border-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white/90 placeholder-gray-500 text-gray-800 font-medium"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            className="bg-white text-yellow-600 font-bold px-5 py-3 rounded-lg shadow-md hover:bg-yellow-50 transition duration-200"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-yellow-200"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-yellow-500 rounded focus:ring-yellow-300"
                />
                <span
                  className={
                    task.completed
                      ? "line-through text-yellow-400"
                      : "text-gray-700 font-medium"
                  }
                >
                  {task.text}
                </span>
              </div>
              <button
                className="text-red-500 hover:text-red-700 transition duration-200"
                onClick={() => deleteTask(task.id)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
