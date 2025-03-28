import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Container, ToDoList, Input, Button, ListItem, Trash, Check } from './styles.js';

function App() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState('');

  function inputMudou(event) {
    setTask(event.target.value);
  }

  function cliqueiNoBotao() {
    setList([...list, { id: uuid(), task: task, finished: false }]);
    setTask(''); // Limpar o campo de input após adicionar a tarefa
  }

  function finalizarTarefa(id) {
    const newList = list.map(item => 
      item.id === id ? { ...item, finished: !item.finished } : item
    );
    setList(newList);
  }

  function deletarItem(id) {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
  }

  return (
    <Container>
      <ToDoList>
        <Input onChange={inputMudou} value={task} placeholder="O que tenho para fazer..." />
        <Button onClick={cliqueiNoBotao}>Adicionar</Button>
        <ul>
          {list.length > 0 ? (
            list.map(item => (
              <ListItem isFinished={item.finished} key={item.id}>
                <Check onClick={() => finalizarTarefa(item.id)} />
                <li>{item.task}</li>
                <Trash onClick={() => deletarItem(item.id)} />
              </ListItem>
            ))
          ) : (
            <h3> Não há itens na lista </h3>
          )}
        </ul>
      </ToDoList>
    </Container>
  );
}

export default App;

