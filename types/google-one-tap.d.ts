export interface CredentialResponse {
  credential: string;
  select_by: string;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
            nonce?: string;
            use_fedcm_for_prompt?: boolean;
          }) => void;
          prompt: () => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type: "standard" | "icon";
              theme: "outline" | "filled_blue" | "filled_black";
              size: "large" | "medium" | "small";
              text: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape: "rectangular" | "pill" | "circle" | "square";
              logo_alignment: "left" | "center";
              width: string;
              locale: string;
            }
          ) => void;
        };
      };
    };
  }
}
