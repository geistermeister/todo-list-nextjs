"use client"
import { todo } from "@prisma/client"
import { TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from "next/navigation";

interface Props {
  todo: todo,
  toggleTodo: (id: string, complete: boolean) => void,
  deleteTodo: (id: string) => void
}

const Todo = ({ todo, toggleTodo, deleteTodo }: Props) => {
  const router = useRouter()

  const onToggle = (id: string, complete: boolean) => {
    toggleTodo(id, complete)
    router.refresh()
  }

  const onDelete = (id: string) => {
    deleteTodo(id)
    router.refresh()
  }

  return (
    <li className="flex items-center gap-5 todo py-3 px-5 rounded-lg">
      <input id={todo.id} type={'checkbox'} defaultChecked={todo.complete} onChange={(e) => onToggle(todo.id, e.target.checked)} className={"rounded cursor-pointer peer h-7"} />
      <label htmlFor={todo.id} className={'cursor-pointer select-none peer-checked:line-through peer-checked:opacity-80 flex flex-col'}>
        <span className={'text-lg'}>
          {todo.title}
        </span>
        <span className={'text-xs'}>
          {`Last changed on ${todo.updated.toLocaleString()}`}
        </span>
      </label>
      <TrashIcon className={"w-5 ml-auto cursor-pointer hover:stroke-red-500 hover:fill-white self-center shrink-0"} title="Delete Todo" onClick={() => onDelete(todo.id)} />
    </li>
  )
}

export default Todo