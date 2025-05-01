#!/bin/bash

set -e

echo "🔧 Patching headers to include unsigned char traits..."

PATCHED_FILES=()

# List of HEADER files and their relative paths
FILES_AND_PATHS=(
  "ios/Pods/RCT-Folly/folly/Unicode.h:../../../../patches/unsigned_char_traits_patch.h"
  "ios/Pods/RCT-Folly/folly/Dynamic.h:../../../../patches/unsigned_char_traits_patch.h"
  "ios/Pods/RCT-Folly/folly/json_pointer.h:../../../../patches/unsigned_char_traits_patch.h"
  "ios/Pods/RCT-Folly/folly/json.h:../../../../patches/unsigned_char_traits_patch.h"
  "ios/Pods/RCT-Folly/folly/String.h:../../../../patches/unsigned_char_traits_patch.h"
  "ios/Pods/RCT-Folly/folly/detail/SplitStringSimd.h:../../../../patches/unsigned_char_traits_patch.h"
  "ios/Pods/RCT-Folly/folly/FileUtil.h:../../../../patches/unsigned_char_traits_patch.h"
  "ios/Pods/RCT-Folly/folly/container/detail/F14Table.h:../../../../patches/unsigned_char_traits_patch.h"
  "ios/Pods/RCT-Folly/folly/Format.h:../../../../patches/unsigned_char_traits_patch.h" 
  "ios/Pods/RCT-Folly/folly/Conv.h:../../../../patches/unsigned_char_traits_patch.h"
  "node_modules/react-native/ReactCommon/react/renderer/debug/DebugStringConvertible.h:../../../patches/unsigned_char_traits_patch.h"
)

patch_header_if_needed() {
  local file_path="$1"
  local include_path="$2"

  if [ -f "$file_path" ]; then
    if grep -q "patches/unsigned_char_traits_patch.h" "$file_path"; then
      echo "ℹ️  Already patched: $file_path"
    else
      # Find line number of '#pragma once' if it exists
      pragma_once_line=$(grep -n "^#pragma once" "$file_path" | cut -d: -f1)

      if [ -n "$pragma_once_line" ]; then
        # Insert immediately after #pragma once
        insert_line=$((pragma_once_line + 1))
        sed -i '' "${insert_line}a\\
#include \"$include_path\"
" "$file_path"
      else
        # No pragma once found — insert at the very top
        sed -i '' "1i\\
#include \"$include_path\"
" "$file_path"
      fi

      echo "✅ Patched: $file_path"
      PATCHED_FILES+=("$file_path")
    fi
  else
    echo "ℹ️  Skipping (not found): $file_path"
  fi
}

# Loop through all header files
for entry in "${FILES_AND_PATHS[@]}"; do
  FILE_PATH="${entry%%:*}"
  INCLUDE_PATH="${entry##*:}"

  patch_header_if_needed "$FILE_PATH" "$INCLUDE_PATH"
done

# Final result
echo ""
if [ ${#PATCHED_FILES[@]} -gt 0 ]; then
  echo "🚀 Patch complete! Summary:"
  for file in "${PATCHED_FILES[@]}"; do
    echo " - $(basename "$file")"
  done
else
  echo "⚠️  No new patches needed. Everything already patched."
fi
