let tasks = [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build Project", completed: true },
];

// GET
export const getTasks = async () => {
    return new Promise((res) => setTimeout(() => res(tasks), 300));
};

// CREATE
export const addTask = async (title) => {
    const newTask = {
        id: Date.now(),
        title,
        completed: false,
    };
    tasks.push(newTask);
    return newTask;
};

// TOGGLE
export const toggleTask = async (id) => {
    tasks = tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    return tasks;
};

// DELETE
export const deleteTask = async (id) => {
    tasks = tasks.filter((t) => t.id !== id);
    return tasks;
};