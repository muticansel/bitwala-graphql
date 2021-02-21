import "./App.css";
import LandingPage from "./components/LandingPage";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Spinner from './UI/Spinner';

const GET_BLOCKS = gql`
  query {
    getBlocks {
      hash
      time
      height
    }
  }
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Bitwala</p>
      </header>
      {/* <LandingPage /> */}
      <Query query={GET_BLOCKS}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <div>Error :(</div>;

          return <LandingPage data={data} />;
        }}
      </Query>
    </div>
  );
}

export default App;
