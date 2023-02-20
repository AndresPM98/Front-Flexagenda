import React, { useEffect, useState } from "react";
import {
  getClients,
  filterByClient,
  getTurns,
  /* getTurnByName, */
  filterByDate,
  filterByHour,
  getProfClientsTurns,
  cleanDate,
} from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import "./Filters.css";

const Filters = ({ lastProfessional }) => {
  /* const [inputName, setInputName] = useState(""); */
  const [inputDate, setInputDate] = useState("");
  const dispatch = useDispatch();

  /* const allTurns = useSelector((state) => state.turnBackup); */
  const profDetail = useSelector((state) => state.profDetail);
  const hasTurn = useSelector((state) => state.hasTurn);
  const profClientsTurns = useSelector((state) => state.profClientsTurns);
  const profClientsTurnsBackup = useSelector(
    (state) => state.profClientsTurnsBackup
  );

  function handleFilterByClient(event) {
    event.preventDefault();
    setClient(event.target.value);

    dispatch(filterByClient(event.target.value));
  }

  useEffect(() => {
    // console.log(hasTurn); // primer render: CUANDO CAMBIE HASTURN
    if (!hasTurn) {
      setInputDate("");
      dispatch(cleanDate());
    }
  }, [hasTurn]);

  const [hour, setHour] = useState("Hours");
  const [client, setClient] = useState("Clients");

  /* function handleOnChangeName(e) {
    setInputName(e.target.value);
  } */
  function handleOnChangeDate(e) {
    e.preventDefault();
    setInputDate(e.target.value);
    dispatch(filterByDate(e.target.value));
  }
  /*   function handleOnClickDate(e) {
    e.preventDefault();
    dispatch(filterByDate(inputDate));
  }
 */
  /* function handleOnClickName(e){
    e.preventDefault()
    dispatch(getTurnByName(inputName))
} */

  function handleFilterByHour(event) {
    event.preventDefault();
    setHour(event.target.value);
    dispatch(filterByHour(event.target.value));
  }

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getProfClientsTurns(lastProfessional));
  }, []);

  const uniqueOptions = profClientsTurnsBackup
    .sort((a, b) => (a.client.name > b.client.name ? 1 : -1))
    .filter(
      (v, i, arr) => arr.findIndex((t) => t.client.name === v.client.name) === i
    );

  const uniqueHour = profClientsTurns
    .sort((a, b) => (a.hour > b.hour ? 1 : -1))
    .filter((v, i, arr) => arr.findIndex((t) => t.hour === v.hour) === i);

  /*  const handleKeyPressName = (event) => {
      if (event.key === "Enter") {
        handleOnClickName(event);
      }
    };
 */
  /* const handleKeyPressDate = (event) => {
      if (event.key === "Enter") {
        handleOnClickDate(event);
      }
    }; */

  const refreshHandler = () => {
    setHour("Hours");
    setClient("Clients");
    setInputDate("");
    dispatch(cleanDate());
    dispatch(filterByClient("Clients"));
  };

  return (
    <div className="filterContainer">
      {/*  <div>
        <button 
        onClick={handleOnClickName} className="ButtonSearch">Search</button>
        <input 
        onKeyPress={handleKeyPressName}
        type='text'
        value={inputName} 
        onChange={handleOnChangeName} 
        placeholder='Client...' 
        className="InputSearch">

        </input>
    </div> */}
      <div>
        <select
          value={client}
          onChange={(event) => handleFilterByClient(event)}
        >
          <option value="" hidden>
            {" "}
            Clients{" "}
          </option>
          {uniqueOptions.map((v) => (
            <option value={v.name} key={v.id}>
              {v.client.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div>
        <button onClick={handleOnClickDate} className="ButtonSearch">
          Search
        </button>
        <input
          onKeyPress={handleKeyPressDate}
          type="text"
          value={inputDate}
          onChange={handleOnChangeDate}
          placeholder="Date..."
          className="InputSearch"
        ></input>
      </div> */}
      <div>
        <input
          className="input"
          value={inputDate}
          type="date"
          onChange={handleOnChangeDate}
          name="date"
        />
      </div>
      <div>
        <select value={hour} onChange={(event) => handleFilterByHour(event)}>
          <option value="" hidden>
            {" "}
            Hours{" "}
          </option>
          {uniqueHour.map((v) => (
            <option value={v.hour} key={v.hour}>
              {v.hour}
            </option>
          ))}
        </select>
      </div>
      <div className="buttonContainer">
        <button className="inputReset" onClick={refreshHandler}>
          <iconify-icon
            icon="material-symbols:refresh"
            width="20"
          ></iconify-icon>
        </button>
      </div>
    </div>
  );
};

export default Filters;
