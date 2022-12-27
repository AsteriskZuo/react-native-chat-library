import type { ChatClient } from 'react-native-chat-sdk';
import {
  UIKitChatSdkContext,
  useChatSdkContext,
} from 'react-native-chat-uikit';

export class AppChatSdkContext extends UIKitChatSdkContext {
  autoLogin: boolean;
  constructor(params: { client: ChatClient; autoLogin: boolean }) {
    super(params.client);
    this.autoLogin = params.autoLogin;
  }
}

export function useAppChatSdkContext(): AppChatSdkContext {
  const sdk = useChatSdkContext() as AppChatSdkContext;
  if (!sdk) throw Error('IMSDKContext is not provided');
  return sdk;
}
