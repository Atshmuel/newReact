import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Search.css";
import { useState } from "react";
import { Person } from "../interfaces/person";
import { Group } from "../interfaces/group";
import Loader from "../components/Loader";
import Search from "../components/buttons/Search";

const SearchLayout = () => {
  const searchInput = document.getElementById("input");

  const [data, setData] = useState<(Person & Group) | null>();
  const [isPending, setIsPending] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("id");

  const handleSelect = (e: { target: { value: string } }) => {
    setData(null);
    setError(null);
    setIsPending(false);
    const val: string = e.target.value;
    val === "PerId"
      ? (setUrl("/person/search?id="), setSearchType("id"))
      : val === "PerName"
      ? (setUrl("/person/search?name="), setSearchType("name"))
      : val === "GroId"
      ? (setUrl("/group/search?id="), setSearchType("id"))
      : val === "GroName"
      ? (setUrl("/group/search?groupName="), setSearchType("name"))
      : (setUrl("/person/search/ingroup?name="), setSearchType("name"));
  };
  const handleBlur = () => {
    searchInput!.value = "";
  };
  const handleChange = (e: { target: { value: string } }) => {
    if (e.target.value.length <= 0) return;
    const searchValue: string = e.target.value.toLocaleLowerCase();
    if (searchType === "id" && searchValue.length !== 24) {
      return;
    }

    fetch(`${import.meta.env.VITE_SERVER_URL}${url}${searchValue}`)
      .then(async (res) => {
        if (!res.ok) {
          let { message }: { message: string | object } = await res.json();
          typeof message === "object"
            ? (message = message.value + ` dose not exists`)
            : (message = message);
          throw Error(`${message}`);
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setError(null);
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
        setIsPending(false);
        setData(null);
      });
  };

  return (
    <>
      {" "}
      <div className="search--page">
        <form onChange={handleChange}>
          <input
            id="input"
            type="text"
            placeholder="Type you query here..."
            className="search--input"
            autoComplete="off"
          />
          <Search />
        </form>
        <select
          name="options"
          id="search--option"
          onChange={(e) => {
            handleSelect(e), handleBlur();
          }}
          required
        >
          <option value="default" disabled selected>
            --Choose search method--
          </option>
          <option id="option--1" value="PerId">
            By Person ID
          </option>
          <option id="option--2" value="PerName">
            By Person Name
          </option>
          <option id="option--3" value="GroId">
            By Group Id
          </option>
          <option id="option--4" value="GroName">
            By Group Name
          </option>
          <option id="option--5" value="Groups in person">
            Person Groups
          </option>
        </select>
      </div>
      <div className="data">
        {error && <div>{`${error}`}</div>}
        {!error && isPending && <Loader />}
        {(url.includes("/person/search?id") ||
          url.includes("/person/search?name")) &&
          data && (
            <>
              <h2>Person</h2>
              <p>Name: {data?.name}</p>
              <p>Age: {data?.age}</p>
              <p>ID: {data?._id}</p>
              <p>
                Groups:{" "}
                {data.groups.map((group, i) =>
                  i !== data.groups.length - 1 ? group + ",\n" : group + "."
                )}
              </p>
            </>
          )}
        {(url.includes("/group/search?id") ||
          url.includes("/group/search?groupName")) &&
          data && (
            <>
              <h2>Group</h2>

              <p>Group name: {data?.groupName}</p>
              <p>
                Groups in the group:{" "}
                {data.persons.length === 0 ? (
                  "-"
                ) : (
                  <>
                    {data.persons.map((person, i) =>
                      i !== data.persons.length - 1
                        ? person + ",\n"
                        : person + "."
                    )}
                  </>
                )}
              </p>
              <p>
                Groups in the group:{" "}
                {data.groups.length === 0 ? (
                  "-"
                ) : (
                  <>
                    {data.groups.map((group, i) =>
                      i !== data.groups.length - 1 ? group + ",\n" : group + "."
                    )}
                  </>
                )}
              </p>
              <p>Groups ID: {data?._id}</p>
              <p>
                Father group:{" "}
                {data?.fathers.length === 0 ? "-" : data.fathers + "."}
              </p>
            </>
          )}
        {url.includes("ingroup") && data && (
          <>
            <h2>Person groups:</h2>
            <p>
              {`${data.name
                .charAt(0)
                .toUpperCase()
                .concat(data.name.slice(1))}`}{" "}
              groups:{" "}
              {data.groups.map((group, i) =>
                i !== data.groups.length - 1 ? group + ",\n" : group + "."
              )}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default SearchLayout;
