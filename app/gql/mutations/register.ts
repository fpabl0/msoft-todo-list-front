import gql from 'graphql-tag';

const registerMutation = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    userCreate(input: { name: $name, email: $email, password: $password }) {
      error {
        code
        message
      }
    }
  }
`;

export default registerMutation;
