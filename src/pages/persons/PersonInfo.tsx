import { useEffect, useState } from "react";
import { useLoaderData, Link, Outlet } from "react-router-dom";
import { z } from "zod";
import { Person } from "../../types/PersonTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/List.css";
import DeleteModal from "../../components/DeleteModal";
import UpdateModal from "../../components/UpdateModal";
import {
  faPenToSquare,
  faPersonWalkingArrowRight,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Update from "../../components/buttons/Update";

export const PersonInfo = () => {
  //Bug with rendering the UI after updating
  //Should add schima's and interfaces and types
  const persons = useLoaderData() as Person[];
  const [allPersons, setPersons] = useState<Person[]>(persons);
  const [personName, setPersonName] = useState<string>();
  const [personInfo, setPersonInfo] = useState<{
    name: string;
    age: number;
    groups: string[];
    id: string;
  }>({
    name: "",
    age: 0,
    groups: [],
    id: "",
  });

  const initStates = persons.map(() => false);
  const initTypes = persons.map(() => "");

  const [updated, setUpdated] = useState<boolean[]>(initStates);
  const [modals, setModals] = useState<boolean[]>(initStates);
  const [modalType, setModalType] = useState<string[]>(initTypes);

  const openModal = (personIndex: number, type: string) => {
    const updatedModals = [...modals];
    const updateModalsType = [...modalType];
    updatedModals[personIndex] = true;
    updateModalsType[personIndex] = `${type}`;
    setModalType(updateModalsType);
    setModals(updatedModals);
  };
  const closeModal = (personIndex: number) => {
    const updatedModals = [...modals];
    updatedModals[personIndex] = false;
    setModals(updatedModals);
  };

  const updatePerson = (personIndex: number) => {
    const updatePersonInfo = [...updated];
    updatePersonInfo[personIndex] = true;
    setUpdated(updatePersonInfo);
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
    setPersonName(name);
    setPersons((prevPersons) =>
      prevPersons.filter((person) => person._id !== id)
    );
  };
  const handleUpdate = async (
    id: string,
    name: string,
    age: number,
    groups: string[]
  ) => {
    setPersonInfo({ id, groups, age, name });
  };

  useEffect(() => {
    updated.forEach(async (isUpdated, i) => {
      if (!isUpdated) {
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/person/showall`
      );
      setPersons(await res.json());
    });
  }, [updated]);

  if (!allPersons) {
    return <div>Loading...</div>;
  }
  return (
    <div className="persons--list">
      {allPersons.length <= 0 ? (
        <div className="no--persons">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size="3x"
            color="#000000"
          />
          <p>
            Sorry but there are no peresons existed currently,
            <br /> please create some by clicking the create icon in the top
            right corner
          </p>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size="3x"
            color="#000000"
          />{" "}
        </div>
      ) : (
        <>
          {allPersons.map((per, i) => (
            <div className="person--info" key={per._id}>
              <div className="updated--note">{updated[i] && <Update />}</div>
              <div className="buttons">
                <button
                  className="btn del--button"
                  onClick={() => {
                    openModal(i, "delete");
                    handleDelete(per._id.toString(), per.name);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="xl"
                    color="#000000"
                    className="icon"
                  />
                </button>

                <button
                  className="btn update--button"
                  onClick={() => {
                    openModal(i, "update");
                    handleUpdate(
                      per._id.toString(),
                      per.name,
                      per.age,
                      per.groups
                    );
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="xl"
                    color="#000001"
                    className="icon"
                  />
                </button>

                <Link to={per._id.toString()}>
                  <button className="btn info--button">
                    <FontAwesomeIcon
                      icon={faPersonWalkingArrowRight}
                      size="xl"
                      color="#000000"
                      className="icon"
                    />
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

              {modals[i] && modalType[i] === "delete" ? (
                <DeleteModal
                  toggleModal={() => closeModal(i)}
                  name={personName}
                  type="delete"
                ></DeleteModal>
              ) : modals[i] && modalType[i] === "update" ? (
                <UpdateModal
                  toggleModal={() => closeModal(i)}
                  toggleUpdated={() => updatePerson(i)}
                  name={personInfo.name}
                  age={personInfo.age}
                  groups={personInfo.groups}
                  id={personInfo.id}
                ></UpdateModal>
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

  if (!res.ok) {
    throw new Error(
      `There was a problem fetching the data from the server, please try again later.`
    );
  }
  const persons = z.custom<Person>();
  return persons.parse(res.json());
};
