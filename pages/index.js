import { Heading } from '@chakra-ui/react';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import { VStack, IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Home({todoss}) {

  const [todos, setTodos] = useState(
    () => {
        return todoss;
    }
  );

  async function deleteTodo(id) {

    try {
        const deleted = await fetch(`http://localhost:3000/api/todos?id=${id}`, {
            method: "Delete"
        });

    } catch (error) {
        console.log(error)
    }
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  }

  async function addTodo(todo) {
    setTodos([...todos, todo]);
    try {
        const res = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        })
    } catch (error) {
        console.log(error);
    }
  }

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack p={4}>
      <IconButton
        icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
        isRound='true'
        size='lg'
        alignSelf='flex-end'
        onClick={toggleColorMode}
      />
      <Heading
        mb='8'
        fontWeight='extrabold'
        size='2xl'
        bgGradient='linear(to-r, pink.500, pink.300, blue.500)'
        bgClip='text'
      >
        Todo Application
      </Heading>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      
    </VStack>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch(`http://localhost:3000/api/todos`);
  const data  = await res.json();
  
  return { todoss: data }
}


export default Home;