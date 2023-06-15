import { PaymentDraft, TransactionDraft } from "@commercetools/platform-sdk";
import { apiRoot } from "./client";

export const createPayment = async (paymentData: any) =>
    apiRoot
        .payments()
        .post({ body: createPaymentDraft(paymentData) })
        .execute()
        .then(payment =>
            apiRoot
                .payments()
                .withId({ ID: payment.body.id })
                .post({
                    body: {
                        actions: [
                            {
                                action: "addTransaction",
                                transaction: createTransactionDraft(paymentData)
                            },
                            {
                                action: "setStatusInterfaceCode",
                                interfaceCode: "SUCCESS"
                            },
                            {
                                action: "setStatusInterfaceText",
                                interfaceText: "We got the money"
                            }
                        ],
                        version: payment.body.version
                    }
                })
                .execute()
        );

const createPaymentDraft = (paymentData: any): PaymentDraft => {
    const {
        key,
        amountPlanned,
        pspName,
        pspMethod,
        interfaceId,
    } = paymentData;
    return {
        key,
        amountPlanned,
        paymentMethodInfo: {
            paymentInterface: pspName,
            method: pspMethod,
        },
        interfaceId
    };
};

const createTransactionDraft = (paymentData: any): TransactionDraft => {
    return {
        type: "Charge",
        amount: paymentData.amountPlanned,
        interactionId: paymentData.interactionId,
        state: "Initial",
        timestamp: new Date().toISOString()
    }
};