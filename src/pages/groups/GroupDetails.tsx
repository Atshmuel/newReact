import { useLoaderData, Link, LoaderFunction } from "react-router-dom";
import { ID, Group } from "../../types/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../../styles/PerAndGro.css";
export const GroupDetails = () => {
  const group = useLoaderData() as Group;
  const upperName = group.groupName
    .charAt(0)
    .toLocaleUpperCase()
    .concat(group.groupName.slice(1));
  return (
    <div className="group--modal">
      <div className="group--details">
        <Link to={"/groups/groupslist"}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="icon arror--left"
            color="#000000"
          />
        </Link>
        <h2 className="group--name">
          <span className="name"> {upperName}</span>
          's informaion page
        </h2>
        <p className="group--id">ID: {group._id}.</p>
        <p className="group--persons">
          Persons:
          {group.groups.length > 0 ? (
            <>
              {group.persons.map((person: string, i: number) => (
                <span className="groups--name">
                  {i < group.persons.length - 1
                    ? " " + person + ","
                    : " " + person + "."}
                </span>
              ))}
            </>
          ) : (
            <> {upperName} has no person's in it.</>
          )}
        </p>
        <p className="group--groups">
          Groups:
          {group.groups.length > 0 ? (
            <>
              {group.groups.map((gro: string, i: number) => (
                <span className="groups--name">
                  {i < group.groups.length - 1
                    ? " " + gro + ","
                    : " " + gro + "."}
                </span>
              ))}
            </>
          ) : (
            <> {upperName} has no sub group's in it.</>
          )}
        </p>
        <p className="group--father">
          Father:{" "}
          {group.fathers.length === 0 ? (
            <>{upperName} has not father </>
          ) : (
            group.fathers[0]
          )}
        </p>
      </div>
    </div>
  );
};

export const groupsInfoLoader: LoaderFunction = async ({ params }) => {
  const { id } = params as ID;
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/group/search?id=${id}`
  );
  if (!res.ok) {
    throw Error(
      `Could not find this group, please make sure to create her first`
    );
  }
  return res.json();
};
