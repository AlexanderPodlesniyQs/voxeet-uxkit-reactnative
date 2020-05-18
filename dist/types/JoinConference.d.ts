export declare enum UserType {
    USER = "user",
    LISTENER = "listener"
}
export interface JoinUserInfo {
    type?: UserType;
}
export default interface JoinOptions {
    user?: JoinUserInfo;
}
export interface JoinConferenceUser {
    conferenceStatus: string;
    externalId: string | undefined;
    name: string;
    userId: string | undefined;
}
export interface JoinConferenceResult {
    conferenceAlias: string;
    conferenceId: string;
    conferenceUsers: JoinConferenceUser[];
}
