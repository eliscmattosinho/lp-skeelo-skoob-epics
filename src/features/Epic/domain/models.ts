/* Domain models */
export interface Story {
  title: string;
  storyOrder: string;
  userStory: string;
  acceptanceCriteria: string[];
}

export interface Epic {
  epicId: string;
  epicTitle: string;
  context: string;
  userStories: Story[];
  acceptanceCriteria: string[];
  definitionOfDone: string[];
  metrics: (string | { value?: string | number; title?: string })[];
  image?: string;
}

/* Raw JSON models */
export interface StoryRaw {
  title?: string;
  story_order?: string;
  user_story?: string;
  acceptance_criteria?: string[];
}

export interface EpicRaw {
  epic_id?: string;
  epic_title?: string;
  context?: string;
  user_stories?: unknown;
  acceptance_criteria?: string[];
  definition_of_done?: string[];
  metrics?: (string | { value?: string | number; title?: string })[];
  image?: string;
}

export interface ProductRaw {
  epics?: EpicRaw[];
}

export type EpicsJson = Record<string, ProductRaw>;
