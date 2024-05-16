import React, { useState } from "react";

function User({ user, handleDelete, handleComplete }) {
  return (
    <div className="box">
      <h3>{user.title}</h3><br />
      <p>{user.content}</p>
      <div className="btns">
        <button className="Del_btn" onClick={() => handleDelete(user.id)}>삭제하기</button>
        <button className="Comple_btn" onClick={() => handleComplete(user.id)}>완료</button>
      </div>
    </div>
  );
}

const App = () => {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showcard, setShowcard] = useState([]);
  const [completedCards, setCompletedCards] = useState([]);

  const addHandler = () => {
    const newUser = {
      id: users.length + 1,
      title: title,
      content: content,
    };

    setUsers([...users, newUser]);
    setTitle('');
    setContent('');
    setShowcard([...showcard, newUser]);
  };

  //삭제 버튼
  const deleteHandler = (id) => {
    const newUserList = users.filter((user) => user.id !== id);
    setUsers(newUserList);

    const newShowcardList = showcard.filter((card) => card.id !== id);
    setShowcard(newShowcardList);
  };

  //완료 버튼
  const completeHandler = (id) => {
    const completedCard = showcard.find((card) => card.id === id);
    setCompletedCards([...completedCards, completedCard]);
    const newShowcardList = showcard.filter((card) => card.id !== id);
    setShowcard(newShowcardList);
  };

  //완료하기 폼에서 삭제
  const deleteFromCompleted = (id) => {
    const newCompletedCards = completedCards.filter((card) => card.id !== id);
    setCompletedCards(newCompletedCards);
  };

  const handleDelete = (id) => {
    deleteHandler(id);
    deleteFromCompleted(id);
  };

  return (
    <div>
      <h1 className="Title">My ToDo List</h1>
      <div className="container">
        <input
          value={title}
          placeholder="제목을 입력해주세요"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          value={content}
          placeholder="내용을 입력해주세요"
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addHandler}>추가하기</button>
      </div>
      <div className="showcard">
        <b>오늘 할것</b>
        {showcard.map((card) => (
          <User user={card} key={card.id} handleDelete={handleDelete} handleComplete={completeHandler} />
        ))}
      </div>

      <div className="comple_container">
        <b>완료된것</b>
        {completedCards.map((card) => (
          <User user={card} key={card.id} handleDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
};

export default App;
