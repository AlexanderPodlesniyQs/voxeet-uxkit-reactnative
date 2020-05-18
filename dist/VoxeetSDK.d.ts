import ConferenceUser from './types/ConferenceUser';
import CreateOptions, { CreateConferenceResult } from './types/CreateConference';
import JoinOptions, { JoinConferenceResult } from './types/JoinConference';
export interface RefreshCallback {
    (): void;
}
export interface TokenRefreshCallback {
    (): Promise<string>;
}
export default class _VoxeetSDK {
    refreshAccessTokenCallback: RefreshCallback | null;
    initialize(consumerKey: string, consumerSecret: string): Promise<boolean>;
    initializeToken(accessToken: string | undefined, refreshToken: TokenRefreshCallback): Promise<boolean>;
    connect(userInfo: ConferenceUser): Promise<boolean>;
    disconnect(): Promise<boolean>;
    create(options: CreateOptions): Promise<CreateConferenceResult>;
    join(conferenceId: string, options?: JoinOptions): Promise<JoinConferenceResult>;
    leave(): Promise<boolean>;
    invite(conferenceId: string, participants: ConferenceUser[]): Promise<boolean>;
    sendBroadcastMessage(message: string): Promise<boolean>;
    isTelecomMode(): Promise<boolean>;
    isAudio3DEnabled(): Promise<boolean>;
    appearMaximized(enable: boolean): boolean;
    defaultBuiltInSpeaker(enable: boolean): boolean;
    defaultVideo(enable: boolean): boolean;
    screenAutoLock(activate: boolean): void;
    isUserLoggedIn(): Promise<boolean>;
    checkForAwaitingConference(): Promise<any>;
    startConference(conferenceId: string, participants: Array<ConferenceUser>): Promise<any>;
    stopConference(): Promise<any>;
    openSession(userInfo: ConferenceUser): Promise<any>;
    closeSession(): Promise<any>;
}
