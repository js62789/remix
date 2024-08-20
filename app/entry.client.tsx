import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { createProvider as createClientProvider } from './i18n/client';

async function hydrate() {
  const I18Provider = await createClientProvider();

  startTransition(() => {
    hydrateRoot(
      document,
      <I18Provider>
        <StrictMode>
          <RemixBrowser />
        </StrictMode>
      </I18Provider>,
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
