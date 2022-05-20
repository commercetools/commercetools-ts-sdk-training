import { ClientResponse, State, StateDraft } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";

export const createNewState = (stateDraft: StateDraft): Promise<ClientResponse<State>> => {
    throw new Error("Function not implemented");
}

export const getStateByKey = (key: string): Promise<ClientResponse<State>> => {
    throw new Error("Function not implemented");
}

export const getStateById = (ID: string) =>
    apiRoot
        .states()
        .withId({ ID })
        .get()
        .execute();

export const addTransition = (stateKey: string, transitionStateKeys: Array<string>): Promise<ClientResponse<State>> => {
    throw new Error("Function not implemented");
}
