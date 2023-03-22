import { useEffect, useState } from "react";

export const Article = () => {

    // Parses the JSON returned by a network request
    const parseJSON = (resp) => (resp.json ? resp.json() : resp);

    // Checks if a network request came back fine, and throws an error if not
    const checkStatus = (resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }

      return parseJSON(resp).then((resp) => {
        throw resp;
      });
    };

    const headers = { "Content-Type": "application/json" };

    useEffect(() => {
    fetch("http://localhost:1337/api/restaurants", {
        headers,
        method: "GET",
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(({ data }) => setRestaurants(data.data))
        .catch((error) => setError(error));
    }, []);

    if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
    }

    return (
    <div className="App">
        <ul>
        {restaurants.map(({ id, attributes }) => (
            <li key={id}>{attributes.name}</li>
        ))}
        </ul>
        <article>
            <h2>Titre</h2>
            <p></p>
        </article>
    </div>
    );
}