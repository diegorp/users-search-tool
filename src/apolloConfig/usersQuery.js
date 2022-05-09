import gql from 'graphql-tag';

export const USERS_QUERY = gql `
  query Users($q: String, $page: Int, $limit: Int) {
    users(options: { search: { q: $q }, slice: { start: $page, limit: $limit } }) {
      data {
        id
        name
        email
        phone
        company {
          name
          catchPhrase
        }
      },
      meta {
        totalCount
      }
    }
  }
`;