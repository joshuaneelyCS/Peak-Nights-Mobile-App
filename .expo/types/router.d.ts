/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/editProfile`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/manageMemberships`; params?: Router.UnknownInputParams; } | { pathname: `/settings`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/login/login`; params?: Router.UnknownInputParams; } | { pathname: `/login/signUp`; params?: Router.UnknownInputParams; } | { pathname: `/login/welcome`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/learn`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/myPass`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/profile`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/scan`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/editProfile`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/manageMemberships`; params?: Router.UnknownOutputParams; } | { pathname: `/settings`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/login/login`; params?: Router.UnknownOutputParams; } | { pathname: `/login/signUp`; params?: Router.UnknownOutputParams; } | { pathname: `/login/welcome`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/learn`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/myPass`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/profile`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/scan`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/editProfile${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/manageMemberships${`?${string}` | `#${string}` | ''}` | `/settings${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/login/login${`?${string}` | `#${string}` | ''}` | `/login/signUp${`?${string}` | `#${string}` | ''}` | `/login/welcome${`?${string}` | `#${string}` | ''}` | `/tabs/learn${`?${string}` | `#${string}` | ''}` | `/tabs/myPass${`?${string}` | `#${string}` | ''}` | `/tabs/profile${`?${string}` | `#${string}` | ''}` | `/tabs/scan${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/editProfile`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/manageMemberships`; params?: Router.UnknownInputParams; } | { pathname: `/settings`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/login/login`; params?: Router.UnknownInputParams; } | { pathname: `/login/signUp`; params?: Router.UnknownInputParams; } | { pathname: `/login/welcome`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/learn`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/myPass`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/profile`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/scan`; params?: Router.UnknownInputParams; };
    }
  }
}
