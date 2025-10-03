"use client";

import { useEffect, useState } from 'react';
import { useCookieConsent } from '@/hooks/use-cookie-consent';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';

export const CookieConsentBanner = () => {
  const { hasConsent, showBanner, acceptCookies, declineCookies } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showBanner && hasConsent === null) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showBanner, hasConsent]);

  if (!showBanner || hasConsent !== null || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg">
          <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex-shrink-0 mt-1">
                <Cookie className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-sm">Cookie Consent</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies and analytics to improve your experience, analyze traffic, and optimize performance.
                  By accepting, you consent to our use of these technologies.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={declineCookies}
                className="flex-1 sm:flex-initial"
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={acceptCookies}
                className="flex-1 sm:flex-initial"
              >
                Accept All
              </Button>
            </div>

            <button
              onClick={declineCookies}
              className="absolute top-4 right-4 sm:hidden rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
