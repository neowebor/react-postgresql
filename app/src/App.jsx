import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const Axios = axios.create({
    baseURL: "http://localhost:5000",
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await Axios.get("/").then((response) => {
      console.log("Запрос пошёл");
      setUsers(response.data);
    });
    console.log("Запрос пришёл");
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const sendData = async () => {
    if (!name || !email) {
      return;
    }
    const data = {
      name,
      email,
    };

    await Axios.post("/user", data);
    getUsers();
    setName("");
    setEmail("");
  };

  return (
    <Container>
      <Wrapper>
        <Input
          type="text"
          placeholder="Введите Имя"
          value={name}
          onChange={handleName}
        />
        <Input
          type="text"
          placeholder="Введите email"
          value={email}
          onChange={handleEmail}
        />
        <Button onClick={sendData}>Добавить пользователя</Button>
      </Wrapper>
      {users
        ? users.map((user) => (
            <div key={user.id}>
              {user.name} {user.email}
            </div>
          ))
        : null}
      {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table> */}
    </Container>
  );
};
const Container = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Input = styled.input`
  width: 100%;
  background-color: #fff;
  border: 2px solid #eee;
  border-radius: 20px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.4);
  margin-bottom: 15px;
  padding: 10px 20px;
`;

const Button = styled.button`
  width: fit-content;
  background-color: #fff;
  border: 2px solid #eee;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

export default App;
