import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>Welcome to React Router v7!</p>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
