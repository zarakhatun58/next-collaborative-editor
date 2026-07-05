// src/services/merge.service.ts

export interface MergeInput {
  baseContent: string;
  localContent: string;
  remoteContent: string;
}

export interface MergeResult {
  mergedContent: string;
  conflict: boolean;
}

function normalize(text: string) {
  return text.replace(/\r\n/g, "\n");
}

export function mergeDocument({
  baseContent,
  localContent,
  remoteContent,
}: MergeInput): MergeResult {
  baseContent = normalize(baseContent);
  localContent = normalize(localContent);
  remoteContent = normalize(remoteContent);

  // ---------------------------------
  // No changes
  // ---------------------------------

  if (
    baseContent === localContent &&
    baseContent === remoteContent
  ) {
    return {
      mergedContent: baseContent,
      conflict: false,
    };
  }

  // ---------------------------------
  // Only local changed
  // ---------------------------------

  if (baseContent === remoteContent) {
    return {
      mergedContent: localContent,
      conflict: false,
    };
  }

  if (baseContent === localContent) {
    return {
      mergedContent: remoteContent,
      conflict: false,
    };
  }
  if (localContent === remoteContent) {
    return {
      mergedContent: localContent,
      conflict: false,
    };
  }

  // ---------------------------------
  // Append-only merge
  // Example:
  //
  // Base:
  // Hello
  //
  // Local:
  // Hello
  // A
  //
  // Remote:
  // Hello
  // B
  //
  // Result:
  // Hello
  // A
  // B
  // ---------------------------------

  if (
    localContent.startsWith(baseContent) &&
    remoteContent.startsWith(baseContent)
  ) {
    return {
      mergedContent:
        baseContent +
        localContent.slice(baseContent.length) +
        remoteContent.slice(baseContent.length),
      conflict: false,
    };
  }
  if (remoteContent.startsWith(localContent)) {
    return {
      mergedContent: remoteContent,
      conflict: false,
    };
  }

  if (localContent.startsWith(remoteContent)) {
    return {
      mergedContent: localContent,
      conflict: false,
    };
  }
  return {
    conflict: true,
    mergedContent: [
      "<<<<<<< LOCAL",
      localContent,
      "=======",
      remoteContent,
      ">>>>>>> REMOTE",
    ].join("\n"),
  };
}