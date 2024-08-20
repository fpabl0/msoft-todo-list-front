import gql from "graphql-tag";


const createTaskMutation = gql`
mutation CreateTask($description: String!) {
  taskCreate(input: {
    description: $description
  }) {
    task {
      id
      description
      completed
    }
    error {
      code
      message
    }
  }
}
`;

export default createTaskMutation;