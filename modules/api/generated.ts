import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: any;
};

/** game ids are stored here */
export type Game = {
  __typename?: 'Game';
  id: Scalars['uuid'];
  imageData: Scalars['String'];
  imagePreview?: Maybe<Scalars['String']>;
  level: Scalars['Int'];
};

/** aggregated selection of "Game" */
export type Game_Aggregate = {
  __typename?: 'Game_aggregate';
  aggregate?: Maybe<Game_Aggregate_Fields>;
  nodes: Array<Game>;
};

/** aggregate fields of "Game" */
export type Game_Aggregate_Fields = {
  __typename?: 'Game_aggregate_fields';
  avg?: Maybe<Game_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Game_Max_Fields>;
  min?: Maybe<Game_Min_Fields>;
  stddev?: Maybe<Game_Stddev_Fields>;
  stddev_pop?: Maybe<Game_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Game_Stddev_Samp_Fields>;
  sum?: Maybe<Game_Sum_Fields>;
  var_pop?: Maybe<Game_Var_Pop_Fields>;
  var_samp?: Maybe<Game_Var_Samp_Fields>;
  variance?: Maybe<Game_Variance_Fields>;
};


/** aggregate fields of "Game" */
export type Game_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Game_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Game_Avg_Fields = {
  __typename?: 'Game_avg_fields';
  level?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "Game". All fields are combined with a logical 'AND'. */
export type Game_Bool_Exp = {
  _and?: InputMaybe<Array<Game_Bool_Exp>>;
  _not?: InputMaybe<Game_Bool_Exp>;
  _or?: InputMaybe<Array<Game_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  imageData?: InputMaybe<String_Comparison_Exp>;
  imagePreview?: InputMaybe<String_Comparison_Exp>;
  level?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "Game" */
export enum Game_Constraint {
  /** unique or primary key constraint on columns "id" */
  GamePkey = 'Game_pkey'
}

/** input type for incrementing numeric columns in table "Game" */
export type Game_Inc_Input = {
  level?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "Game" */
export type Game_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  imageData?: InputMaybe<Scalars['String']>;
  imagePreview?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Game_Max_Fields = {
  __typename?: 'Game_max_fields';
  id?: Maybe<Scalars['uuid']>;
  imageData?: Maybe<Scalars['String']>;
  imagePreview?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Game_Min_Fields = {
  __typename?: 'Game_min_fields';
  id?: Maybe<Scalars['uuid']>;
  imageData?: Maybe<Scalars['String']>;
  imagePreview?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "Game" */
export type Game_Mutation_Response = {
  __typename?: 'Game_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Game>;
};

/** on_conflict condition type for table "Game" */
export type Game_On_Conflict = {
  constraint: Game_Constraint;
  update_columns?: Array<Game_Update_Column>;
  where?: InputMaybe<Game_Bool_Exp>;
};

/** Ordering options when selecting data from "Game". */
export type Game_Order_By = {
  id?: InputMaybe<Order_By>;
  imageData?: InputMaybe<Order_By>;
  imagePreview?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Game */
export type Game_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Game" */
export enum Game_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ImageData = 'imageData',
  /** column name */
  ImagePreview = 'imagePreview',
  /** column name */
  Level = 'level'
}

/** input type for updating data in table "Game" */
export type Game_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  imageData?: InputMaybe<Scalars['String']>;
  imagePreview?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Game_Stddev_Fields = {
  __typename?: 'Game_stddev_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Game_Stddev_Pop_Fields = {
  __typename?: 'Game_stddev_pop_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Game_Stddev_Samp_Fields = {
  __typename?: 'Game_stddev_samp_fields';
  level?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "Game" */
export type Game_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Game_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Game_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  imageData?: InputMaybe<Scalars['String']>;
  imagePreview?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Game_Sum_Fields = {
  __typename?: 'Game_sum_fields';
  level?: Maybe<Scalars['Int']>;
};

/** update columns of table "Game" */
export enum Game_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ImageData = 'imageData',
  /** column name */
  ImagePreview = 'imagePreview',
  /** column name */
  Level = 'level'
}

export type Game_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Game_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Game_Set_Input>;
  /** filter the rows which have to be updated */
  where: Game_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Game_Var_Pop_Fields = {
  __typename?: 'Game_var_pop_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Game_Var_Samp_Fields = {
  __typename?: 'Game_var_samp_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Game_Variance_Fields = {
  __typename?: 'Game_variance_fields';
  level?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "Game" */
  delete_Game?: Maybe<Game_Mutation_Response>;
  /** delete single row from the table: "Game" */
  delete_Game_by_pk?: Maybe<Game>;
  /** insert data into the table: "Game" */
  insert_Game?: Maybe<Game_Mutation_Response>;
  /** insert a single row into the table: "Game" */
  insert_Game_one?: Maybe<Game>;
  /** update data of the table: "Game" */
  update_Game?: Maybe<Game_Mutation_Response>;
  /** update single row of the table: "Game" */
  update_Game_by_pk?: Maybe<Game>;
  /** update multiples rows of table: "Game" */
  update_Game_many?: Maybe<Array<Maybe<Game_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_GameArgs = {
  where: Game_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Game_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_GameArgs = {
  objects: Array<Game_Insert_Input>;
  on_conflict?: InputMaybe<Game_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Game_OneArgs = {
  object: Game_Insert_Input;
  on_conflict?: InputMaybe<Game_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_GameArgs = {
  _inc?: InputMaybe<Game_Inc_Input>;
  _set?: InputMaybe<Game_Set_Input>;
  where: Game_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Game_By_PkArgs = {
  _inc?: InputMaybe<Game_Inc_Input>;
  _set?: InputMaybe<Game_Set_Input>;
  pk_columns: Game_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Game_ManyArgs = {
  updates: Array<Game_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Game" */
  Game: Array<Game>;
  /** fetch aggregated fields from the table: "Game" */
  Game_aggregate: Game_Aggregate;
  /** fetch data from the table: "Game" using primary key columns */
  Game_by_pk?: Maybe<Game>;
};


export type Query_RootGameArgs = {
  distinct_on?: InputMaybe<Array<Game_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Game_Order_By>>;
  where?: InputMaybe<Game_Bool_Exp>;
};


export type Query_RootGame_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Game_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Game_Order_By>>;
  where?: InputMaybe<Game_Bool_Exp>;
};


export type Query_RootGame_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Game" */
  Game: Array<Game>;
  /** fetch aggregated fields from the table: "Game" */
  Game_aggregate: Game_Aggregate;
  /** fetch data from the table: "Game" using primary key columns */
  Game_by_pk?: Maybe<Game>;
  /** fetch data from the table in a streaming manner: "Game" */
  Game_stream: Array<Game>;
};


export type Subscription_RootGameArgs = {
  distinct_on?: InputMaybe<Array<Game_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Game_Order_By>>;
  where?: InputMaybe<Game_Bool_Exp>;
};


export type Subscription_RootGame_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Game_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Game_Order_By>>;
  where?: InputMaybe<Game_Bool_Exp>;
};


export type Subscription_RootGame_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGame_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Game_Stream_Cursor_Input>>;
  where?: InputMaybe<Game_Bool_Exp>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type GameQueryVariables = Exact<{
  gameId?: InputMaybe<Uuid_Comparison_Exp>;
}>;


export type GameQuery = { __typename?: 'query_root', Game: Array<{ __typename?: 'Game', id: any, imageData: string, imagePreview?: string | null, level: number }> };

export type InsertOrUpdateGameMutationVariables = Exact<{
  game: Array<Game_Insert_Input> | Game_Insert_Input;
}>;


export type InsertOrUpdateGameMutation = { __typename?: 'mutation_root', insert_Game?: { __typename?: 'Game_mutation_response', returning: Array<{ __typename?: 'Game', id: any, imageData: string, imagePreview?: string | null, level: number }> } | null };

export type DeleteGameMutationVariables = Exact<{
  id?: InputMaybe<Uuid_Comparison_Exp>;
}>;


export type DeleteGameMutation = { __typename?: 'mutation_root', delete_Game?: { __typename?: 'Game_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'Game', id: any }> } | null };


export const GameDocument = gql`
    query Game($gameId: uuid_comparison_exp) {
  Game(where: {id: $gameId}) {
    id
    imageData
    imagePreview
    level
  }
}
    `;
export const InsertOrUpdateGameDocument = gql`
    mutation InsertOrUpdateGame($game: [Game_insert_input!]!) {
  insert_Game(
    objects: $game
    on_conflict: {constraint: Game_pkey, update_columns: [imageData, level]}
  ) {
    returning {
      id
      imageData
      imagePreview
      level
    }
  }
}
    `;
export const DeleteGameDocument = gql`
    mutation deleteGame($id: uuid_comparison_exp) {
  delete_Game(where: {id: $id}) {
    affected_rows
    returning {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Game(variables?: GameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GameQuery>(GameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Game', 'query');
    },
    InsertOrUpdateGame(variables: InsertOrUpdateGameMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertOrUpdateGameMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertOrUpdateGameMutation>(InsertOrUpdateGameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertOrUpdateGame', 'mutation');
    },
    deleteGame(variables?: DeleteGameMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteGameMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteGameMutation>(DeleteGameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteGame', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;