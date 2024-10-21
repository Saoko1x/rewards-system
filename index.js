import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { PortalHost } from "~/components/primitives/portal";

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./app");
  return (
    <ExpoRoot context={ctx}>
      <PortalHost />
    </ExpoRoot>
  );
}

registerRootComponent(App);
