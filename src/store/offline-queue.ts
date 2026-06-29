type QueueItem = {
  documentId: string;
  title: string;
  content: string;
  createdAt: number;
};

const KEY = "offline-document-queue";

export function getQueue(): QueueItem[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function addToQueue(item: QueueItem) {
  const queue = getQueue();

  queue.push(item);

  localStorage.setItem(KEY, JSON.stringify(queue));
}

export function clearQueue() {
  localStorage.removeItem(KEY);
}