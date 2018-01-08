import * as angular from "angular";
import { IService } from "restangular";
import { Contact } from "./contact";
import { ContactApiConfig } from "./contact-constants";
import { RequestMessages } from "./contact-constants";
import { IResponseError, IGetResponse, IGetListResponse } from "../../shared/response-utils";

export class ContactService {
    constructor(private contactApiService: IService) {
        
    }

    public fetchOne = (id: number): Promise<Contact> => {
        return this.contactApiService.one(ContactApiConfig.CONTACT_NAMESPACE, id).get()
        .then((response: IGetResponse<Contact>) => {
            return response.data;
        }).catch((error: IResponseError) => {
            switch(error.status) {
                case -1: throw new Error(RequestMessages.NO_INTERNET_CONNECTION);
                case 404: throw new Error(RequestMessages.NOT_FOUND);
                case 400: throw error.data;
            }
        });
        
    }

    public fetchAll = (): Promise<Contact[]> => {
        return this.contactApiService
            .one(ContactApiConfig.CONTACT_NAMESPACE)
            .get()
            .then((response: IGetListResponse<Contact>) => {
                return response.data.objects;
            });
    }

    public create = (contact: Contact): Promise<any> => {
        return this.contactApiService
            .one(ContactApiConfig.CONTACT_NAMESPACE)
            .post(contact)
            .catch((errors: any) => {

            });
    }

    public update = (contact: Contact) => {
        return this.contactApiService
            .one(ContactApiConfig.CONTACT_NAMESPACE, contact.id)
            .patch(contact)
            .catch((errors: any) => {

            });
    }

    public delete = (contact: Contact) => {
        return this.contactApiService
            .one(ContactApiConfig.CONTACT_NAMESPACE, contact.id)
            .remove()
            .catch((errors: any) => {

            });
    }
}

angular.module("appModule").service("contactService", ContactService);