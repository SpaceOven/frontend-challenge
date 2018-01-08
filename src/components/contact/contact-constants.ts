import * as angular from "angular";

export enum ContactApiConfig {
    REST_URL = "http://api.pipz.io/v1",
    CONTACT_NAMESPACE = "contact",
    API_KEY = "a50ebd9fa5fae19f13890a",
    API_SECRET = "513c9cb9b73ccc76ad",
    AUTH_BASIC_PREFIX = "Basic "
}

export enum RequestMessages {    
    NO_INTERNET_CONNECTION = "The internet connection was lost. Please, review your network configuration and try again.",
    NOT_FOUND = "The contact you are looking for does not exist or is not available.",
}
export enum ContactViewMessages {
    CREATE_CONTACT = "New Contact",
    UPDATE_CONTACT = "Update Contact Information",
    CONTACT_NAME = "Name",
    CONTACT_EMAIL = "Email",
    CONTACT_TWITTER = "Twitter",
    CONTACT_PHONE = "Phone Number",
    UNKNOWN = "Unknown",
    CREATE = "New",
    DETAILS = "Details",
    DELETE = "Remove",
    SAVE = "Save",
    CANCEL = "Cancel",
}

export enum ContactValidationMessages {
    REQUIRED_FIELD = "This field is required.",
    INVALID_EMAIL = "Invalid email address.",
    INVALID_NAME = "The name must have at most 100 characters.",
}