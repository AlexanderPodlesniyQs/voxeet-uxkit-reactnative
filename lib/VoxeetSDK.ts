import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import ConferenceUser from './types/ConferenceUser';
import CreateOptions, { CreateConferenceResult } from './types/CreateConference';
import JoinOptions, { JoinConferenceResult } from './types/JoinConference';

const { RNVoxeetConferencekit } = NativeModules;

export interface RefreshCallback {
  (): void;
};

export interface TokenRefreshCallback {
  (): Promise<string>
};

export default class _VoxeetSDK {
  public refreshAccessTokenCallback: RefreshCallback|null = null;


  public initialize(consumerKey: string, consumerSecret: string): Promise<boolean> {
      return RNVoxeetConferencekit.initialize(consumerKey, consumerSecret);
  }

  public initializeToken(accessToken: string|undefined, refreshToken: TokenRefreshCallback): Promise<boolean> {
    if(!this.refreshAccessTokenCallback) {
      this.refreshAccessTokenCallback = () => {
        refreshToken()
        .then(token => RNVoxeetConferencekit.onAccessTokenOk(token))
        .catch(err => {
          RNVoxeetConferencekit.onAccessTokenKo("Token retrieval error");
        });
      }
      const eventEmitter = Platform.OS == "android" ? DeviceEventEmitter : new NativeEventEmitter(RNVoxeetConferencekit);
      eventEmitter.addListener("refreshToken", (e: Event) => {
        this.refreshAccessTokenCallback && this.refreshAccessTokenCallback();
      });
    }

    return RNVoxeetConferencekit.initializeToken(accessToken);
  }

  public connect(userInfo: ConferenceUser): Promise<boolean> {
    return RNVoxeetConferencekit.connect(userInfo);
  }

  public disconnect(): Promise<boolean> {
    return RNVoxeetConferencekit.disconnect();
  }

  public create(options: CreateOptions): Promise<CreateConferenceResult> {
    return RNVoxeetConferencekit.create(options);
  }

  public join(conferenceId: string, options: JoinOptions = {}): Promise<JoinConferenceResult> {
    return RNVoxeetConferencekit.join(conferenceId, options);
  }

  public leave(): Promise<boolean> {
    return RNVoxeetConferencekit.leave();
  }

  public invite(conferenceId: string, participants: ConferenceUser[]): Promise<boolean> {
    return RNVoxeetConferencekit.invite(conferenceId, participants);
  }

  public sendBroadcastMessage(message: string): Promise<boolean> {
    return RNVoxeetConferencekit.sendBroadcastMessage(message);
  }

  public isTelecomMode(): Promise<boolean> {
    return RNVoxeetConferencekit.isTelecomMode();
  }

  public isAudio3DEnabled(): Promise<boolean> {
    return RNVoxeetConferencekit.isAudio3DEnabled();
  }

  public appearMaximized(enable: boolean): boolean {
    RNVoxeetConferencekit.appearMaximized(enable);
    return true;
  }

  public defaultBuiltInSpeaker(enable: boolean): boolean {
    RNVoxeetConferencekit.defaultBuiltInSpeaker(enable);
    return true;
  }

  public defaultVideo(enable: boolean): boolean {
    RNVoxeetConferencekit.defaultVideo(enable);
    return true;
  }

  /*
    *  Android methods
    */
  public screenAutoLock(activate: boolean) {
    if(Platform.OS == "android") {
      RNVoxeetConferencekit.screenAutoLock(activate);
    }
  }

  //deprecated
  public isUserLoggedIn(): Promise<boolean> {
    return RNVoxeetConferencekit.isUserLoggedIn();
  }

  public checkForAwaitingConference(): Promise<any> {
    if(Platform.OS != "android") return new Promise(r => r());

    return RNVoxeetConferencekit.checkForAwaitingConference();
  }

  /*
    *  Deprecated methods
    */

   public startConference(conferenceId: string, participants: Array<ConferenceUser>): Promise<any> {
    return RNVoxeetConferencekit.startConference(conferenceId, participants);
  }

  public stopConference(): Promise<any> {
    return RNVoxeetConferencekit.leave();
  }

  public openSession(userInfo: ConferenceUser): Promise<any> {
    return RNVoxeetConferencekit.connect(userInfo);
  }

  public closeSession(): Promise<any> {
    return RNVoxeetConferencekit.disconnect();
  }
}