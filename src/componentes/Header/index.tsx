import { ChangeEvent, FormEvent, useState } from 'react'
import todoLogo from '../../assets/Logo.svg'
import styles from './header.module.css'
import { AiOutlinePlusCircle } from 'react-icons/ai'

interface Props{
    onAddTask: (taskTitle: string) => void
}

export function Header({onAddTask}: Props) {
    const [title, setTitle] = useState("")

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        onAddTask(title)
        setTitle("")
    }

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>){
        setTitle(event.target.value)
    }

    return (
        <header className={styles.header}>
            <img src={todoLogo} />

        <form className={styles.newTaskForm} onSubmit={handleSubmit}>
            <input placeholder="Adicione uma nova tarefa" onChange={onChangeTitle} value={title}/>
            <button>Criar <AiOutlinePlusCircle size={20}/></button>
        </form>

        </header>
    )
}