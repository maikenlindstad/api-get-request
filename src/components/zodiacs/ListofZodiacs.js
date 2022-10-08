import React from "react";
import { useState, useEffect } from "react";
import { API } from "../../constants/api";

function ListofZodiacs() {
  const [zodiacs, setZodiacs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(API);
        console.log(response.url);

        if (response.ok) {
          const json = await response.json();
          console.log(json.data);
          console.log(json.data[0].attributes.keywords)
          setZodiacs(json.data);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured</div>;
  }

  return (
    <>
      {zodiacs.map(function (zodiac) {
        // I have tried many variations of the line below.
        return <div key={zodiac.id}><p>{zodiac.name}</p></div>;
      })}
    </>
  );
}

export default ListofZodiacs;
