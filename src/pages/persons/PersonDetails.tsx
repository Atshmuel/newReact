import {
  useLoaderData,
  useParams,
  Link,
  LoaderFunction,
} from "react-router-dom";
import goback from "../../assets/icons/goback.svg";
import "../../styles/Pesron.css";
import { ID, Person } from "../../types/PersonTypes";

export default function PersonDetails() {
  const { id } = useParams() as ID;
  const person = useLoaderData() as Person;
  return (
    <div className="person--modal">
      <div className="person--details">
        <Link to={"/persons/personinfo"}>
          <img src={goback} alt="Go back" className="icon back--icon" />
        </Link>
        <h2 className="person--name">
          <span className="name">
            {" "}
            {person.name
              .charAt(0)
              .toLocaleUpperCase()
              .concat(person.name.slice(1))}
          </span>
          's informaion page
        </h2>
        <p className="person--id">ID: {person._id}.</p>
        <p className="person--age">Age: {person.age}.</p>
        <p className="person--groups">
          Groups:
          {person.groups.length > 0 ? (
            <>
              {person.groups.map((group: string, i: number) => (
                <span className="groups--name">
                  {i < person.groups.length - 1
                    ? " " + group + ","
                    : " " + group + "."}
                </span>
              ))}
            </>
          ) : (
            <>
              {" "}
              {person.name
                .charAt(0)
                .toLocaleUpperCase()
                .concat(person.name.slice(1))}{" "}
              is no part of any group.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export const personDetailLoader: LoaderFunction = async ({ params }) => {
  const { id } = params as ID;
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/person/search?id=${id}`
  );
  if (!res.ok) {
    throw Error(
      `Could not find this person, please make sure to create him first`
    );
  }
  return res.json();
};
