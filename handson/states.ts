import { ClientResponse, State, StateDraft } from "@commercetools/platform-sdk";
import { pocApiRoot } from "./client";

export const createNewState = (stateDraft: StateDraft): Promise<ClientResponse<State>> =>
    pocApiRoot
        .states()
        .post({
            body: stateDraft
        })
        .execute();

export const getStateByKey = (key: string): Promise<ClientResponse<State>> =>
    pocApiRoot
        .states()
        .withKey({ key })
        .get()
        .execute();

export const getStateById = (ID: string) =>
    pocApiRoot
        .states()
        .withId({ ID })
        .get()
        .execute();

export const addTransition = (stateKey: string, transitionStateKeys: Array<string>): Promise<ClientResponse<State>> =>
    getStateByKey(stateKey)
        .then(state => pocApiRoot
            .states()
            .withKey({ key: stateKey })
            .post({
                body: {
                    version: state.body.version,
                    actions: [{
                        action: "setTransitions",
                        transitions: transitionStateKeys.map(key => {
                            return {
                                typeId: "state",
                                key
                            }
                        })
                    }]
                }
            })
            .execute()
        );