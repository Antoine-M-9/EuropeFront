import { Link } from "react-router-dom";

export const AppBar = () => {
          
    return (
      <>
        <ul>
          <li>
            <Link to={"/article"}>Article</Link>
          </li>
        </ul>
      </>
    );
}