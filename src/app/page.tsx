import Link from 'next/link'
import { prisma } from './db'
import Todo from './components/todo'
import NewTodo from './components/new'
import { useRouter } from 'next/navigation';

const toggleTodo = async (id: string, complete: boolean) => {
  "use server"
  await prisma.todo.update({ where: { id }, data: { complete } })
}

const deletetodo = async (id: string) => {
  "use server"
  await prisma.todo.delete({ where: { id } })

}

const addTodo = async (title: string) => {
  "use server"
  await prisma.todo.create({ data: { title, complete: false } })
}

const Home = async () => {
  const todos = await prisma.todo.findMany()
  return (
    <div className={"todo-list w-full max-w-5xl h-full p-10 pt-0"}>
      <NewTodo add={addTodo} />
      <h1 className={"text-2xl font-semibold mb-2"}>Todos</h1>
      <ul className={"flex flex-col gap-4"}>
        {todos.map(todo => <Todo todo={todo} toggleTodo={toggleTodo} deleteTodo={deletetodo} />)}
      </ul>
    </div>
  )
}

export default Home