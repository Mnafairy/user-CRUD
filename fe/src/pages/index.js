import { useState } from "react";
import { nanoid } from "nanoid";
export default function Home({ data }) {
  const BE_URL = "http://localhost:3001/add-user";
  const DELETE_URL = "http://localhost:3001/delete-user";
  const [use, setUse] = useState(data.users);
  const [user, setUser] = useState([]);
  const newid = nanoid();
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      age: e.target.age.value,
      id: newid,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const FETCHED_DATA = await fetch(BE_URL, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    setUser(FETCHED_JSON.users);
    setUse(FETCHED_JSON.users);
    console.log(FETCHED_JSON);
  }
  return (
    <div className="flex items-center justify-center">
      {/* <div>
        {use.map((e, index) => {
          return (
            <div key={index}>
              <h1>{e.username}</h1>
              <p>{e.age}</p>
            </div>
          );
        })}
      </div> */}
      <div className="w-[250px] p-4 bg-rose-400 rounded-lg text-xl">
        <div>
          {user.map((e, index) => {
            return (
              <div key={index}>
                <h1>{e.username}</h1>
                <p>{e.age}</p>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="username">
            Username:
            <input type="username" name="username" />
          </label>
          <label htmlFor="age">
            Age:
            <input type="text" name="age" />
          </label>
          <input
            type="submit"
            value="submit"
            className=" bg-white rounded-md w-[100px] m-auto cursor-pointer "
          />
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:3001/users");
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
