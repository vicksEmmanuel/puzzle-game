import { GraphQLClient } from "graphql-request";
import { useCallback, useMemo } from "react";
import * as API from "../../modules/api/generated";

export function useGraphqlClient() {
  return useMemo(
    () =>
      new GraphQLClient(`https://worthy-bobcat-46.hasura.app/v1/graphql`, {
        fetch: (input: RequestInfo, info: RequestInit) => {
          const x = new URL("", input as string);
          return fetch(x as any, info);
        },
      }),
    []
  );
}

export interface Options {
  dontShowError?: boolean;
  overwriteToken?: string;
}

const getAuthHeader = (): Record<string, string> => {
  return {
    "x-hasura-admin-secret":
      "6VINCX0Q5Qqxyvb6JaFrzvtHzmOYs0ZFEIbdmvCSiIafBJ0Cvv6YSVQNAIWZZiPY",
  };
};

export function useGraphql() {
  const client = useGraphqlClient();

  // we allow to overwrite the token in case the state might not be updated, yet.
  return useCallback((options?: Options) => {
    const sdk = API.getSdk(client, async (action, name) => {
      console.debug("operation name", name);

      return action(getAuthHeader());
    });

    return {
      ...sdk,
    };
  }, []);
}
