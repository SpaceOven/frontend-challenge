import * as angular from "angular";
import { IService } from "restangular";
import { Contact } from "./contact";
import { AllowedContactFields, ContactApiConfig, RequestMessages } from "../../app-constants";
import { IResponseError, IGetResponse, IGetListResponse } from "../../shared/response-utils";
import { map, pick, remove } from "lodash";

export class ContactService {
    constructor(private contactApiService: IService) {
        
    }

    public fetchOne = (id: number): Promise<Contact> => {
        return this.contactApiService.one(ContactApiConfig.CONTACT_NAMESPACE, id).get()
        .then((response: IGetResponse<Contact>) => {
            return response.data;
        }, this.handleResponseError);
        
    }

    public fetchAll = (): Promise<Contact[]> => {
        return this.contactApiService
            .one(ContactApiConfig.CONTACT_NAMESPACE)
            .get()
            .then((response: IGetListResponse<Contact>) => {
                return map(response.data.objects, (contact: Contact) => {
                    return contact;
                });
            }, this.handleResponseError);
    }

    public create = (contact: Contact): Promise<any> => {
        return this.contactApiService
            .all(ContactApiConfig.CONTACT_NAMESPACE)
            .post(contact)
            .then(() => {}, this.handleResponseError);
    }

    public update = (contact: Contact) => {
        return this.contactApiService
            .one(ContactApiConfig.CONTACT_NAMESPACE, contact.id)
            .patch(this.filterAllowedFields(contact, false))
            .then(() => {}, this.handleResponseError);
    }

    public delete = (contact: Contact) => {
        return this.contactApiService
            .one(ContactApiConfig.CONTACT_NAMESPACE, contact.id)
            .remove()
            .then(() => {}, this.handleResponseError);
    }

    private filterAllowedFields = (contact: Contact, includeId = true): Contact => {
        const allowedFields = [
            AllowedContactFields.NAME,
            AllowedContactFields.EMAIL,
            AllowedContactFields.PHONE,
            AllowedContactFields.TWITTER,
        ];
        if (includeId) {
            allowedFields.push(AllowedContactFields.ID);
        }
        return pick(contact, allowedFields) as Contact;
    }

    private handleResponseError = (error: any) => {
        switch(error.status) {
            case -1: throw new Error(RequestMessages.NO_INTERNET_CONNECTION);
            case 404: throw new Error(RequestMessages.NOT_FOUND);
            case 400: throw error.data;
            default: throw new Error(RequestMessages.DEFAULT_ERROR);
        }
    }
}

angular.module("appModule").service("contactService", ContactService);