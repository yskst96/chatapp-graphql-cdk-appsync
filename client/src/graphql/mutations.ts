export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: MessageInput!) {
    createMessage(input: $input) {
      id
      content
      owner
      createdAt
      roomId
    }
  }
`;
