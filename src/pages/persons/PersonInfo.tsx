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

export const PersonInfo = () => {
  const [modal, setShowModal] = useState<boolean>(false);
  // const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const persons = useLoaderData() as Person[];
  const handleDelete = async (id: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/person/delete?id=${id}`,
      { method: "DELETE" }
    );
    if (!res.ok) {
      const { message } = await res.json();
      throw Error(`${message}`);
    }
  };

  if (!persons) {
    return <div>Loading...</div>;
  }
  return (
    <div className="persons--list">
      {persons.length <= 0 ? (
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
          {persons.map((per, i) => (
            <div className="person--info" key={per._id}>
              <div className="buttons">
                <button
                  className="btn del--button"
                  onClick={() => {
                    handleDelete(per._id.toString());
                    setShowModal(true);
                  }}
                >
                  <img className="icon" src={trash} alt="Trash" />
                </button>
                {modal ? (
                  <Modal toggleModal={setShowModal} name={per.name}></Modal>
                ) : null}
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
  if (!res.ok) {
    throw Error(
      `There was a problem fetching the data from the server, please try again later.`
    );
  }
  const persons = z.custom<Person>();
  return persons.parse(res.json());
};
