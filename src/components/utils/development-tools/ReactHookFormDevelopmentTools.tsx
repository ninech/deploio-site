import React from "react";

import { config } from "config";

export const ReactHookFormDevelopmentTools = config.PROD
  ? (): null => null
  : React.lazy(() =>
      import("@hookform/devtools").then((result) => ({
        default: result.DevTool,
      }))
    );
