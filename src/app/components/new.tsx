"use client"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation";

const NewTodo = ({ add }: { add: (title: string) => void }) => {
  const [title, setTitle] = useState("")
  const ref = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    ref.current && ref.current.focus()
  }, [])

  const createTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title !== "") {
      add(title)
      setTitle('')
      router.refresh()
      ref.current && ref.current.focus()
    }
  }

  return (
    <form className={"new-todo flex gap-10 w-full items-center rounded-b-lg py-5 px-10 mb-10"} onSubmit={createTodo}>
      <input ref={ref} value={title} placeholder={"Enter new todo"} onChange={(e) => setTitle(e.target.value)} className={"bg-transparent h-10 active:outline-none focus:outline-none border-b-2 border-white cursor-w w-full caret-white text-white"} />
      <button type={"submit"} className={"ml-auto bg-white py-2 px-4 rounded-lg"}>Add</button>
    </form>
  )
}

export default NewTodo