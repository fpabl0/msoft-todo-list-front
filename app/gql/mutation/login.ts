import gql from "graphql-tag";

const loginMutation = gql`
mutation Login($email: String!, $password: String!) {
  userAccessTokenCreate(input: {
    email: $email,
    password: $password
  }) {
    userAccessToken
    error {
      code
      message
    }
  }
}
`;

export default loginMutation;