import { useEffect, useState } from 'react'
import { Header } from './componentes/Header'
import { Tasks } from './componentes/Tasks'

const TODO_SAVED_TASKS_IGNITE_01 = "TODO_SAVED_TASKS_IGNITE_01"

export interface ITask{
    id: string;
    title: string;
    isCompleted: boolean;
}

function App() {
    const [tasks, setTasks] = useState<ITask[]>([
    ])

    function loadSavedTasks() {
       const saved = localStorage.getItem(TODO_SAVED_TASKS_IGNITE_01)
       if(saved) {
        setTasks(JSON.parse(saved))
       }
    }

    useEffect(() => loadSavedTasks(), [])

    function setTasksAndSave(newTasks: ITask[]): void {
        setTasks(newTasks)
        localStorage.setItem('TODO_SAVED_TASKS_IGNITE_01', JSON.stringify(newTasks))
    }

    function addTask(taskTitle: string) {
        setTasksAndSave([
            ...tasks,
            {   id: crypto.randomUUID(),
                title: taskTitle,
                isCompleted: false
            }
        ])
    }

    function deleteTaskByID(taskID: string) {
        const newTasks = tasks.filter(task => task.id !== taskID )
        setTasksAndSave(newTasks)
    }

    function toggleTaskCompletedById(taskId: string) {
        const newTasks = tasks.map((task) => {
            if(task.id === taskId) {
                return {
                    ...task,
                    isCompleted: !task.isCompleted,
                }
            }
            return task
        })
        setTasksAndSave(newTasks)
    }

    return (
    <>
       <Header onAddTask={addTask} />
       <Tasks tasks={tasks} onDelete={deleteTaskByID} onComplete={toggleTaskCompletedById}/>
    </>
    )
}
export default App
