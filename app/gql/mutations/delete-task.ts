import gql from "graphql-tag";


const deleteTaskMutation = gql`
mutation DeleteTask($taskId: ID!) {
  taskDelete(taskId: $taskId) {
    error {
      code
      message
    }
  }
}
`;

export default deleteTaskMutation;