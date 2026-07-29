export type UserProfile = {
  nickname: string;
  birthDate: string;
  birthTime: string;
  birthTimeUnknown: boolean;
  birthCity: string;
};

export type FeedbackType = "Bug" | "内容不准确" | "页面不好用" | "视觉问题" | "功能建议";

export type Feedback = {
  id: string;
  type: FeedbackType;
  content: string;
  page: string;
  contact?: string;
  createdAt: string;
};
