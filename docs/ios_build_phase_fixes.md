# iOS Build Phase Fixes for Node Issues

This file documents the build phase script overrides applied manually in Xcode to ensure the correct Node version is used during builds. These are essential when using Node via NVM or custom paths, especially for Hermes, Codegen, and EXConstants scripts.

---

## ✅ Add to the top of each relevant Build Phase script:

```sh
export NODE_BINARY="/Users/tonus/.nvm/versions/node/v20.19.1/bin/node"
export PATH="/Users/tonus/.nvm/versions/node/v20.19.1/bin:$PATH"
```

---

### 📍 Affected Build Phases

You likely applied this to the following:

#### 1. `[CP-User] [Hermes] Replace Hermes for the right configuration, if needed`
```sh
export NODE_BINARY="/Users/tonus/.nvm/versions/node/v20.19.1/bin/node"
export PATH="/Users/tonus/.nvm/versions/node/v20.19.1/bin:$PATH"
...
"$NODE_BINARY" "$REACT_NATIVE_PATH/sdks/hermes-engine/utils/replace_hermes_version.js" -c "$CONFIG" -r "0.76.9" -p "$PODS_ROOT"
```

#### 2. `[CP-User] Generate Specs` (ReactCodegen)
```sh
export NODE_BINARY="/Users/tonus/.nvm/versions/node/v20.19.1/bin/node"
export PATH="/Users/tonus/.nvm/versions/node/v20.19.1/bin:$PATH"
...
/bin/sh -c "$WITH_ENVIRONMENT $SCRIPT_PHASES_SCRIPT"
```

#### 3. `[CP-User] Generate app.config for prebuilt Constants.manifest` (EXConstants)
```sh
export NODE_BINARY="/Users/tonus/.nvm/versions/node/v20.19.1/bin/node"
export PATH="/Users/tonus/.nvm/versions/node/v20.19.1/bin:$PATH"
...
# Rest of the original script follows
```

---

### 💡 Tip:
Keep this file in version control (`docs/ios_build_phase_fixes.md`) so you can reapply easily after upgrades or project regenerations.

