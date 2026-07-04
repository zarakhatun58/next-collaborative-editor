
// Deterministic Merge Engine
export interface MergeInput {
  baseContent: string;
  localContent: string;
  remoteContent: string;
}

export interface MergeResult {
  mergedContent: string;
  conflict: boolean;
}

export function mergeDocument({
  baseContent,
  localContent,
  remoteContent,
}: MergeInput): MergeResult {
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
  return {
    conflict: true,
    mergedContent:
`<<<<<<< LOCAL

${localContent}

=======

${remoteContent}

>>>>>>> REMOTE`,
  };
}