export const listRooms = /* GraphQL */ `
  query ListRooms($limit: Int) {
    listRooms(limit: $limit) {
      items {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
