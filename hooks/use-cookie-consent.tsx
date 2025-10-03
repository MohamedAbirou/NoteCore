import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CookieConsentStore {
  hasConsent: boolean | null;
  showBanner: boolean;
  acceptCookies: () => void;
  declineCookies: () => void;
}

export const useCookieConsent = create<CookieConsentStore>()(
  persist(
    (set) => ({
      hasConsent: null,
      showBanner: true,
      acceptCookies: () => {
        set({ hasConsent: true, showBanner: false });
      },
      declineCookies: () => {
        set({ hasConsent: false, showBanner: false });
      },
    }),
    {
      name: 'cookie-consent',
      onRehydrateStorage: () => (state) => {
        if (state && state.hasConsent !== null) {
          state.showBanner = false;
        }
      },
    }
  )
);
