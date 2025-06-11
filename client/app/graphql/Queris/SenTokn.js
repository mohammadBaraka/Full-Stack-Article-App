import { gql, useQuery } from "@apollo/client";

export const SEND_TOKEN = gql`
  query {
    SenTokn {
      id
      name
      img
    }
  }
`;

export const UseSenTokn = () => {
  const { data, error, loading } = useQuery(SEND_TOKEN);
  return { data, error, loading };
};
