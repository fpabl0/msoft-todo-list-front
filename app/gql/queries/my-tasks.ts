import gql from "graphql-tag";

const myTasksQuery = gql`
{
  currentUser {
    tasks {
      id
      description
      completed
    }
  }
}
`;

export default myTasksQuery;