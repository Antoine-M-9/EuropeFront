import { Link } from "react-router-dom";

export const AppBar = () => {
          
    return (
      <>
        <ul>
          <li>
            <Link to={"/Article"}>Article</Link>
          </li>
          <li>
            <Link to={"/Quiz"}>Wesh</Link>
          </li>
          <li>
            <Link to={"/Article"}>News</Link>
          </li>
          <li>
            <Link to={"/Article"}>News</Link>
          </li>
        </ul>
      </>
    );
}