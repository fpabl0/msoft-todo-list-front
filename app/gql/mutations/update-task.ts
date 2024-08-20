import gql from "graphql-tag";


const updateTaskMutation = gql`
mutation UpdateTask($taskId: ID!, $description: String = "", $completed: Boolean) {
  taskUpdate(taskId: $taskId, input: {
    description: $description,
    completed: $completed,
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

export default updateTaskMutation;