import { z } from "zod";
import { Group } from "../../types/Types";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPeopleGroup,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../../components/DeleteModal";
import UpdateModal from "../../components/UpdateModal";
import Update from "../../components/buttons/Update";

export const GroupsList = () => {
  const groups = useLoaderData() as Group[];
  const [groupName, setGroupName] = useState<string>();
  const [allGroups, setAllGroups] = useState<Group[]>(groups);

  const initStates = groups.map(() => false);
  const initTypes = groups.map(() => "");
  const [updated, setUpdated] = useState<boolean[]>(initStates);
  const [modals, setModals] = useState<boolean[]>(initStates);
  const [modalType, setModalType] = useState<string[]>(initTypes);

  const openModal = (groupIndex: number, type: string) => {
    const updatedModals = [...modals];
    const updateModalsType = [...modalType];
    updatedModals[groupIndex] = true;
    updateModalsType[groupIndex] = `${type}`;
    setModalType(updateModalsType);
    setModals(updatedModals);
  };
  const closeModal = (groupIndex: number) => {
    const updatedModals = [...modals];
    updatedModals[groupIndex] = false;
    setModals(updatedModals);
  };

  const updateGroup = (groupIndex: number) => {
    const updateGroupInfo = [...updated];
    updateGroupInfo[groupIndex] = true;
    setUpdated(updateGroupInfo);
  };
  const handleDelete = async (id: string, groupName: string) => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/group/delete?id=${id}`,
      { method: "DELETE" }
    );
    if (!res.ok) {
      const { message } = await res.json();
      throw Error(`${message}`);
    }
    setGroupName(groupName);
    setAllGroups((prevGroup) => prevGroup.filter((group) => group._id !== id));
  };

  const [groupInfo, setGroupInfo] = useState<Group | null>(null);
  const handleUpdate = async (group: Group) => {
    console.log("🚀 ~ file: GroupsList.tsx:61 ~ handleUpdate ~ group:", group);

    setGroupInfo(group);
  };
  useEffect(() => {
    updated.forEach(async (isUpdated) => {
      if (!isUpdated) {
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/group/showall`
      );
      if (!res.ok) {
        setAllGroups(allGroups);
      }
      setAllGroups(await res.json());
    });
  }, [updated]);
  if (!allGroups) {
    return <div>Loading...</div>;
  }

  return (
    <div className="groups--list">
      {allGroups.length <= 0 ? (
        <div className="no--groups">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size="3x"
            color="#000000"
          />
          <p>
            Sorry but there are no groups exists currently,
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
          {allGroups.map((group, i) => (
            <div className="person--info" key={group._id}>
              <div className="updated--note">{updated[i] && <Update />}</div>
              <div className="buttons">
                <button
                  className="btn del--button"
                  onClick={() => {
                    openModal(i, "delete");
                    handleDelete(group._id.toString(), group.groupName);
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
                    handleUpdate(group);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="xl"
                    color="#000001"
                    className="icon"
                  />
                </button>

                <Link to={group._id.toString()}>
                  <button className="btn info--button">
                    <FontAwesomeIcon
                      icon={faPeopleGroup}
                      size="xl"
                      color="#000000"
                      className="icon"
                    />
                  </button>
                </Link>
              </div>

              <h2 className="person--name">
                {i + 1 + `. `}Here are some info about group{": "}
                <span className="name">
                  {group.groupName
                    .charAt(0)
                    .toUpperCase()
                    .concat(group.groupName.slice(1))}
                </span>
              </h2>
              <p className="person--persons">
                {group.groupName
                  .charAt(0)
                  .toUpperCase()
                  .concat(group.groupName.slice(1))}{" "}
                has{" "}
                {group.persons.length === 0
                  ? "no"
                  : group.persons.length === 1
                  ? group.persons.length + " person"
                  : group.persons.length + " person's"}{" "}
                in it.
              </p>
              <p className="more--info">
                Want to know more info about{" "}
                {group.groupName
                  .charAt(0)
                  .toUpperCase()
                  .concat(group.groupName.slice(1))}
                ? then click on the group icon at the top right corner
              </p>

              {modals[i] && modalType[i] === "delete" ? (
                <DeleteModal
                  toggleModal={() => closeModal(i)}
                  name={groupName}
                  type="delete"
                ></DeleteModal>
              ) : modals[i] && modalType[i] === "update" ? (
                <UpdateModal
                  toggleModal={() => closeModal(i)}
                  toggleUpdated={() => updateGroup(i)}
                  type={allGroups[i]}
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

export const groupsLoader = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/group/showall`);
  if (!res.ok) {
    throw Error("error");
  }
  const groups = z.custom<Group>();
  return groups.parse(res.json());
};
