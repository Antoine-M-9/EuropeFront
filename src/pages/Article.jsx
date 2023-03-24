import { useEffect, useState } from "react";

export const Article = () => {
  const [data, setData] = useState("");

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
    fetch(
      "http://localhost:1337/api/articles/1?populate[0]=medias.media&populate[1]=payss&populate[2]=sousthemes&populate[3]=commentaires&populate[4]=info_cle",
      {
        headers,
        method: "GET",
      }
    )
      .then(checkStatus)
      .then(parseJSON)
      .then(({ data }) => setData(data))
      .catch((error) => setError(error));
  }, []);
  return (
    <article className="App">
      <ul>
        <div className="">
          <li>{data.attributes?.titre}</li>
          <li>{data.attributes?.contenuCourt}</li>
          <li>{data.attributes?.like}</li>
          <li>{data.attributes?.payss?.data?.[0].attributes?.nom}</li>
          <li>
            {data.attributes?.sousthemes?.data.map((p) => {
              return <p key={p.id}>{p?.attributes?.nom}</p>;
            })}
          </li>
          <div>
            {data.attributes?.commentaires?.data.map((p, index) => {
              return (
                <div key={index}>
                  <p>
                    {new Date(p.attributes?.date).toLocaleString("fr-FR", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                    })}
                  </p>
                  <p>{p.attributes?.contenu}</p>
                  <p>
                    créé le :
                    {new Date(p.attributes?.createdAt).toLocaleString("fr-FR", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                    })}
                  </p>
                  <p>
                    mis à jour le :
                    {new Date(p.attributes?.updatedAt).toLocaleString("fr-FR", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                    })}
                  </p>
                  <p>
                    publié le :
                    {new Date(p.attributes?.publishedAt).toLocaleString(
                      "fr-FR",
                      {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                      }
                    )}
                  </p>
                  <p>{p.attributes?.nom}</p>
                </div>
              );
            })}
          </div>
          <li>
            {data.attributes?.medias?.data.map((p, index) => {
              console.log(
                `http//localhost:1337/${p?.attributes?.media?.data?.attributes?.url}`
              );
              return (
                <div className="test" key={index}>
                  <img
                    src={`http://localhost:1337${p?.attributes?.media?.data?.attributes?.url}`}
                    alt=""
                  />
                </div>
              );
            })}
          </li>
        </div>
      </ul>
    </article>
  );
};
