import {
  Epic,
  EpicRaw,
  Story,
  StoryRaw,
} from "./models";

/* Story mappers */
function mapStory(raw: StoryRaw): Story {
  return {
    title: raw.title ?? "Title not available",
    storyOrder: raw.story_order ?? "-",
    userStory: raw.user_story ?? "No description",
    acceptanceCriteria: raw.acceptance_criteria ?? [],
  };
}

function parseStories(stories: unknown): Story[] {
  if (!Array.isArray(stories)) return [];

  return stories.flatMap(group => {
    if (typeof group !== "object" || group === null) return [];

    return Object.values(group as Record<string, StoryRaw[]>)
      .flatMap(storyArray =>
        Array.isArray(storyArray)
          ? storyArray.map(mapStory)
          : []
      );
  });
}

/* Epic mapper */
export function mapEpic(raw: EpicRaw): Epic {
  return {
    epicId: raw.epic_id ?? "No epicId",
    epicTitle: raw.epic_title ?? "Title not available",
    context: raw.context ?? "Context not available",
    userStories: parseStories(raw.user_stories),
    acceptanceCriteria: raw.acceptance_criteria ?? [],
    definitionOfDone: raw.definition_of_done ?? [],
    metrics: raw.metrics ?? [],
    image: raw.image ?? "/path/to/default/image.png",
  };
}
