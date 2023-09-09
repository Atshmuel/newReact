import { useState } from "react";
import { useLoaderData, Link, Outlet } from "react-router-dom";
import { z } from "zod";
import { Person } from "../../types/PersonTypes";
import error from "../../assets/icons/error.svg";
import info from "../../assets/icons/into person.svg";
import trash from "../../assets/icons/trash.png";
import update from "../../assets/icons/update.png";
import "../../styles/List.css";
import Modal from "../../components/Modal";
// import { PerName } from "../../interfaces/person";

export const PersonInfo = () => {
  const persons = useLoaderData() as Person[];
  const [allPersons, setPersons] = useState<Person[]>(persons);
  const initialModalStates = persons.map(() => false);
  const [modals, setModals] = useState<boolean[]>(initialModalStates);
  const [deletedPersonName, setDeletePersonName] = useState<string>();

  const openModal = (personIndex: number) => {
    const updatedModals = [...modals];
    updatedModals[personIndex] = true;
    setModals(updatedModals);
  };
  const closeModal = (personIndex: number) => {
    const updatedModals = [...modals];
    updatedModals[personIndex] = false;
    setModals(updatedModals);
  };
  const handleDelete = async (id: string, name: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/person/delete?id=${id}`,
      { method: "DELETE" }
    );
    if (!res.ok) {
      const { message } = await res.json();
      throw Error(`${message}`);
    }
    setDeletePersonName(name);
    setPersons((prevPersons) =>
      prevPersons.filter((person) => person._id !== id)
    );
  };

  if (!allPersons) {
    return <div>Loading...</div>;
  }
  return (
    <div className="persons--list">
      {allPersons.length <= 0 ? (
        <div className="no--persons">
          <img src={error} alt="Alert" className="icon error--icon" />
          <p>
            Sorry but there are no peresons existed currently,
            <br /> please create some by clicking the create icon in the top
            right corner
          </p>
          <img src={error} alt="Alert" className="icon error--icon" />
        </div>
      ) : (
        <>
          {allPersons.map((per, i) => (
            <div className="person--info" key={per._id}>
              <div className="buttons">
                <button
                  className="btn del--button"
                  onClick={() => {
                    openModal(i);
                    handleDelete(per._id.toString(), per.name);
                  }}
                >
                  <img className="icon" src={trash} alt="Trash" />
                </button>

                <button
                  className="btn update--button"
                  onClick={() => {
                    // const upModals = [...updateModal];
                    // upModals[i] = true;
                    // setUpdateModal(upModals);
                  }}
                >
                  <img
                    className="icon update--icon"
                    src={update}
                    alt="Update"
                  />
                </button>
                {/* {updateModal[i] && (
                  <PersonUpdate
                    closeModal={() => {
                      const upModals = [...updateModal];
                      upModals[i] = false;
                      setUpdateModal(upModals);
                    }}
                    onPersonCreatedOrUpdate={handlePersonUpdated}
                    id={per._id}
                    name={per.name}
                  />
                )} */}

                <Link to={per._id.toString()}>
                  <button className="btn info--button">
                    <img className="icon info--icon" src={info} alt="Info" />
                  </button>
                </Link>
              </div>
              <h2 className="person--name">
                {i + 1 + `. `}Here are some info about{": "}
                <span className="name">
                  {per.name
                    .charAt(0)
                    .toLocaleUpperCase()
                    .concat(per.name.slice(1))}
                </span>
              </h2>
              <p className="person--age">
                {per.name
                  .charAt(0)
                  .toLocaleUpperCase()
                  .concat(per.name.slice(1))}{" "}
                is {per.age} year's old,
              </p>
              <p className="more--info">
                Want to know more info about{" "}
                {per.name
                  .charAt(0)
                  .toLocaleUpperCase()
                  .concat(per.name.slice(1))}
                ? then click on the person icon at the top right corner
              </p>
              {modals[i] ? (
                <Modal
                  toggleModal={() => closeModal(i)}
                  name={deletedPersonName}
                  type="delete"
                ></Modal>
              ) : null}
            </div>
          ))}
        </>
      )}
      <Outlet />
    </div>
  );
};

//loader fucntion + zod validation
export const personsLoader = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/person/showall`);
  console.log(res.ok);

  if (!res.ok) {
    throw new Error(
      `There was a problem fetching the data from the server, please try again later.`
    );
  }
  const persons = z.custom<Person>();
  return persons.parse(res.json());
};
