document.addEventListener("DOMContentLoaded", () => {
    const taskContainer = document.getElementById("task-container");
    const daysInMonth = 30;

    // Define custom tasks for each day (or repeat the same for simplicity)
    const defaultTasks = [
        ["Task 1: 15 Minutes of Exercise", "Task 2: Journaling", "Task 3: Meditate"]
    ];

    // Load saved tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem("monthlyTasks")) || {};

    // Generate tasks for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayTasks = savedTasks[day] || Array(defaultTasks[0].length).fill(false);
        const customTasks = defaultTasks[(day - 1) % defaultTasks.length]; // Cycle tasks if fewer than 30 are defined

        const dayDiv = document.createElement("div");
        dayDiv.className = "day";

        const title = document.createElement("h3");
        title.textContent = `Day ${day}`;
        dayDiv.appendChild(title);

        dayTasks.forEach((taskCompleted, taskIndex) => {
            const task = document.createElement("div");
            task.className = `task ${taskCompleted ? "completed" : ""}`;

            const label = document.createElement("label");
            label.textContent = customTasks[taskIndex] || `Task ${taskIndex + 1}`;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = taskCompleted;

            checkbox.addEventListener("change", () => {
                dayTasks[taskIndex] = checkbox.checked;
                task.classList.toggle("completed", checkbox.checked);

                savedTasks[day] = dayTasks;
                localStorage.setItem("monthlyTasks", JSON.stringify(savedTasks));
            });

            task.appendChild(label);
            task.appendChild(checkbox);
            dayDiv.appendChild(task);
        });

        taskContainer.appendChild(dayDiv);
    }
});
