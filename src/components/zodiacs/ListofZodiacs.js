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

        if (response.ok) {
          const json = await response.json();
          console.log(json.data);
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
      {zodiacs.map(function (zodiac, index) {
        return <div><p>{zodiac.keywords}</p></div>;
        // return <div key={zodiac.id}><p>{zodiac.keywords}</p></div>;
      })}
    </>
  );
}

export default ListofZodiacs;
