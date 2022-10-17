export interface Task {
  id: number;
  name: string;
  // 经办人
  processorId: number;
  projectId: number;
  // 任务组
  epicId: number;
  // bug or task
  typeId: number;
  note: string;
  kanbanId: number;
}
