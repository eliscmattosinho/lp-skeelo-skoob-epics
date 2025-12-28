type ThemeName = "default" | "linkedin" | "github" | "email";

type EnvelopeTheme = {
  back: string;
  flap: string;
  front: string;
};

export const envelopeThemes: Record<ThemeName, EnvelopeTheme> = {
  default: {
    back: "#C8A97E",
    flap: "#B89268",
    front: "#E6D3B1",
  },

  linkedin: {
    back: "#0A8CD8",
    flap: "#004A6E",
    front: "#0A8CD8",
  },

  github: {
    back: "#1F2328",
    flap: "#0D1117",
    front: "#1F2328",
  },

  email: {
    back: "#D32F2F",
    flap: "#B71C1C",
    front: "#D32F2F",
  },
};
